<?php

namespace App\Http\Controllers;

use App\Models\conversation;
use App\Models\conversation_supprimes;
use App\Models\Message;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\message_supprime;
use App\Models\Produit;

class messageController extends Controller
{
    //
    public function getMessage(Request $request)
    {
        $user = Auth::user();
        $conversation_id = $request->query('conversation_id');
        $conversations = Conversation::where('user1_id', $user->id)
            ->orWhere('user2_id', $user->id)
            ->orderBy('updated_at', 'desc')
            ->with(['user1', 'user2', 'message' => function ($q) {
                $q->orderBy('created_at', 'asc');
            }])
            ->get();

        return Inertia::render('Messagerie', [
            'conversations' => $conversations,
            'selectedId' => $conversation_id
        ]);
    }


    public function sendMessage(Request $request)
    {

        $request->validate([
            'id_receive' => 'required|exists:users,id',
            'image' => 'nullable|image|max:2048',
        ]);
        $path = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store('messages', 'public');
        }

        $user = Auth::user();
        if (!$user) {
            return redirect('/connexion')->with('error', 'veuillez vous connecter');
        }
        // dd($request->all());
        $id_receiver = $request->id_receive;
        $valeur = $request->message;
        $conversation = conversation::where(function ($query) use ($user, $id_receiver) {
            $query->where('user1_id', $user->id)
                ->where('user2_id', $id_receiver);
        })->orWhere(function ($query) use ($user, $id_receiver) {
            $query->where('user1_id', $id_receiver)
                ->where('user2_id', $user->id);
        })->first();

        if (!$conversation) {
            // creer une nouvelle conversation
            $conversation = new conversation();
            $conversation->user1_id = $user->id;
            $conversation->user2_id = $id_receiver;
            $conversation->save();
        }
        $conversation->touch();
        $message = new Message();
        $message->conversation_id = $conversation->id;
        $message->expediteur_id = $user->id;
        $message->destinataire_id = $id_receiver;
        $message->contenu = $valeur;
        $message->piece_jointe = $path;
        $message->save();

        return redirect('/messagerie');
    }

    public function markAsRead(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $conversationId = $request->input('conversationId');

        // Mettre à jour les messages non lus dans la conversation spécifiée
        $message =
            Message::where('conversation_id', $conversationId)
            ->where('destinataire_id', $user->id)
            ->where('lu', false)
            ->update(['lu' => true]);

        return back();
    }

    public function removeConversation(Request $request)
    {
        // dd($request->all());
        $user = Auth::user();
        $conversationId = $request->input('conversation_id');
        $conversation = conversation::where('id', $conversationId)
            ->where('user1_id', $user->id)
            ->orWhere('user2_id', $user->id)
            ->first();
        if (!$conversation) {
            return redirect()->back();
        }
        $conversSupprime = new conversation_supprimes();
        $conversSupprime->user_id = $user->id;
        $conversSupprime->conversation_id = $conversationId;
        $conversSupprime->save();

        return back();
    }

    public function deleteMessage(Request $request)
    {

        $user = Auth::user();
        $msgId = $request->input('msgId');
        $type = $request->input('type');

        $message = Message::where('id', $msgId)
            ->where(function ($query) use ($user) {
                $query->where('expediteur_id', $user->id)
                    ->orWhere('destinataire_id', $user->id);
            })
            ->first();

        if (!$message) {
            return response()->json(['message' => 'Message not found'], 404);
        }

        if ($type === 'all') {
            $message->delete();
        } elseif ($type === 'self') {

            $existing = message_supprime::where('user_id', $user->id)
                ->where('message_id', $message->id)
                ->first();

            if ($existing) {
                return back();;
            }
            $message_supprime = new message_supprime();
            $message_supprime->user_id = $user->id;
            $message_supprime->message_id = $message->id;
            $message_supprime->save();
        }

        return back();
    }

    public function startConversationProduit(Request $request)
    {
        $user = Auth::user();
        $id_receiver = $request->input('receiver_id');
        $produit_id = $request->input('produit_id');

        if (!$id_receiver || $id_receiver == $user->id) {
            return back()->with('error', 'Action non autorisée.');
        }

        // Vérifier si une conversation existe déjà entre les deux utilisateurs
        $conversation = Conversation::where(function ($query) use ($user, $id_receiver) {
            $query->where('user1_id', $user->id)
                ->where('user2_id', $id_receiver);
        })->orWhere(function ($query) use ($user, $id_receiver) {
            $query->where('user1_id', $id_receiver)
                ->where('user2_id', $user->id);
        })->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'user1_id' => $user->id,
                'user2_id' => $id_receiver,
            ]);
        }

        if ($produit_id) {
            $produit = Produit::with('images')->find($produit_id);

            if ($produit) {
                $contenu = json_encode([
                    'type' => 'produit',
                    'data' => [
                        'id' => $produit->id,
                        'nom' => $produit->nom,
                        'prix' => $produit->prix,
                        'image' => $produit->images[0]->url ?? null,
                    ]
                ]);

                $message = new Message();
                $message->conversation_id = $conversation->id;
                $message->expediteur_id = $user->id;
                $message->destinataire_id = $id_receiver;
                $message->type = 'produit';
                $message->contenu = $contenu;
                $message->save();
            }
        }

        return redirect()->route('Messagerie', ['conversation_id' => $conversation->id]);
    }
}

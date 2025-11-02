<?php

namespace App\Http\Controllers;

use App\Mail\invitationAssistantMail;
use App\Models\assistants;
use App\Models\Boutique;
use App\Models\User;
use Auth;
use Hash;
use Illuminate\Http\Request;
use Mail;
use Str;
use Inertia\Inertia;

class assistantController extends Controller
{
    //
    public function inscriptionAssistant($token){
        
        $assistant=assistants::where('token',$token)->where('is_accepted',false)->first();
        if(!$assistant){
            return redirect()->route('inscription')->with('error','Lien d\'invitation invalide ou expiré');
        }
        return Inertia::render('InscriptionAssistant',[
            'token'=>$token,
            'assitant'=>$assistant,
        ]);
    }

    public function addAssist(Request $request){
        // dd($request->all());
        $mail=$request->email;
        $role=$request->role;
        $compte=$request->compte;
        $nom=$request->nom;
        
       

        $user=Auth::user();
        $boutique=Boutique::where('user_id',$user->id)->first();
        if(!$boutique){
            return redirect()->back()->with('error','Boutique introuvable');
        }
        $token=Str::uuid();

        $assistant=new assistants();
        $assistant->role=$role;
        $assistant->email=$mail;
        $assistant->nom=$nom;
        $assistant->active=false;
        $assistant->boutique_id=$boutique->id;
        $assistant->token=$token;
        $assistant->is_accepted=false;
        $assistant->save();

         $lien=route(('inscription.assistant'),[
            'token'=>$token,
            'email'=>$mail,
        ]);
        
        Mail::to($mail)->send(new invitationAssistantMail($user->nom,$boutique->nom,$lien));
        return redirect()->back()->with('success','invitation d\'assistance envoyée');
    }

    public function storeAssistant(Request $request){
       
        $token=$request->token;
        $request->validate([
            'nom'=>'required',
             'email' => 'string|email|max:255|unique:'.User::class,
            'telephone' => 'string|max:255|unique:'.User::class,
            'password' => ['required','min:8', 'confirmed'],
        ]);
        $assistant=assistants::where('token',$token)
                ->where('is_accepted',false)->first();
        if(!$assistant){
             return redirect()->route('inscription')->with('error','Lien d\'invitation invalide ou expiré');
        }
        $user=new User();
        $user->nom=$request->nom;
        $user->prenom=$request->prenom;
        $user->email=$request->email;
        $user->telephone=$request->telephone;
        $user->role='assistant';
        $user->password=Hash::make($request->password);
        $user->save();
        $assistant->user_id=$user->id;
        $assistant->is_accepted=true;
        $assistant->active=true;
        $assistant->save();
        Auth::login($user);
        return redirect('/seller/dashboard')->with('success','Inscription réussie');
    }

    public function deleteAssist($id){
        $assistant=assistants::find($id);
        if(!$assistant){
            return redirect()->back()->with('error','Assistant introuvable');
        }
        $user=User::find($assistant->user_id);
        if($user){
            $user->role='client';
            $user->save();
        }
        $assistant->delete();
        return redirect()->back()->with('success','Assistant supprimé avec succès');
    }
}

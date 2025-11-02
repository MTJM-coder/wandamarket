<?php

namespace App\Http\Controllers;

use App\Models\Boutique;
use App\Models\Commande;
use App\Models\CommandeProduit;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Produit;
use App\Models\Favoris;
use Exception;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

class commandeController extends Controller
{
    //
    public function sellerOrder()
    {
        $user = Auth::user();
        $boutique = Boutique::where('user_id', $user->id)->first();
        $orders = Commande::with('commandeProduits.produit.images', 'user')->get();

        return Inertia::render('sellerOrder', [
            'orders' => $orders
        ]);
    }

    public function confirmOrder($id)
    {
        $order = Commande::findOrFail($id);
        if ($order->boutique->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'Accès refusé');
        }

        $order->etat = 'confirmée';
        $order->save();

        return redirect()->back()->with('success', 'Commande confirmée');
    }
    public function cancelOrder($id)
    {
        $order = Commande::findOrFail($id);
        if ($order->boutique->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'Accès refusé');
        }

        $order->etat = 'annulée';
        $order->save();

        return redirect()->back()->with('success', 'Commande annulée');
    }
    public function markOrder($id)
    {
        $order = Commande::findOrFail($id);
        if ($order->boutique->user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'Accès refusé');
        }

        $order->etat = 'expediée';
        $order->save();

        return redirect()->back()->with('success', 'Commande expediée');
    }

    public function passOrder(Request $request)
    {
        $user = Auth::user();
        // Trouver le produit et la boutique associée

        $produit = Produit::findOrFail($request->produit_id);
        $boutique = $produit->boutique;

        // Créer la commande
        $commande = new Commande();
        $commande->acheteur_id = $user ? $user->id : null; // Peut être null pour les utilisateurs non enregistrés
        $commande->boutique_id = $boutique->id;
        $commande->etat = 'en attente';
        $commande->montant_total = $produit->prix * $request->quantity;
        $commande->client_nom = $request->clientName;
        $commande->date_commande = now();
        $commande->client_telephone = $request->clientPhone;
        $commande->client_ville = $request->clientVille;
        $commande->client_quartier = $request->clientQuartier;
        $commande->save();

        // Attacher le produit à la commande avec la quantité
        $commandeProduit = new CommandeProduit();
        $commandeProduit->commande_id = $commande->id;
        $commandeProduit->produit_id = $produit->id;
        $commandeProduit->quantite = $request->quantity;
        $commandeProduit->prix_unitaire = $produit->prix;
        $commandeProduit->prix_total = $produit->prix * $request->quantity;
        $commandeProduit->save();

        return Redirect::route('order.confirmation', ['id' => $commande->id]);
    }

    public function buyerOrder()
    {
        $user = Auth::user();
        $orders = Commande::with('commandeProduits.produit.images', 'commandeProduits.produit.categorie', 'boutique.user')
            ->where('acheteur_id', $user->id)
            ->get();
               // Séparer les commandes groupées et non groupées
    // $groupedOrders = $orders->whereNotNull('group_order_id')->groupBy('group_order_id');
    // $singleOrders  = $orders->whereNull('group_order_id');

    return Inertia::render('Commandes', [
        // 'groupedOrders' => $groupedOrders,
        // 'singleOrders'  => $singleOrders,
        'orders' => $orders,
    ]);
    }

    public function detailOrder($id)
    {
        $user = Auth::user();
        $order = Commande::with('commandeProduits.produit.images', 'commandeProduits.produit.categorie', 'boutique.user')
            ->where('acheteur_id', $user->id)
            ->where('id', $id)
            ->firstOrFail();

        return Inertia::render('DetailCommande', [
            'order' => $order
        ]);
    }

    public function BuyerDashboard()
    {
        $user = Auth::user();
        $orders = Commande::with('commandeProduits.produit.images', 'commandeProduits.produit.categorie', 'boutique.user')
            ->where('acheteur_id', $user->id)
            ->get();
        $favoris = Favoris::with('produit.images')->where('user_id', $user->id)->get();
        return Inertia::render('BuyerDashboard', [
            'orders' => $orders,
            'favoris' => $favoris
        ]);
    }

    public function buyerConfirmOrder($id)
    {
        $order = Commande::find($id);
        if (!$order) {
            return redirect()->back()->with('error', 'commande introuvable');
        }
        $order->etat = 'terminée';
        return Inertia::render('AvisOrder', [
            'order' => $order
        ]);
    }


    public function orderConfirmation($id)
    {
        $commande = Commande::with('commandeProduits.produit.images', 'boutique.user')->findOrFail($id);

        return Inertia::render('payementPage', [
            'order' => $commande,
        ]);
    }

     public function panierConfirmation($group_order_id)
    {
        $commandes = Commande::with('commandeProduits.produit.images', 'boutique.user')
            ->where('group_order_id', $group_order_id)
            ->get();

        if ($commandes->isEmpty()) {
            return redirect()->back()->with('error', 'Aucune commande trouvée pour cet identifiant.');
        }

        return Inertia::render('payementPanierPage', [
            'order' => $commandes,
        ]);
    }

    public function validerPanier(Request $request)
    {
        $user = Auth::user();
        $commande = new Commande();
        $commande->acheteur_id = $user->id;
        $commande->boutique_id = $request->produits[0]['boutique_id'];
        $commande->etat = 'en attente';
        $commande->montant_total = $request->total;
        $commande->client_nom = $request->clientName;
        $commande->client_telephone = $request->clientPhone;
        $commande->client_ville = $request->clientCity;
        $commande->client_quartier = $request->clientAddress;
        $commande->date_commande = now();
        $commande->save();
         foreach ($request->produits as $produit) {
        $commandeProduit = new CommandeProduit();
        $commandeProduit->commande_id = $commande->id;
        $commandeProduit->produit_id = $produit['produit_id'];
        $commandeProduit->quantite = $produit['quantity'];
        $commandeProduit->prix_unitaire = $produit['price'];
        $commandeProduit->prix_total = $produit['price'] * $produit['quantity'];
        $commandeProduit->save();

        }
       return Redirect::route('order.confirmation', ['id' => $commande->id]);

    }
    public function changeStatus(Request $request){
        // dd(date('fr'));
        $user=Auth::user();
        try{
             $boutique=Boutique::where('user_id', $user->id)->first();
        }
        catch(Exception $e){
            return redirect()->back()->with('Error',"Boutique introuvable");
        }

        try{
            $order=commande::where('id',$request->id_order)->where('boutique_id',$boutique->id)->first();
        }
        catch (Exception $e){
            return redirect()->back()->with('Error',"ne erreur est surveue lors du traitement");
        }

      
       if($request->new_status=="en attente"){
             return redirect()->back();

        }
        else{
            $order->etat=$request->new_status;
        }
        if($request->new_status=="en cours"){
            $order->date_traitement=now();
            $order->date_expedition=null;
            $order->date_livre=null;

        }
        elseif($request->new_status=="expédiée"){
            $order->date_expedition=now();
            $order->date_livre=null;
            if($order->date_traitement==null){$order->date_traitement=now();}
        }
        elseif($request->new_status=="livrée"){
            
            if($order->date_traitement==null){$order->date_traitement=now();};
           if($order->date_expedition==null){$order->date_expedition=now();};
            $order->date_livre=now();
        }
        $order->save();
        return redirect()->back()->with('success',"Statut mis a jour");

        
        
       
    }
}

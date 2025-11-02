<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    //
    
   public function getOrder(){
    if(!Auth::check()) {
        return redirect('connexion')->with('error','Veuillez vous connecter');
    }

    // if(!in_array(Auth::user()->role, ['admin', 'super_admin'])) {
    //     return redirect('connexion')->with('error','Accès refusé');
    // }

    $orders = Commande::with([
    'user:id,nom,email,telephone',
    'commandeProduits.produit.images',
    'boutique.user:id,nom,email,ville,telephone'
])->get();
// dd($orders[0]->commandeProduits);
// dd($orders->toArray());


    return Inertia::render('AdminOrder', [
        'orders' => $orders
    ]);
}
public function removeOrder($id){

    $order=Commande::find($id);
    if($order){
        $order->delete();
        return redirect()->back()->with('success','commande supprimé');
    }
    else{
        return redirect()->back()->with('error','commande introuvable');
    }
    
}
}

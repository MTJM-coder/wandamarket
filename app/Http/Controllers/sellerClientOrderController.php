<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Models\commande;
use Inertia\Inertia;

class sellerClientOrderController extends Controller
{
    //
    public function getClients()
    {
        $user = Auth::user();
        $boutique = $user->boutique;
        if (!$boutique) {
            return redirect('/')->with('error', 'Vous devez avoir une boutique pour acceder aux clients');
        }
        $commandes = Commande::selectRaw('
        acheteur_id,
        MAX(created_at) as last_order,
        COUNT(*) as total_commandes,
        SUM(montant_total) as total_depense,
        (
            SELECT ROUND(AVG(note),1)
            FROM avis_boutiques
            WHERE avis_boutiques.acheteur_id = commandes.acheteur_id
        ) as moy_boutique,
        (
            SELECT ROUND(AVG(note),1)
            FROM avis_produits
            WHERE avis_produits.acheteur_id = commandes.acheteur_id
        ) as moy_produit
    ')
    ->where('boutique_id', $boutique->id)
    ->groupBy('acheteur_id')
    ->with('user')
    ->get();

        // dd($commandes);

        return Inertia::render('SellerClient', [
            'clients' => $commandes,
        ]);
    }
}

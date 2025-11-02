<?php

namespace App\Http\Controllers;

use App\Models\AvisBoutique;
use App\Models\AvisProduit;
use App\Models\Boutique;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\commande;
use Illuminate\Support\Facades\Auth;
use App\Models\CommandeProduit;

class StatController extends Controller
{
    //
    public function sellerStats()
    {
        $user = Auth::user();
        try {
            $boutique = Boutique::where('user_id', $user->id)->first();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Une erreur est survenue, veuillez réessayer plus tard');
        }

        $max_com = commande::where('boutique_id', $boutique->id)->max('montant_total');
        $total_produits = $boutique->produits()->count();
        $avis_moyen_boutique = AvisBoutique::where('boutique_id', $boutique->id)->AVG('note') ?? 0;
        $avis_moyen_produit = AvisProduit::whereIn('produit_id', function ($query) use ($boutique) {
            $query->select('id')
                ->from('produits')
                ->where('boutique_id', $boutique->id);
        })->AVG('note') ?? 0;
        if ($avis_moyen_boutique > 0 && $avis_moyen_produit > 0) {
            $avis_moyen = ($avis_moyen_boutique + $avis_moyen_produit) / 2;
        } elseif ($avis_moyen_boutique > 0) {
            $avis_moyen = $avis_moyen_boutique;
        } elseif ($avis_moyen_produit > 0) {
            $avis_moyen = $avis_moyen_produit;
        } else {
            $avis_moyen = 0;
        }

        $revenu = commande::where('boutique_id', $boutique->id)->where('etat', 'terminée')->sum('montant_total');
        $total_order = commande::where('boutique_id', $boutique->id)->count();
        $total_clients = commande::where('boutique_id', $boutique->id)->distinct('acheteur_id')->count('acheteur_id');
        $client_mois = commande::where('boutique_id', $boutique->id)
            ->whereMonth('created_at', now()->month)
            ->distinct('acheteur_id')
            ->count('acheteur_id');
        $percentage_clients_month = 0;
        if ($total_clients > 0) {
            $percentage_clients_month = ($client_mois / $total_clients) * 100;
        }

        $total_shop_order = commande::where('boutique_id', $boutique->id)->count();
        $delivered_order = commande::where('boutique_id', $boutique->id)->where('etat', 'terminée')->count();
        $waiting_order = commande::where('boutique_id', $boutique->id)->where('etat', 'en attente')->count();
        $canceled_order = commande::where('boutique_id', $boutique->id)->where('etat', 'annulée')->count();

        // calcul des pourcentages:
        $percentage_d_o = 0;
        $percentage_w_o = 0;
        $percentage_c_o = 0;

        if ($total_shop_order > 0) {
            $percentage_d_o = ($delivered_order / $total_shop_order) * 100;
            $percentage_w_o = ($waiting_order / $total_shop_order) * 100;
            $percentage_c_o = ($canceled_order / $total_shop_order) * 100;
        }


        $total_global_quantite=CommandeProduit::whereIn('produit_id',function($query) use ($boutique){
            $query->select('id')
            ->from('produits')
            ->where('boutique_id',$boutique->id);
        })->sum('quantite');
        // recuperation des meilleurs produits

        $best_products = CommandeProduit::selectRaw('produit_id,SUM(quantite) as total_quantite,SUM(prix_total) as total_prix')
            ->whereIn('produit_id', function ($query) use ($boutique) {
                $query->select('id')
                    ->from('produits')
                    ->where('boutique_id', $boutique->id);
            })
            ->groupBy('produit_id')
            ->with('produit')
            ->orderBy('total_quantite')
            ->limit(5)
            ->get();
        // $total_quantite = $best_products->sum('total_quantite');

        // Ajout du pourcentage à chaque produit
        $best_products = $best_products->map(function ($item) use ($total_global_quantite) {
            $item->pourcentage = $total_global_quantite > 0
                ? round(($item->total_quantite / $total_global_quantite) * 100, 2)
                : 0;
            return $item;
        });

// recuperation des meilleurs villes

$best_cities = commande::selectRaw('
            client_ville,
            COUNT(*) as total_commandes,
            SUM(montant_total) as total_montant
        ')
            ->where('boutique_id', $boutique->id)
            ->groupBy('client_ville')
            ->orderByDesc('total_commandes')
            ->limit(3)
            ->get();
        
// recuperation des informations pour le graphe

$data_stat=[];
for ($i = 1; $i <= 12; $i++) {
    $monthName = date('M', mktime(0, 0, 0, $i, 10));
    $commandes_count = commande::where('boutique_id', $boutique->id)
        ->whereMonth('created_at', $i)
        ->count();
    $revenu_total = commande::where('boutique_id', $boutique->id)
        ->whereMonth('created_at', $i)
        ->sum('montant_total');
    $data_stat[] = [
        'date' => $monthName,
        'commandes' => $commandes_count,
        'revenus' => $revenu_total,
    ];
}
// dd($data_stat);

        $commandes = commande::selectRaw('
            acheteur_id,
            COUNT(*) as total_commandes
        ')
            ->where('boutique_id', $boutique->id)
            ->groupBy('acheteur_id')
            ->orderByDesc('total_commandes')
            ->with('user');
        $best_customers = $commandes->limit(3)->get();
        // dd($best_customers);

        return Inertia::render('sellerStatistique', [
            'max_com' => $max_com,
            'total_produits' => $total_produits,
            'avis_moyen' => $avis_moyen,
            'revenu' => $revenu,
            'total_order' => $total_order,
            'total_clients' => $total_clients,
            'percentage_clients_month' => $percentage_clients_month,
            'best_customers' => $best_customers,
            'percentage_d_o' => $percentage_d_o,
            'percentage_w_o' => $percentage_w_o,
            'percentage_c_o' => $percentage_c_o,
            'best_products' => $best_products,
            'best_cities' => $best_cities,
            'data_stat'=>$data_stat
        ]);
    }
}

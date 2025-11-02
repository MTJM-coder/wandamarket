<?php

namespace App\Http\Controllers;

use App\Models\AvisBoutique;
use App\Models\AvisProduit;
use App\Models\Boutique;
use App\Models\Commande;
use App\Models\favoris;
use App\Models\Produit;
use Auth;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Inertia\Inertia;

class dashboardController extends Controller
{
    //
    public function getSellerDashboard(){
        $user=Auth::user();
        $boutique=Boutique::where('user_id',$user->id)->first();
        if (!$boutique) {
    return Inertia::render('SellerDashboard', [
        'message' => 'Aucune boutique associée à cet utilisateur.'
    ]);
}
        $commande=Commande::with('commandeProduits.produit','user')
                            ->where('boutique_id',$boutique->id)
                            ->orderBy('created_at','desc')->get();
        $revenuTotal=Commande::where('boutique_id',$boutique->id)
                            ->sum('montant_total');
        $revenuTotal = number_format($revenuTotal, 0, ',', ' ') . ' FCFA';

        $revenuJour = Commande::where('boutique_id', $boutique->id)
        ->whereDate('created_at', Carbon::today())
        ->sum('montant_total');
    $revenuJour = number_format($revenuJour, 0, ',', ' ') . ' FCFA';

    $commandeJour=Commande::where('boutique_id',$boutique->id)
                        ->whereDate('created_at',Carbon::today())
                        ->get();
         

        $produits=Produit::where('boutique_id',$boutique->id)->get();


        return Inertia::render('SellerDashboard',[
            'revenuTotal'=>$revenuTotal,
            'commande'=>$commande,
            'produits'=>$produits,
            'revenuJour'=>$revenuJour,
            'commandeJour'=>$commandeJour
        ]);
    }

    public function getDashboard(){
        if(Auth::check()){
            $user=Auth::user();
            $commande=Commande::with('commandeProduits.produit','boutique')
                                ->where('acheteur_id',$user->id)
                                ->orderBy('created_at','desc')
                                ->limit(3)
                                ->get();
                               
            $commandeTotal=Commande::where('acheteur_id',$user->id)->count();
            $commandeEncours=Commande::where(['acheteur_id'=>$user->id,'etat'=>'en attente'])->count();
            $commadeAnnule=Commande::where(['acheteur_id'=>$user->id,'etat'=>'annulée'])->count();
            $commandeLivre=Commande::where(['acheteur_id'=>$user->id,'etat'=>'livrée'])->count();

            $mtDepense=Commande::where('acheteur_id',$user->id)
                            ->where('etat','!=','annulée')
                            ->sum('montant_total');
            $mtDepenseMoisEncours=Commande::where('acheteur_id',$user->id)
                            ->where('etat','!=','annulée')
                            ->whereYear('created_at', Carbon::now()->year)
                            ->whereMonth('created_at', Carbon::now()->month)
                            ->sum('montant_total');
            $mtDepenseMoisPrecedent=Commande::where('acheteur_id',$user->id)
                            ->where('etat','!=','annulée')
                            ->whereYear('created_at', Carbon::now()->year)
                            ->whereMonth('created_at', Carbon::now()->subMonth()->month)
                            ->sum('montant_total');


            $favoris=favoris::where('user_id',$user->id)->count();
            $avisP=AvisProduit::where('acheteur_id',$user->id)->count();
            $avisB=AvisBoutique::where('acheteur_id',$user->id)->count();
            $avis=$avisB+$avisP;

            // $prod
        //    dd($mtDepenseMoisEncours-$mtDepenseMoisPrecedent)/($mtDepenseMoisPrecedent);
          

        return Inertia::render('DashboardAchat',[
            'commandeTotal'=>$commandeTotal,
            'commandeEncours'=>$commandeEncours,
            'commadeAnnule'=>$commadeAnnule,
            'commandeLivre'=>$commandeLivre,
            'mtDepense'=>$mtDepense,
            'mtDepenseMoisEncours'=>$mtDepenseMoisEncours,
            'mtDepenseMoisPrecedent'=>$mtDepenseMoisPrecedent,
            'favoris'=>$favoris,
            'avis'=>$avis,
            'commandeRecente'=>$commande
        ]);
        }
    }

    public function detailOrders($id){
        $orders=Commande::with('commandeProduits.produit.images','user','boutique')->find($id);
        
        return Inertia::render('SellerDetailOrder',[
            'orders'=>$orders
        ]);
    }
}

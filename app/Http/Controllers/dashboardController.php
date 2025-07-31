<?php

namespace App\Http\Controllers;

use App\Models\AvisBoutique;
use App\Models\AvisProduit;
use App\Models\Commande;
use App\Models\favoris;
use Auth;
use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Inertia\Inertia;

class dashboardController extends Controller
{
    //
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

            $favoris=favoris::where('user_id',$user->id)->count();
            $avisP=AvisProduit::where('acheteur_id',$user->id)->count();
            $avisB=AvisBoutique::where('acheteur_id',$user->id)->count();
            $avis=$avisB+$avisP;

            // $prod
           

        return Inertia::render('DashboardAchat',[
            'commandeTotal'=>$commandeTotal,
            'commandeEncours'=>$commandeEncours,
            'commadeAnnule'=>$commadeAnnule,
            'commandeLivre'=>$commandeLivre,
            'mtDepense'=>$mtDepense,
            'favoris'=>$favoris,
            'avis'=>$avis,
            'commandeRecente'=>$commande
        ]);
        }
    }
}

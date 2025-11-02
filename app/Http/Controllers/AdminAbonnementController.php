<?php

namespace App\Http\Controllers;

use App\Models\abonnement;
use App\Models\Forfait;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpParser\Node\Stmt\For_;

class AdminAbonnementController extends Controller
{
    //
    public function getAbonnement(){
        if(!Auth::check()){
            return redirect('connection')->with('error','veuillez vous connecter');
        }
        $forfait=Forfait::with('abonnements','abonnements.user')->get();
        $abonnement=Abonnement::with('user')->get();

        return Inertia::render('abonnement',[
            'forfait'=>$forfait,
            'abonnement'=>$abonnement
        ]);
    }

    public function addForfait(Request $req){
        $req->validate([
            'type'=>'required',
            'moyen'=>'required',
            'prix'=>'required',
        ]);
        if($req->moyen=="pourcentage"){
            $pourcentage=1;
        }
        else{
            $pourcentage=0;
        }
        $forfait=new Forfait();
        $forfait->nom=$req->type;
        $forfait->pourcentage=$pourcentage;
        $forfait->prix=$req->prix;
        $forfait->duree=$req->duree;
        
        $forfait->description=$req->description;
        $forfait->save();
        return redirect('/admin/payments')->with('success','Nouveau forfait ajouté');
    }

    public function updateForfait(Request $req){
        $forfait=Forfait::find($req->id);
        if(!$forfait){
            return redirect()->back()->with('error','erreur: forfait itrouvable');
        }

         if($req->moyen=="pourcentage"){
            $pourcentage=1;
        }
        else{
            $pourcentage=0;
        }
       
        $forfait->nom=$req->type;
        $forfait->pourcentage=$pourcentage;
        $forfait->prix=$req->prix;
        $forfait->duree=$req->duree;
        
        $forfait->description=$req->description;
        
        $forfait->save();
         return redirect('/admin/payments')->with('success',' forfait mise a jour');

    }
    public function removeForfait($id){
        $forfait=Forfait::find($id);
        if(!$forfait){
            return redirect()->back()->with('error','erreur: forfait itrouvable');
        }
        $forfait->delete();
        return redirect()->back()->with('success','forfait supprimé');
    }
    
}

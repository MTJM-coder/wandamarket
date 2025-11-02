<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Favoris;

class favorisController extends Controller
{
    //
    public function index(){
        $user = Auth::user();
        $favoris = $user->favoris()->with('produit.images')->get();

        return inertia('Favoris', [
            'favoris' => $favoris,
        ]);
    }

    public function remove($id){
        $user = Auth::user();
        $favori = Favoris::where('user_id', $user->id)->where('produit_id', $id)->first();
        
         if ($favori) {
            
            $favori->delete();
            return redirect()->back()->with('success', 'Produit retiré des favoris');
        }
       
        return redirect()->back()->with('error', 'Produit non trouvé dans les favoris');
    }
    public function add($id){
        if(!Auth::check()){
            return redirect('/connexion');
        }
        $user=Auth::user();
        $favori=Favoris::where('user_id',$user->id)->where('produit_id',$id)->first();
        if($favori){
            $favori->delete();
            return redirect()->back();
        }
        $favori=new Favoris();
        $favori->user_id=$user->id;
        $favori->produit_id=$id;
        $favori->save();
        return redirect()->back();

    }
}

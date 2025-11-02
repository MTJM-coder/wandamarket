<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Produit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminManageProductController extends Controller
{
    //
    public function getProduct(){
        $produits=Produit::with('boutique.user','images','categorie')->get();
        $categorie=Categorie::all();
        return Inertia::render('AdminProduct',[
            'produits'=>$produits,
            'categorie'=>$categorie
        ]);
    }

    public function removeProduct($id){
        $produit=Produit::find($id);
        if($produit){
            $produit->delete();
            return redirect()->back()->with('success','produit supprimé');
        }
        else{
             return redirect()->back()->with('error','produit introuvable');
        }
    }
}

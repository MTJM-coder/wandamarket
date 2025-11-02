<?php

namespace App\Http\Controllers;

use App\Models\Boutique;
use App\Models\Categorie;
use App\Models\Image;
use App\Models\produit;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpParser\Node\Stmt\Return_;

class produitController extends Controller
{
    //
public function store(Request $request)
{
    if (Auth::check()) {
        $user = Auth::user();
        $boutique = Boutique::where('user_id', $user->id)->first();

        if (!$boutique) {
            return redirect()->back()->with('succes', 'Vous devez d\'abord créer une boutique avant d\'ajouter des produits.');
        }

        // Validation des champs image
        $request->validate([
            'image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Création du produit
        $produit = new produit();
        $produit->nom = $request->nom;
        $produit->categorie_id = $request->categorie; // À remplacer par un vrai id plus tard
        $produit->prix = $request->prix;
        $produit->prix_reduit= $request->reduction ?? null;
        $produit->quantite = $request->stock;
        $produit->disponible=$request->disponible;
        $produit->description = $request->description;
        $produit->boutique_id = $boutique->id;
        $produit->save(); 

        // Sauvegarde des images
        if ($request->hasFile('image')) {
            foreach ($request->file('image') as $file) {
                $path = $file->store('images', 'public');

                $image = new Image();
                $image->produit_id = $produit->id;
                $image->url = $path;
                $image->save();
            }
        }

        return redirect()->back()->with('succes', 'Produit enregistré avec succès.');
    }

    return redirect()->route('connexion')->with('error', 'Vous devez être connecté.');
}

public function remove($id)
{
    $produit = produit::findOrFail($id);
    $produit->delete();
    $image=Image::where('produit_id', $id)->get();
    foreach ($image as $img) {
        $img->delete();
    }

    return redirect()->back()->with('success', 'Produit supprimé avec succès.');
}

public function update(Request $request, $id)
{
    $produit = produit::findOrFail($id);
    $produit->nom = $request->nom;
    $produit->description = $request->description;
    $produit->prix = $request->prix;
    $produit->categorie_id = $request->categorie;
    $produit->reduction = $request->reduction ?? null;
    $produit->quantite = $request->stock;
    $produit->save();

    // Mise à jour des images
    if ($request->hasFile('image')) {
        foreach ($request->file('image') as $file) {
            $path = $file->store('images', 'public');

            $image = new Image();
            $image->produit_id = $produit->id;
            $image->url = $path;
            $image->save();
        }
    }

    return redirect()->back()->with('success', 'Produit mis à jour avec succès.');
}

public function DetailProduct($id){
     $produit=produit::with('boutique.user','avis.user','images')->find($id);
        if(!$produit){
            return redirect()->back()->with('error','Produit non trouvé');
        }
    $similaires=produit::with('boutique.user','images','categorie')->where('categorie_id',$produit->categorie_id)->where('id','!=',$produit->id)->get();

        
    return Inertia::render('DetailProduct',[
        'produit'=>$produit,
        'similaires'=>$similaires
       
    ]);
}
}
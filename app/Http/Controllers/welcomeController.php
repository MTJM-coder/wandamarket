<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\visite;
use App\Models\Produit;
use Inertia\Inertia;


class welcomeController extends Controller
{
    //
    public function welcome(){
         $visite = new visite();
    $visite->ip = request()->ip();
    $visite->url = request()->url();
    $visite->navigateur = request()->header('User-Agent');
    $visite->user_agent = request()->header('User-Agent');
    $visite->save();

    $produits = Produit::with(['boutique' => function ($q) {
        $q->whereNull('deleted_at')
          ->where('etat', "active")
          ->with('user');
    }, 'images', 'categorie'])
    ->whereHas('boutique', function ($q) {
        $q->whereNull('deleted_at')
          ->where('etat', "active");
    })
    ->get();

return Inertia::render('Welcome', [
    'produits' => $produits
]);

    }
}

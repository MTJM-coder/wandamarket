<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Boutique;
use Illuminate\Support\Facades\Auth;

class BoutiqueController extends Controller
{
    //
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'nom' => 'required|string|max:255',
            'quartier' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'telephone' => 'required|string|max:20',
            'email' => 'required|email|max:255|unique:boutiques,email',
        ]);

        $user=Auth::user();
        if (!$user) {
            return redirect()->route('connexion')->with('error', 'vous devez vous connecter pour enregistrer une boutique');
        }
        $user->role= 'vendeur';
        $user->save();

        $boutique = new Boutique();
        $boutique->nom = $request->nom;
        $boutique->quartier = $request->quartier;
        $boutique->ville = $request->ville;
        $boutique->description = $request->description;
        $boutique->telephone = $request->telephone;
        $boutique->email = $request->email;
        $boutique->user_id = $user->id; 
        $boutique->save();
return response()->json([
            'message' => 'Boutique enregistrée avec succès',
            'boutique' => $boutique
        ], 201);

    }
}

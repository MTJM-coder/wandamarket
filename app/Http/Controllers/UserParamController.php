<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserParamController extends Controller
{
    //
    public function parametre(){
        $user=Auth::user();
        return Inertia::render('Parametre',['user'=>$user]);
    }


// modification des parametes
public function update(Request $request){
    $user=Auth::user();
    $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'string|max:255|nullable',
        'email' => 'string|email|max:255|unique:users,email,'.$user->id,
        'telephone' => 'string|max:255|unique:users,telephone,'.$user->id,
         'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048|nullable',
        'ville' => 'string|max:255|nullable',
        'quartier' => 'string|max:255|nullable',
    ]);

    $user->nom = $request->nom;
    $user->prenom = $request->prenom;
    $user->email = strtolower($request->email);
    $user->telephone = $request->telephone;
    $user->ville = $request->ville ? $request->ville : null;
    $user->quartier = $request->quartier ? $request->quartier : null;
     dd($request->file('image'));
    if ($request->file('image')) {
        $user->image = $request->file('image')->store('images', 'public');
        dd($user->image);
    }
    $user->save();

    return redirect()->back()->with('success', 'Paramètres mis à jour avec succès.');
}
}

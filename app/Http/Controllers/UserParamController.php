<?php

namespace App\Http\Controllers;

use App\Models\AvisBoutique;
use App\Models\AvisProduit;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Commande;
use App\Models\favoris;
use App\Models\Payement_accounts;
use App\Models\SellerSetting;
use Illuminate\Support\Facades\Hash;
use Twilio\TwiML\Voice\Assistant;
use App\Models\Assistants;

class UserParamController extends Controller
{
    //
    public function parametre(){
        $user=Auth::user();
        $boutique=$user->boutique;
        if(!$boutique){
            return redirect('/buyer/dashboard')->with('error','Vous devez avoir une boutique pour acceder aux parametres');
        }
        $accounts=Payement_accounts::where('boutique_id',$boutique->id)->get();
        $settings=SellerSetting::where('boutique_id',$boutique->id)->first();
        $assistants=Assistants::where('boutique_id',$boutique->id)->with('user')->get();
        
        return Inertia::render('Parametre',[
            'user'=>$user,
            'accounts'=>$accounts,
            'settings'=>$settings,
            'assistants'=>$assistants,
        ]);
    }


// modification des parametes
public function update(Request $request){
    dd($request->hasFile('image'));
    dd($request->all());
    $user=Auth::user();
    $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'string|max:255|nullable',
        'email' => 'string|email|max:255|unique:users,email,'.$user->id,
        'telephone' => 'string|max:255|unique:users,telephone,'.$user->id,

        'ville' => 'string|max:255|nullable',
        'quartier' => 'string|max:255|nullable',
    ]);
    $boutique=$user->boutique;
    
    if($boutique){
        $boutique->email=$request->email;
        $boutique->telephone=$request->telephone;
        $boutique->ville=$request->ville ? $request->ville : $boutique->ville;
        $boutique->quartier=$request->quartier ? $request->quartier : $boutique->quartier;
        $boutique->logo= $request->file('image') ? $request->file('image')->store('images', 'public') : $boutique->logo;
        $boutique->save();
         return redirect()->back()->with('success', 'Paramètres mis à jour avec succès.');
    }
    return redirect()->back()->with('error', 'Vous devez avoir une boutique pour modifier ces paramètres.');

   
}

public function getParam(){
    $user=Auth::user();
    $commande=Commande::where('acheteur_id',$user->id)->count();
    $mtDepense=Commande::where('acheteur_id',$user->id)
              ->where('etat','livree')
              ->sum('montant_total'); 
    $favoris=favoris::where('user_id',$user->id)->count();
    $avisP=AvisProduit::where('acheteur_id',$user->id)->count();
    $avisB=AvisBoutique::where('acheteur_id',$user->id)->count();
    $avis=$avisB+$avisP; 
    // dd($commande);
    return Inertia::render('buyerSettings',[
        'commande'=>$commande,
        'montantDepense'=>$mtDepense,
        'favoris'=>$favoris,
        'avis'=>$avis

    ]);


}

public function updateProfile(Request $request){
    $request->validate([
        'avatar'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $user=Auth::user();
    $user->nom=$request->nom;
    $user->email=$request->email;
    $user->telephone=$request->telephone;
    $user->prenom=$request->prenom;
    $user->image = $request->file('avatar') ? $request->file('avatar')->store('images', 'public') : null;
    $user->save();
    
    return redirect()->back()->with('success','Profil mis a jour');

}
public function updatePassword(Request $request)
    {
        
        $user = Auth::user();
        

        // Validation
        $request->validate([
            
            'password'     => 'required|string|min:8|confirmed',
        ]);
    

        // Vérifie l’ancien mot de passe
        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors(['current_password' => 'Mot de passe actuel incorrect']);
        }

        // Mise à jour du mot de passe
        $user->password = Hash::make($request->password);
        $user->save();

        return back()->with('success', 'Mot de passe mis à jour avec succès !');
    }

    public function removeAvatar()
    {
        $user = Auth::user();
        $user->image = null;
        $user->save();

        return redirect()->back()->with('success', 'Avatar supprimé avec succès.');
    }
}

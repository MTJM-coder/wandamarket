<?php

namespace App\Http\Controllers;

use Auth;
use Hash;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminSettingController extends Controller
{
    //
    public function getSetting(){
        if(!Auth::check()){
            return redirect('connexion');
        }
        $admin=Auth::user();
        return Inertia::render('AdminParametre',[
            'admin'=>$admin

        ]);

    }
     public function updateAdmin(Request $req){
    if(!Auth::check()){
        return redirect('/connexion');
    }
    $user=Auth::user();
    $user->nom=$req->nom;
    $user->email=$req->email;
    $user->telephone=$req->telephone;
    $user->save();
    return redirect()->back()->with('success','modification effectuée');
    }

    public function updateSecure(Request $req){
        if(!Auth::check()){
            return redirect('connexion');
        }
        $user=Auth::user();
        $req->validate([
            'newPassword'=>['required','min:8','confirmed']
        ]);
        if(Hash::check($req->passwordActuel, $user->password)){
            $user->password=Hash::make($req->newPassword);
            $user->save();
            return redirect()->back()->with('success','Infos mises a jour avec succes');
        }



    }
}

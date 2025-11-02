<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminManageClientController extends Controller
{
    //
    public function getClient(){
        $client=User::where('role','client')->get();
        return Inertia::render('AdminClient',[
            'clients'=>$client
        ]);
    }
    public function block($id){
        $client=User::find($id);
        if($client){
            $client->statut='inactif';
            $client->save();
            return redirect()->back()->with('success','Compte bloqué');
        }
        else{
            return redirect()->back()->with('error','compte introuvable');
        }
    }
     public function disBlock($id){
        $client=User::find($id);
        if($client){
            $client->statut='actif';
            $client->save();
            return redirect()->back()->with('success','Compte débloqué');
        }
        else{
            return redirect()->back()->with('error','compte introuvable');
        }
    }

     public function removeClient($id){
        $client=User::find($id);
        if($client){
            $client->delete();
            return redirect()->back()->with('success','Compte supprimé');
        }
        else{
            return redirect()->back()->with('error','compte introuvable');
        }
    }
}

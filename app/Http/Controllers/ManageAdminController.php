<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManageAdminController extends Controller
{
    //
    public function getAdmins(){
        if(!Auth::check()){
            return redirect('/connexion');
        }

        $admins=User::where('role','super_admin')
        ->orWhere('role','admin')
        ->get();
        $user=User::all();
        return Inertia::render('Admin',[
            'admins'=>$admins,
            'user'=>$user
        ]);
        
    }

    public function removeAdmin($id){
        if($admin=User::where('id',$id)->first()){
            $admin->delete();
            return redirect()->back()->with('success','Administrateur supprimé avec succes');
        }
    }

    public function disblockAdmin($id){
        if($admin=User::where('id',$id)->first()){
            if($admin->statut=='actif'){
                $admin->statut='inactif';
                $admin->save();
            }
            else if($admin->statut=='inactif'){
                $admin->statut='actif';
                $admin->save();
            }
            return redirect()->back()->with('success','operation effectuée avec succes');
        }
    }

    public function addAdmin(Request $req){
        $id=$req->id;
        $role=$req->role;
        if($user=User::where('id',$id)->first()){
            $user->role=$role;
            $user->save();
            return redirect()->back()->with('success','administrateur ajouté avec succes');
        }
    }
}

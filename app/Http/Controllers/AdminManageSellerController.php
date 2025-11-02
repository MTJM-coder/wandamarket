<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AdminManageSellerController extends Controller
{
    //
    public function getSeller(){
        $vendeurs=User::with('boutique')->where('role','vendeur')->get();
        return Inertia::render('AdminSeller',[
            'vendeurs'=>$vendeurs
        ]);
    }
}

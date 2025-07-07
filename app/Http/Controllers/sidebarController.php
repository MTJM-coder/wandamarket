<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use function Termwind\render;
use Inertia\Inertia;

class sidebarController extends Controller
{
    //
public function index(){
    if(Auth::check()){
        $user=Auth::user();
        if($user->role=='vendeu'){
            return inertia::render('sidebar',[
                'user' => $user,
                'vendeur' => true,
            ]);
        }
    }
}
   
}
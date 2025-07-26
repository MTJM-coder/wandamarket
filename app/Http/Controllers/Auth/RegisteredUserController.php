<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'string|max:255|nullable',
            'email' => 'string|email|max:255|unique:'.User::class,
            'telephone' => 'string|max:255|unique:'.User::class,
             'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048|nullable',
             'ville' => 'string|max:255|nullable',
            'quartier' => 'string|max:255|nullable',
           
            'password' => ['required','min:8', 'confirmed'],
            
           
        ]);
      


        $user = new User();
        $user->nom = $request->nom;
        $user->prenom=$request->prenom;
        $user->email = strtolower($request->email);
        $user->telephone = $request->telephone;
        $user->ville = $request->ville ? $request->ville : null;
        $user->quartier = $request->quartier ? $request->quartier : null;
        $user->password = Hash::make($request->password);
        $user->image = $request->file('image') ? $request->file('image')->store('images', 'public') : null;
        $user->save();
        event(new Registered($user));

        Auth::login($user);

        return 
        redirect(route('ProductsPage', absolute: false));

    }
    
    

}

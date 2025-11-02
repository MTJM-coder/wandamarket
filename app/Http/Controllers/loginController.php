<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class loginController extends Controller
{
    //
    public function login(Request $req)
    {

        $valideDonnees = $req->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $user = User::where('email', $valideDonnees['email'])
            ->orWhere('telephone', $valideDonnees['email'])
            ->first();
        if (!$user || !Hash::check($valideDonnees['password'], $user->password)) {
            return redirect()->back()->withErrors([
                'email' => 'adresse mail ou mot de passe incorrect.',
            ]);
        }
        // untoken d'authentification

        if ($req->remember_me) {
            Auth::login($user, true);
        } else {
            Auth::login($user);
        }
        
        if ($user->role->value=="vendeur"){
            
            return redirect()->route('seller.dashboard')->with([
                'isConnected' => true,
                'user' => $user
            ]);
        }
// dd(Auth::check());
        return redirect()->route('welcome')->with([
        'isConnected' => true,
        'user' => $user
    ]);
    }

    // reset password step 1
    public function resetStep1(Request $req)
    {
        $req->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $req->email)->first();

        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'Aucun utilisateur trouvé avec cette adresse e-mail.']);
        }

        $code = rand(100000, 999999);
        $user->reset_code = $code;
        $user->save();
        // Envoyer l'e-mail avec le code de réinitialisation
        Mail::raw("Votre code de réinitialisation est : $code", function ($message) use ($user) {
            $message->to($user->email)
                ->subject('Code de réinitialisation du mot de passe');
        });



        return redirect()->back()->with('status', 'Un e-mail de réinitialisation a été envoyé.');
    }

    public function resetStep2(Request $req)
    {
        $req->validate([
            'email' => 'required|email',
            'otp_code' => 'required|integer',
        ]);


        $user = User::where('email', $req->email)->first();
        // dd((string)$user->reset_code);
        if (!$user  || (string)$user->reset_code !== (string)$req->otp_code) {
            return redirect()->back()->withErrors(['otp_code' => 'Code de réinitialisation invalide.']);
        }

        // Stocker l'état pour la prochaine étape
        session(['reset_email' => $user->email]);

        return redirect()->back()->with('status', 'Code de réinitialisation vérifié. Veuillez entrer votre nouveau mot de passe.');
    }

    public function resetStep3(Request $req)
    {
        $req->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $email = session('reset_email');

        if (!$email) {
            return redirect()->back()->withErrors(['password' => 'Aucun e-mail trouvé pour la réinitialisation.']);
        }

        $user = User::where('email', $email)->first();

        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'Aucun utilisateur trouvé avec cette adresse e-mail.']);
        }

        // Mettre à jour le mot de passe
        $user->password = Hash::make($req->password);
        $user->reset_code = null; 
        $user->save();

        session()->forget('reset_email'); 

        return redirect('/connexion')->with('status', 'Votre mot de passe a été réinitialisé avec succès.');
    }
}

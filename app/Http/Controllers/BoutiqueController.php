<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Boutique;
use App\Models\Categorie;
use App\Models\Commande;
use App\Models\CommandeProduit;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\produit;
use Carbon\Carbon;
use Carbon\Month;
use DB;
use GuzzleHttp\Promise\Create;
use Illuminate\Console\Command;

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

        $user = Auth::user();
        if (!$user) {
            return redirect()->route('connexion')->with('error', 'vous devez vous connecter pour enregistrer une boutique');
        }
        $user->role = 'vendeur';
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
        return redirect('/boutique');
    }

    public function boutique()
    {
        $user = Auth::user();
        $user_id = $user->id;
        $boutique = Boutique::where('user_id', $user_id)->first();

        if ($boutique) {
            $produit = Produit::where('boutique_id', $boutique->id)
                ->with('images')
                ->get();

            // recuperer les commandes
            $commandes = Commande::where('boutique_id', $boutique->id)
                ->with(['commandeProduits.produit', 'user'])
                ->get();

            $categorie = Categorie::all();
            $commandeMois = Commande::where('boutique_id', $boutique->id)->where('etat', '!=', 'annulee')
                ->whereYear('created_at', Carbon::now()->year)
                ->whereMonth('created_at', Carbon::now()->month)
                ->count();
            $commandeMoisPrecedent = Commande::where('boutique_id', $boutique->id)->where('etat', '!=', 'annulee')
                ->whereYear('created_at', Carbon::now()->subYear()->year)
                ->whereMonth('created_at', Carbon::now()->subMonth()->month)
                ->count();
            if ($commandeMoisPrecedent !== 0) {
                $pourcentageCom = (($commandeMois - $commandeMoisPrecedent) / $commandeMoisPrecedent) * 100;
            } else {
                $pourcentageCom = $commandeMois > 0 ? 100 : 0;
            }

            $revenuMois = Commande::where('boutique_id', $boutique->id)
                ->where('etat', '!=', 'annulee')
                ->whereYear('created_at', Carbon::now()->year)
                ->whereMonth('created_at', Carbon::now()->month)
                ->select(DB::raw('SUM(montant_total) as total'))
                ->first();
            $revenuMois = $revenuMois->total ?? 0;

            $revenuMoisPrecedent = Commande::where('boutique_id', $boutique->id)->where('etat', '!=', 'annulee')
                ->select(DB::raw('SUM(montant_total) as total'))
                ->whereYear('created_at', Carbon::now()->subYear()->year)
                ->whereMonth('created_at', Carbon::now()->subMonth()->month)
                ->first();
            $revenuMoisPrecedent = $revenuMoisPrecedent->total ?? 0;
            if ($revenuMoisPrecedent !== 0) {
                $pourcentageRev = (($revenuMois - $revenuMoisPrecedent) / $revenuMoisPrecedent) * 100;
            } else {
                $pourcentageRev = $revenuMois > 0 ? 100 : 0;
            }
            $produitPopulaires=produit::where('boutique_id',$boutique->id)->with('images')
                                    ->withCount('commandes')
                                    ->orderBy('commandes_count','desc')
                                    ->limit(5)
                                    ->get();
                            
            return Inertia::render('MaBoutique', [
                'boutique' => $boutique ?? null,
                'produit' => $produit ?? null,
                'commandes' => $commandes,
                'categorie' => $categorie,
                'commandeMois' => $commandeMois,
                'revenuMois' => $revenuMois,
                'pourcentageCom' => $pourcentageCom,
                'pourcentageRev' => $pourcentageRev,
                'produitPopulaires'=>$produitPopulaires

            ]);
        } else {
            return redirect()->route('connexion');
        }
    }
    public function sellerProduct(){
        if(Auth::user()){
            $user=Auth::user();
            $user_id = $user->id;
            $boutique = Boutique::where('user_id', $user_id)->first();
              $produit = Produit::where('boutique_id', $boutique->id)
                ->with('images')
                ->get();
        return Inertia::render('SellerProducts',[
            "produits"=>$produit
        ]);
        }
    }
}


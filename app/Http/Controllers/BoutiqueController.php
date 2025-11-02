<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Boutique;
use App\Models\Categorie;
use App\Models\Commande;
use App\Models\CommandeProduit;
use App\Models\Payement_accounts;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\produit;
use App\Models\SellerSetting;
use Carbon\Carbon;
use Carbon\Month;
use DB;
use GuzzleHttp\Promise\Create;
use Illuminate\Console\Command;
use Illuminate\Validation\Rules\Email;

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
        $invitation_code = base64_encode(uniqid($request->nom . '_'));
        dd($invitation_code);
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
        $boutique->invitation_code = $invitation_code;
        $boutique->save();
        return redirect('/seller/dashboard')->with('success','votre boutique a été crée. Gerez la ici');
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
        $categorie=Categorie::all();
        return Inertia::render('SellerProducts',[
            "produits"=>$produit,
            "categorie"=>$categorie
        ]);
        }
    }
    public function addPaymentMethod(Request $request){
        $request->validate([
            'number'=>'required|min:9'
        ]);
        $user=Auth::user();
        $boutique=Boutique::where('user_id',$user->id)->first();
        $payement=new Payement_accounts();
        $payement->boutique_id=$boutique->id;
        $payement->provider=$request->provider;
        $payement->nom=$request->name;
        $payement->numero=$request->number;
        $payement->is_default=$request->isDefault ? true : false;
        $payement->save();
        return redirect()->back()->with('success','methode de payement ajoutée avec succès');

    }
    public function changePaymentMethod(Request $request){
       
        $request->validate([
            'method=>required'
        ]);
         
        $user=Auth::user();
        $boutique=Boutique::where('user_id',$user->id)->first();
        $sellerSetting=SellerSetting::where('boutique_id',$boutique->id)->first();
        if($sellerSetting){
            if($request->method=='mobile_money'){
                
                if($sellerSetting->payment_mobile==true){
                    $sellerSetting->payment_mobile=false;
                }
                else{
                    $sellerSetting->payment_mobile=true;
              }
                
            }
            elseif($request->method=='cash_on_delivery'){
                if($sellerSetting->payment_cod==true){
                    $sellerSetting->payment_cod=false;
                }
                else{
                    $sellerSetting->payment_cod=true;
                }
                
            }
             $sellerSetting->save();
            
        }
        else{
            $sellerSetting=new SellerSetting();
            $sellerSetting->boutique_id=$boutique->id;
            if($request->method=='mobile_money'){
                $sellerSetting->payment_mobile=true;
                // $sellerSetting->payment_cod=false;
                
            }
            elseif($request->method=='cash_on_delivery'){
                $sellerSetting->payment_cod=true;
                $sellerSetting->payment_mobile=false;
            }
            $sellerSetting->save();

        }
        // dd($sellerSetting);
    }

    public function deletePaymentAccount($id){
        $spa=Payement_accounts::find($id);
        if($spa){
            $spa->delete();
            return redirect()->back()->with('success','Compte supprimé');
        }
        else{
            return redirect()->back()->with('error','compte introuvable');
        }
    }

    public function saveSellerPreferencesNotification(Request $req){
        $user=Auth::user();
        $boutique=Boutique::where('user_id',$user->id)->first();
        if(!$boutique){
            return redirect()->back()->with('error','boutique introuvable');
        }
        else{
            $sellerSetting=SellerSetting::where('boutique_id',$boutique->id)->first();
            if($sellerSetting){
               
                $sellerSetting->notification_mail=$req->formData['email'];
                $sellerSetting->notification_sms=$req->formData['sms'];
                $sellerSetting->language=$req->formData['langue'];
                $sellerSetting->save();
                return redirect()->back()->with('success','parametre mis a jour');
            }
            else{
                $sellerSetting=new SellerSetting();
                $sellerSetting->notification_mail=$req->email;
                $sellerSetting->notification_sms=$req->sms;
                $sellerSetting->language=$req->langue;
                $sellerSetting->save();
                return redirect()->back()->with('success','parametre mis a jour');

            }
        }

    }
    public function updateSellerVisibility(Request $request){
     
        $user=Auth::user();
        $boutique=Boutique::where('user_id',$user->id)->first();
        if(!$boutique){
            return redirect()->back()->with('error','boutique introuvable');
        }
        else{
            $sellerSetting=SellerSetting::where('boutique_id',$boutique->id)->first();
            if($sellerSetting){
                $sellerSetting->visibility=$request->visibilite;
                $sellerSetting->save();
                return redirect()->back()->with('success','visibilité mise à jour');
            }
            else{
                $sellerSetting=new SellerSetting();
                $sellerSetting->boutique_id=$boutique->id;
                $sellerSetting->visibility=$request->visibilite;
                $sellerSetting->save();
                return redirect()->back()->with('success','visibilité mise à jour');

            }
        }
    }

    public function deleteAccount(){
        $user=Auth::user();
        $boutique=Boutique::where('user_id',$user->id)->first();
        if(!$boutique){
            return redirect()->back()->with('error','boutique introuvable');
        }
        else{
            $user->role='client';
            $user->save();
            $boutique->delete();
            return redirect()->route('connexion')->with('success','votre compte vendeur a été supprimé');
        }
    }
}


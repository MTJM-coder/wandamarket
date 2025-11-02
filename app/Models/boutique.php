<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Produit;
use App\Models\AvisBoutique;
use App\Models\User;
use App\Models\Commande;
use App\Models\Payement_account;
use Illuminate\Database\Eloquent\SoftDeletes;

class Boutique extends Model
{
    use SoftDeletes;
    //
    protected $fillable =[
        'nom',
        'ville',
        'quartier',
        'description',
        'telephone',
        'email',
        'invitation_code',
        'site_web',
    ];

    protected $casts = [
        'site_web'=>'string',
    ];
protected $dates=['deleted_at'];
    // public function VerifierUrl(){
    //     if(!preg_match('/^https?:\/\//', $this->site_web)){
    //         //
    //         return 'http://'.$this->site_web;
    //     }
    //     return $this->site_web;
    // }

    public function produits()
    {
        return $this->hasMany(Produit::class);
    }

    public function avisBoutiques()
    {
        return $this->hasMany(AvisBoutique::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function commandes(){
        return $this->hasMany(Commande::class);
    }
    public function payements(){
        return $this->hasMany(Payement_accounts::class);
    }
    public function assistants()
    {
        return $this->hasMany(assistants::class);
    }
}

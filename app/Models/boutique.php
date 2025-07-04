<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Boutique extends Model
{
    //
    protected $fillable =[
        'nom',
        'ville',
        'quartier',
        'description',
        'telephone',
        'email',
        'site_web',
    ];

    protected $casts = [
        'site_web'=>'string',
    ];

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
}

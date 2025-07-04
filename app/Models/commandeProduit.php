<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommandeProduit extends Model
{
    //
    protected $fillable = [
        'commande_id',
        'produit_id',
        'quantite',
        'prix_unitaire',
        'prix_total',
    ];

    public function commandes(){
        return $this->belongsToMany(Commande::class);
    }

    public function produits(){
        return $this->belongsToMany(Produit::class);
    }
}

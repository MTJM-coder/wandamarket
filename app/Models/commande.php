<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    //
    protected $fillable = [
        'acheteur_id',
        'montant_total',
        'boutique_id',
        'etat',
        'mode_paiement',
        'numero_livraison',
        'date_livraison',
    ];

    // public function produits(){
    //     $this->hasMany(Produit::class);
    // }

    public function users(){
        $this->belongsTo(User::class);
    }

    
}

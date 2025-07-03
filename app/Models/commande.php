<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    //
    protected $fillable = [
        'user_id',
        'montant_total',
        'statut',
        'date_commande',
        'mode_paiement',
        'numero_livraison'
    ];

    public function produits(){
        $this->hasMany(Produit::class);
    }

    public function users(){
        $this->belongsTo(User::class);
    }

    
}

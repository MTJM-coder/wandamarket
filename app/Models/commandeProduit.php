<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommandeProduit extends Model
{
    protected $fillable = [
        'commande_id',
        'produit_id',
        'quantite',
        'prix_unitaire',
        'prix_total',
        'nom_produit', // optionnel pour garder le nom si le produit est supprimé
    ];

    // Une ligne de commande appartient à une commande
    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    // Une ligne de commande appartient à un produit
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
}


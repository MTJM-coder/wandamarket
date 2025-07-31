<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'acheteur_id',
        'montant_total',
        'boutique_id',
        'etat',
        'mode_paiement',
        'numero_livraison',
        'date_livraison',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'acheteur_id');
    }

    public function commandeProduits()
{
    return $this->hasMany(CommandeProduit::class);
}
    public function boutique()
    {
        return $this->belongsTo(Boutique::class);
    }

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'commande_produits')->withPivot('quantite');
    }
}

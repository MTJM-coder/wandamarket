<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $fillable = [
        'nom',
        'description',
        'prix',
        'boutique_id',
        'image',
        'quantite',
        'disponible',
        'reduction',
        'prix_reduit',
        'categorie_id',
        'slug',
    ];

    protected $casts = [
        'reduction'    => 'decimal:2',
        'prix_reduit'  => 'decimal:2',
    ];

    /**
     * Tronquer la réduction à 2 chiffres après la virgule
     */
    public function tronquerA2Chiffres()
    {
        return number_format($this->reduction, 2, '.', '');
    }

    /**
     * Convertir le prix réduit en entier (arrondi supérieur)
     */
    public function convertirPrixEnEntier()
    {
        return ceil($this->prix_reduit);
    }

    /**
     * Relation avec les avis
     */
    public function avis()
    {
        return $this->hasMany(AvisProduit::class);
    }

    /**
     * Relation avec la boutique
     */
    public function boutique()
    {
        return $this->belongsTo(Boutique::class);
    }

    /**
     * Relation avec la catégorie
     */
    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    /**
     * Relation avec les images
     */
    public function images()
    {
        return $this->hasMany(Image::class);
    }

    /**
     * Relation avec les favoris
     */
    public function favoris()
    {
        return $this->hasMany(Favoris::class);
    }

    /**
     * Relation avec les commandes (table pivot commande_produits)
     */
    public function commandes()
    {
        return $this->belongsToMany(Commande::class, 'commande_produits')
                    ->withPivot('quantite', 'prix_unitaire');
    }
}

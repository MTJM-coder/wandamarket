<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class produit extends Model
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

    protected $casts=[
        'reduction' => 'decimal:2',
        'prix_reduit'=>'decimal:2',
    ];

    public function TronquerA2Chiffres(){
        return number_format($this->reduction, 2);
    }
    
    public function convertirPrixEnEntier(){
        return ceil($this->prix_reduit, 0);
    }
    public function avis(){
        return $this->hasMany(AvisProduit::class);
    }
    public function boutique(){
        return $this->belongsTo(Boutique::class);
    }

    public function categories(){
        return $this->belongsTo(Categorie::class);
    }
    public function images() {
    return $this->hasMany(Image::class);
}
    public function favoris(){
        return $this->hasMany(favoris::class);
    }
   public function commandes()
{
    return $this->belongsToMany(Commande::class, 'commande_produits')
                ->withPivot('quantite', 'prix_unitaire'); 
}
}

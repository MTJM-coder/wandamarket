<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Boutique extends Model
{
    //
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

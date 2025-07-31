<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class favoris extends Model
{
    //

    public function produits(){
        return $this->belongsTo(produit::class);
    }
    public function Users(){
        return $this->belongsTo(User::class);
    }

}

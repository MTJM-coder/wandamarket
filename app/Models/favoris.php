<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class favoris extends Model
{
    //

    public function produit(){
        return $this->belongsTo(produit::class,'produit_id');
    }
    public function Users(){
        return $this->belongsTo(User::class);
    }

}

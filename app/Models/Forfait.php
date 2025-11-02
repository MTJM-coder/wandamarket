<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Forfait extends Model
{
    //
    public function abonnements(){
        return $this->hasMany(Abonnement::class);
    }
}

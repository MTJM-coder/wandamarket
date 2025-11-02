<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AvisProduit extends Model
{
    //
    protected $fillable = [
        'note',
        'commentaire',
        'visible',
        'produit_id',
        'acheteur_id',
        'slug',
    ];

    protected $casts = [
        'note'=>'int',
    ];
    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class,'acheteur_id');
    }
}

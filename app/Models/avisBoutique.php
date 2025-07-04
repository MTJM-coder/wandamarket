<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AvisBoutique extends Model
{
    //
    protected $fillable = [
        'note',
        'commentaire',
        'boutique_id',
        'acheteur_id',
        'visible',
        'slug',
    ];

    protected $casts = [
        'note'=>'int',
    ];

    public function boutique()
    {
        return $this->belongsTo(Boutique::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

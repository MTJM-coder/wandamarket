<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payement_accounts extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'provider',
        'nom',
        'numero',
        'is_default',
    ];

    // Relation avec User
    public function boutique()
    {
        return $this->belongsTo(Boutique::class);
    }
}

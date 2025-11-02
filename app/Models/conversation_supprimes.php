<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class conversation_supprimes extends Model
{
    //
    protected $fillable=[
        'conversation_id',
        'user_id'
    ];

    public function conversation(){
        return $this->belongsTo(conversation::class);
    }

    public function user(){
        return $this->belongsTo(user::class);
    }
}

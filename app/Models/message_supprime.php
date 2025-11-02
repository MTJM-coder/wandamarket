<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class message_supprime extends Model
{
    //
    protected $fillable=[
        'user_id',
        'message_id'
    ];
    public function message(){
        return $this->belongsTo(Message::class);
    }
    public function user(){
        return $this->belongsTo(user::class);
    }
}

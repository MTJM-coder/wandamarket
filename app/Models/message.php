<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //
   public function usersSend(){
    $this->belongsTo(User::class);
   }
   public function userReceive(){
    $this->belongsTo(User::class);
   }
}

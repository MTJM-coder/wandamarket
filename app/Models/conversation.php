<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class conversation extends Model
{
    //
    protected $fillables = [
        'user1_id',
        'user2_id',
    ];

    public function user1(){
        return $this->belongsTo(User::class);
    }
    public function user2(){
        return $this->belongsTo(User::class);
    }
    public function message(){
        return $this->hasMany(Message::class);
    }

    // public static function paireVerify($user1_id, $user2_id):bool{
    //     return self::where('user1_id',$user1_id)->where('user2_id',$user2_id)->exists();
    // }
}

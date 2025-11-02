<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Message;
use Auth;

class conversation extends Model
{
    //
    protected $fillable = [
        'user1_id',
        'user2_id',
    ];

    public function user1(){
        return $this->belongsTo(User::class);
    }
    public function user2(){
        return $this->belongsTo(User::class);
    }
   public function message()
{
    $user=Auth::user();
    $userId = $user ? $user->id : null;

    return $this->hasMany(Message::class)
        ->whereNotIn('id', function ($query) use ($userId) {
            $query->select('message_id')
                ->from('message_supprimes')
                ->where('user_id', $userId);
        })
        ->orderBy('created_at', 'asc');
}


    // public static function paireVerify($user1_id, $user2_id):bool{
    //     return self::where('user1_id',$user1_id)->where('user2_id',$user2_id)->exists();
    // }
}

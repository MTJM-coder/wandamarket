<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //
    protected $fillables = [
        'expediteur_id',
        'destinataire_id',
        'contenu',
        'lu',
        'date_reception',
        'sujet',
        'important',
        'type',
        'piece_jointe',
        'conversation_id',
        'archive',
        'supprime',
        'repondu',
        'transfere',
        'mode_envoi',
        'date_prog',
        'réponse_automatique',
    ];

   public function usersSend(){
    $this->belongsTo(User::class);
   }
   public function userReceive(){
    $this->belongsTo(User::class);
   }
   public function conversation(){
    $this->belongsTo(Conversation::class);
   }
}

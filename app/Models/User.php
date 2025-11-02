<?php

namespace App\Models;
use App\UserRules;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Pest\Mutate\Event\Events\Test\Outcome\Uncovered;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,HasApiTokens;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'mot_de_passe',
        'role',
        'ville',
        'quartier',
        'image',
        'statut',
        'slug',
    ];
protected $dates=['deleted_at'];
    protected $casts= [
        'role'=>UserRules::class,
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'mot_de_passe',
        // 'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            // 'email_verified_at' => 'datetime',
            'mot_de_passe' => 'hashed',
        ];
    }


    public function commandes(){
        $this->hasMany(Commande::class);
    }

    public function conversationUser1(){
        return $this->hasMany(Conversation::class);
    }

    public function conversationUser2(){
        return $this->hasMany(Conversation::class);
    }

    public function avisBoutique(){
       return  $this->hasMany(AvisBoutique::class);
    }

    public function avisProduit(){
       return  $this->hasMany(AvisProduit::class);
    }

    public function messageSend(){
       return  $this->hasMany(Message::class);
    }
    public function messageReceive(){
       return  $this->hasMany(Message::class);
    }
    public function boutique(){
        return $this->hasOne(Boutique::class);
    }
    public function favoris(){
        return $this->hasMany(favoris::class);
    }
    public function abonnement(){
        return $this->hasMany(Abonnement::class);
    }
    public function assistants()
    {
        return $this->hasMany(assistants::class);
    }
    

}

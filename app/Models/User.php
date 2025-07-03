<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Pest\Mutate\Event\Events\Test\Outcome\Uncovered;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function boutiques(){
        $this->belongsTo(Boutique::class);
    }

    public function commandes(){
        $this->hasMany(Commande::class);
    }

    public function avisBoutique(){
        $this->hasMany(AvisBoutique::class);
    }

    public function avisProduit(){
        $this->hasMany(AvisProduit::class);
    }

    public function messageSend(){
        $this->hasMany(Message::class);
    }
    public function messageReceive(){
        $this->hasMany(Message::class);
    }
}

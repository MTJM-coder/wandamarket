<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SellerSetting extends Model
{
    // Nom de la table explicitement défini au cas où
    protected $table = 'seller_settings';

    // Champs qui peuvent être remplis en masse
    protected $fillable = [
        'boutique_id',
        'payment_mobile',
        'payment_cod',
        'notification_mail',
        'notification_sms',
        'language',
        'visibility',
    ];

    /**
     * Relation avec la boutique
     */
    public function boutique()
    {
        return $this->belongsTo(Boutique::class, 'boutique_id');
    }
}

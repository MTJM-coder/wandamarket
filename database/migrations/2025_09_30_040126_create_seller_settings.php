<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seller_settings', function (Blueprint $table) {
            $table->id();

            // Relation avec la boutique
            $table->foreignId('boutique_id')
                  ->constrained('boutiques')
                  ->onDelete('cascade');

            // Paramètres de paiement
            $table->boolean('payment_mobile')->default(false); // paiement mobile activé ou non
            $table->boolean('payment_cod')->default(true); // paiement à la livraison (cash on delivery)

            // Notifications
            $table->boolean('notification_mail')->default(false);
            $table->boolean('notification_sms')->default(true);

            // Paramètres d'affichage
            $table->enum('language', ['fr', 'en'])->default('fr'); // fr ou en
            $table->enum('visibility', ['public', 'private'])->default('public'); // visibilité de la boutique

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seller_settings');
    }
};

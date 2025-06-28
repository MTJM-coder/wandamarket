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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('expediteur_id');
            $table->unsignedBigInteger('destinataire_id');
            $table->text('contenu');
            $table->boolean('lu')->default(false);
            $table->foreign('expediteur_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('destinataire_id')->references('id')->on('users')->onDelete('cascade');
            $table->dateTime('date_envoi')->nullable();
            $table->dateTime('date_reception')->nullable();
            $table->string('sujet')->nullable();
            $table->boolean('important')->default(false);
            $table->string('type')->default('message'); // message, notification, alerte
            $table->string('piece_jointe')->nullable(); // chemin vers la pièce jointe
            $table->unsignedBigInteger('conversation_id')->nullable(); // pour regrouper les messages dans une conversation
            $table->foreign('conversation_id')->references('id')->on('conversations')->onDelete('set null');
            $table->boolean('archive')->default(false);
            $table->boolean('supprime')->default(false);
            $table->boolean('repondu')->default(false); // pour savoir si le message a été répondu
            $table->boolean('transfere')->default(false); // pour savoir si le message a été transféré
            $table->string('mode_envoi')->default('instantané'); // mode d'envoi du message, par exemple 'instantané', 'programmé'
            $table->dateTime('date_prog')->nullable(); // date et heure de programmation de l'envoi du message
            $table->string('réponse_automatique')->nullable(); // réponse automatique en cas d'absence ou de non disponibilité
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};

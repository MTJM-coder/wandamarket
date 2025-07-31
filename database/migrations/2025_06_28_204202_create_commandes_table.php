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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('acheteur_id');
            $table->foreign('acheteur_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('boutique_id');
            $table->foreign('boutique_id')->references('id')->on('boutiques')->onDelete('cascade');
            $table->decimal('montant_total', 10, 2);
            $table->date('date_commande');
            $table->string('etat')->default('en attente'); // en attente,  expédiée, livrée, annulée
            $table->string('mode_paiement')->default('a la livraison'); // en ligne, à la livraison
            $table->string('numero_livraison')->nullable();
            $table->dateTime('date_livraison')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};

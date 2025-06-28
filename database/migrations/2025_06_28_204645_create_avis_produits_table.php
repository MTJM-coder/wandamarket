<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('avis_produits', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->unsignedBigInteger('produit_id');
            $table->foreign('produit_id')->references('id')->on('produits')->onDelete('cascade');

            $table->unsignedBigInteger('acheteur_id');
            $table->foreign('acheteur_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('note')->default(0); // Note de 0 à 5
            $table->text('commentaire')->nullable();
            $table->boolean('visible')->default(true); // Affichage public
            $table->timestamp('date_avis')->useCurrent(); // Date automatique
            $table->string('slug', 191)->unique(); // Pour URL
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('avis_produits');
    }
};

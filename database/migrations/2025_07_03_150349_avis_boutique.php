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
        Schema::create('avis_boutique', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->unsignedBigInteger('boutique_id');
            $table->foreign('boutique_id')->references('id')->on('boutiques')->onDelete('cascade');

            $table->unsignedBigInteger('acheteur_id');
            $table->foreign('acheteur_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('note')->default(0); // Note de 0 à 5
            $table->text('commentaire')->nullable();
            $table->boolean('visible')->default(true); // Affichage public
            $table->timestamp('date_avis')->useCurrent(); // Date automatique
            $table->string('slug', 191)->unique(); // Pour URL
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::create('mobile_accounts', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('boutique_id'); // Lien avec l'utilisateur
        $table->string('provider');            // orange_money, mtn_money
        $table->string('nom');                // Nom du compte
        $table->string('numero');              // Numéro de téléphone
        $table->boolean('is_default')->nullable()->default(false); // Par défaut ou non
        $table->timestamps();

        $table->foreign('boutique_id')->references('id')->on('boutiques')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payement_accounts');
    }
};

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
        Schema::create('forfaits', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // nom du forfait (ex: Basique, Pro, Premium)
            $table->enum('duree', ['1 mois', '3 mois', '1 an', 'illimite']); // durée du forfait
            $table->boolean('pourcentage');
            $table->decimal('prix', 10, 2); // prix du forfait
            $table->text('description')->nullable(); // description optionnelle
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forfait');
    }
};

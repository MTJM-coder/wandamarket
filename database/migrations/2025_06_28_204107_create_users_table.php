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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nom');
            $table->string('prenom')->nullable();
            $table->string('email',191)->unique();
            $table->string('telephone')->nullable();
            $table->string('mot_de_passe');
            $table->enum('role', ['client', 'vendeur', 'admin'])->default('client');
            $table->string('ville')->nullable();
            $table->string('quartier')->nullable();
            $table->string('image')->nullable();
            $table->rememberToken();
            $table->string('slug',191)->unique()->nullable(); // Slug pour l'URL
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

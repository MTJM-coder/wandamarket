<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assistants', function (Blueprint $table) {
            $table->id();
            
            // Relations
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('boutique_id')->nullable()->constrained()->onDelete('cascade');

            // Rôle de l’assistant
            $table->enum('role', ['admin', 'editeur', 'lecteur'])->default('lecteur');

            // Statut de l’assistant (actif ou désactivé)
            $table->boolean('active')->default(true);

            // Suppression douce + timestamps
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assistants');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Doctrine\DBAL\Types\Type;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['client', 'vendeur', 'admin', 'super_admin', 'assistant'])->default('client')->change();
            $table->enum('statut', ['actif', 'inactif'])->default('actif')->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['client', 'vendeur', 'admin', 'super_admin'])->default('client')->change();
            $table->enum('statut', ['actif'])->default('actif')->change();
        });
    }
};

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
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nom');
            $table->text('description')->nullable();
            $table->decimal('prix', 10, 2);
            $table->unsignedBigInteger('boutique_id');
            $table->foreign('boutique_id')->references('id')->on('boutiques')->onDelete('cascade');
            $table->string('image')->nullable();
            $table->integer('quantite')->default(0);
            $table->boolean('disponible')->default(true);
            $table->boolean('reduction')->default(false);
            $table->decimal('prix_reduit', 10, 2)->nullable();
            $table->bigInteger('categorie_id')->unsigned()->nullable();
            $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('set null');
            $table->string('slug',191)->unique();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};

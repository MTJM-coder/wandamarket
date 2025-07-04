<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create("avis_boutiques", function (Blueprint $table){
            $table->id();
            $table->timestamps();

            $table->unsignedBigInteger('acheteur_id');
            $table->foreign('acheteur_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('boutique_id');
            $table->foreign('boutique_id')->references('id')->on('boutiques')->onDelete('cascade');

            $table->integer('note')->default(0);
            $table->text('commentaire')->nullable();
            $table->boolean('visible')->default(true);
            $table->timestamp('date_avis')->useCurrent();
            $table->string('slug', 191)->unique();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('avis_boutiques');
    }
};

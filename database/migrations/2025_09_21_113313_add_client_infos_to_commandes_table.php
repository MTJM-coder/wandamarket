<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up()
{
    Schema::table('commandes', function (Blueprint $table) {
        $table->string('client_nom');
        $table->string('client_telephone');
        $table->string('client_ville');
        $table->string('client_quartier')->nullable();
    });
}

public function down()
{
    Schema::table('commandes', function (Blueprint $table) {
        $table->dropColumn(['client_nom', 'client_telephone', 'client_ville', 'client_quartier']);
    });
}

};

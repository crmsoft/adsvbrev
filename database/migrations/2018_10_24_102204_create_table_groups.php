<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name')->default('unknown');
            $table->string('slug')->unique();
            $table->string('ava')->default('');
            $table->string('poster')->default('');
            
            $table->json('options')->nullable();

            $table->boolean('is_game')->default(false);

            $table->unsignedInteger('love_reactant_id')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('groups');
    }
}

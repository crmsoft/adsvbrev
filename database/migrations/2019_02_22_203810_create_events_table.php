<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string('type');
            $table->unsignedInteger('creator_id');

            $table->string('name')->default('unknown');
            $table->text('description');
            $table->string('ava')->default('');
            $table->string('poster')->default('');
            $table->timestamp('start')->default('0000-00-00 00:00:00');
            $table->boolean('is_private');
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}

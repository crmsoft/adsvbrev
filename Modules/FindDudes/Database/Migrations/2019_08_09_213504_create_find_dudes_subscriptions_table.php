<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFindDudesSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('find_dudes_subscriptions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('game_id');
            $table->unsignedInteger('user_id');
            $table->string('token');
            $table->timestamps();

            $table->unique(['game_id', 'user_id', 'token']);

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('game_id')
                ->references('id')
                ->on('groups')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('find_dudes_subscriptions');
    }
}

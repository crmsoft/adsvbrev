<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGameReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game_reviews', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('group_id');
            $table->unsignedInteger('user_id');

            $table->text('review');
            $table->string('vote');
            $table->unsignedInteger('love_reactant_id');

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('group_id')
                ->references('id')
                ->on('groups')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
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
        Schema::dropIfExists('game_reviews');
    }
}

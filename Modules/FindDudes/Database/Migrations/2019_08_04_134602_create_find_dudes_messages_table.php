<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFindDudesMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('find_dudes_messages', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedInteger('game_id');
            $table->unsignedInteger('user_id');
            $table->unsignedBigInteger('sub_channel_id')->nullable();
            $table->text('message');

            $table->timestamps();

            $table->softDeletes();

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
        Schema::dropIfExists('find_dudes_messages');
    }
}

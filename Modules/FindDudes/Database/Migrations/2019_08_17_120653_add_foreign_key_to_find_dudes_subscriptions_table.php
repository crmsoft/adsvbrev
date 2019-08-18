<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeyToFindDudesSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('find_dudes_subscriptions', function (Blueprint $table) {
            $table->foreign('sub_channel_id')->references('id')->on('find_dudes_game_channels')->onDelete('set null');
        });

        Schema::table('find_dudes_messages', function (Blueprint $table) {
            $table->foreign('sub_channel_id')->references('id')->on('find_dudes_game_channels')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('find_dudes_subscriptions', function (Blueprint $table) {
            $table->dropForeign('sub_channel_id');
        });

        Schema::table('find_dudes_messages', function (Blueprint $table) {
            $table->dropForeign('sub_channel_id');
        });
    }
}

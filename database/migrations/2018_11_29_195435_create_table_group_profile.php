<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableGroupProfile extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_profiles', function (Blueprint $table) {
            $table->increments('id');

            $table->string('ava')->nullable();
            $table->unsignedInteger('group_id');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('group_id')->on('groups')->references('id')
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
        Schema::dropIfExists('group_profiles');
    }
}

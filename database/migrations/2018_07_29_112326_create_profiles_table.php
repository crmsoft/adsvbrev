<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string('ava')->default('http://via.placeholder.com/160/95a/fff?text=?');
            $table->string('cover')->nullable();

            $table->text('about')->nullable();
            $table->timestamp('dob')->nullable();
            $table->string('timezone')->default('Europe/Istanbul')->nullable();
            $table->string('phone')->nullable();
            $table->string('gender')->nullable();

            $table->json('options');
            
            $table->string('m_status')->default('online');
            $table->string('m_sound')->default('on');

            $table->unsignedInteger('user_id');
            $table->timestamps();

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
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('profiles');
        Schema::enableForeignKeyConstraints();
    }
}

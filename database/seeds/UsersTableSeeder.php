<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 50)->create()->each(function ($user) {
            $profile = factory(App\Entities\Profile::class)->make();
            $profile->ava = $user->ava;
            $user->profile()->save( $profile );
        });
    }
}

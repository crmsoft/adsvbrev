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

        $friends = 10;

        while(--$friends){
            \App\UserFriends::create([
                'user_id' => 29,
                'friend_id' => $friends,
                'status' => 'friend'
            ]);
            \App\UserFriends::create([
                'user_id' => $friends,
                'friend_id' => 29,
                'status' => 'friend'
            ]);
        }
    }
}

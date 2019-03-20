<?php

use Illuminate\Database\Seeder;

class ReactionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('love_reaction_types')->insert([
            'name' => 'like',
            'weight' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        \DB::table('love_reaction_types')->insert([
            'name' => 'share',
            'weight' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}

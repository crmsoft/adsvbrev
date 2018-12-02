<?php

use Faker\Generator as Faker;

$factory->define(\App\Entities\Group::class, function (Faker $faker) {
    return [
        'owner' => \App\User::inRandomOrder()->first()->id,
        'name' => $faker->name
    ];
});

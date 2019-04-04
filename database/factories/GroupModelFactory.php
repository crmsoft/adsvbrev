<?php

use Faker\Generator as Faker;

$factory->define(\App\Entities\Group::class, function (Faker $faker) {
    return [
        'is_game' => rand(0,1),
        'name' => $faker->name
    ];
});

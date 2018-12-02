<?php

use Faker\Generator as Faker;

$factory->define(\App\Entities\Profile::class, function (Faker $faker) {
    return [
        'phone' => $faker->phoneNumber,
        'about' => $faker->text,
        'dob' => $faker->date(),
        'gender' => $faker->randomDigit % 2 == 0 ? 'male' : 'female',
    ];
});

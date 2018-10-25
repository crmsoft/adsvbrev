<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $hidden = [
        'created_at',
        'updated_at',
        'user_id',
        'id'
    ];
}

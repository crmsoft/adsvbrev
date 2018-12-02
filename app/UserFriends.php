<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserFriends extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'friend_id',
        'status'
    ];
}

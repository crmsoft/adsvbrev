<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class UserNotification extends Model
{
    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }

    public function notifiable()
    {
        return $this->morphTo();
    }
}

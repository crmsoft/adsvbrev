<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \App\User;

class Group extends Model
{
    use SoftDeletes;

    const STATUS_SUBSCRIBE = 'subscribe';
    const STATUS_JOINED = 'joined';

    public function user(){
        return $this->belongsTo(User::class, 'owner');
    }


}

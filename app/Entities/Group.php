<?php

namespace App\Entities;

use App\GroupProfile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \App\User;

class Group extends Model
{
    use SoftDeletes;

    const STATUS_SUBSCRIBE = 'subscribe';
    const STATUS_JOINED = 'joined';

    protected $hidden = [
        'pivot',
        'deleted_at',
        'updated_at',
        'id',
        'owner'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'owner');
    }

    public function profile(){
        return $this->hasOne(GroupProfile::class);
    }
}

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
        'id',
    ];

    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($value)
    {
        $value = \Hashids::decode($value);
        return $this->where($this->getRouteKeyName(), empty($value) ? -1 : $value)->first();
    }

    public function managers(){
        return $this->belongsToMany(User::class, 'group_manager', 'group_id', 'user_id');
    }

    public function profile(){
        return $this->hasOne(GroupProfile::class);
    }

    public function participants()
    {
        return $this->hasManyThrough(
            User::class, 
            UserGroup::class,
            'group_id',
            'id',
            'id',
            'user_id'
        );
    }

    public function posts()
    {
        return $this->morphToMany(\App\Post::class, 'postable')->withTimestamps();
    }
}

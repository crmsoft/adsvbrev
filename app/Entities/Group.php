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
     * the list of vars that should be mutated
     * 
     * @var array
     */
    protected $casts = [
        'options' => 'array'
    ];

    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function managers(){
        return $this->belongsToMany(User::class, 'group_manager', 'group_id', 'user_id');
    }

    public function profile(){
        return $this->hasOne(GroupProfile::class);
    }

    public function participants()
    {
        return $this->belongsToMany(
            User::class,
            'user_groups',
            'group_id',
            'user_id'
        );
    }

    public function posts()
    {
        return $this->morphToMany(\App\Post::class, 'postable')->withTimestamps();
    }

    public function media(){
        return $this->morphMany(\App\Media::class, 'mediable');
    }
}

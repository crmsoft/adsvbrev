<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'ava',
        'poster',
        'start',
        'description',
        'name',
        'creator_id'
    ];

    protected $casts = [
        'start' => 'date'
    ];

    public function getHashAttribute()
    {
        return \Hashids::encode($this->id);
    }

    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($value)
    {
        $value = \Hashids::decode($value);
        return $this->where($this->getRouteKeyName(), $value)->first();
    }

    public function userParticipants()
    {
        $user = auth()->user();
        return $this->participants()->where('user_id', $user->id)->count() > 0;
    }

    public function user()
    {
        return $this->belongsTo(\App\User::class, 'creator_id');
    }

    public function participants()
    {
        return $this->belongsToMany(\App\User::class, 'event_participants');
    }
}

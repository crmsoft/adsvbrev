<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Cog\Laravel\Love\Reactable\Models\Traits\Reactable;
use Cog\Contracts\Love\Reactable\Models\Reactable as ReactableContract;

use \App\User;
use App\GroupProfile;

class Group extends Model implements ReactableContract
{
    use SoftDeletes, Reactable;

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

    public function getRoleAttribute()
    {
        $user = auth()->user();
        $role = '';

        if ($manager = $this->managers->where('id', $user->id)->first()){
            if($manager->pivot->hierarchy == 1)
            {
                $role = 'administrator';
            } else {
                $role = 'moderator';
            }
        }

        return $role;
    }

    public function getIsPrivateAttribute()
    {
        return !!($this->options['is_private'] ?? false);
    }

    public function getRelatedGroupsAttribute()
    {
        return self::find(
            $this->options['related']
        );
    }

    public function managers(){
        return $this->belongsToMany(User::class, 'group_manager', 'group_id', 'user_id')
        ->withPivot('hierarchy');
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
        )->withPivot('status');
    }

    public function posts()
    {
        return $this->morphToMany(\App\Post::class, 'postable')->withTimestamps();
    }

    public function media(){
        return $this->morphMany(\App\Media::class, 'mediable');
    }

    public function invitations()
    {
        return $this->morphsToMany(\App\Entities\Group::class, 'to');
    }
}

<?php

namespace App\Entities;

use App\Media;
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
        'is_private',
        'creator_id'
    ];

    protected $casts = [
        'start' => 'date',
        'is_private' => 'bool'
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
        return $this->participants()->where('user_id', $user->id)->first();
    }

    public function user()
    {
        return $this->belongsTo(\App\User::class, 'creator_id');
    }

    public function participants()
    {
        return $this->belongsToMany(\App\User::class, 'event_participants')->withPivot('type');
    }

    public function posts()
    {
        return $this->morphToMany(\App\Post::class, 'postable')->withTimestamps();
    }

    public function games()
    {
        return $this->belongsToMany(\App\Entities\Game::class, 'event_group', 'event_id', 'group_id');
    }

    public function invitations()
    {
        return $this->morphsToMany(\App\Entities\Group::class, 'to');
    }

    /**
     * Accessor relation like media query logic
     * 
     * @return Collection
     */
    public function getMediaAttribute()
    {
        $event_id = $this->id;

        return Media::fromQuery(
            \DB::table('postables')
            ->join('media', function($query) use ($event_id) {
                $query->on('media.mediable_id', '=', 'postables.post_id');
                $query->on('mediable_type', '=', \DB::raw('\'App\\\\Post\''));
                $query->on('postables.postable_type', '=', \DB::raw('\'App\\\\Entities\\\\Event\''));
                $query->on('postables.postable_id', '=', \DB::raw($event_id));
            })->select('media.*')->toSql()
        );
    }
}

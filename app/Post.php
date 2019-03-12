<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

use Cog\Contracts\Love\Likeable\Models\Likeable as LikeableContract;
use Cog\Laravel\Love\Likeable\Models\Traits\Likeable;

use BrianFaust\Commentable\Traits\HasComments;


class Post extends Model implements LikeableContract
{
    use SoftDeletes, HasComments, Likeable;

    protected $appends = [
        'human_ago', 'hash'
    ];

    public function getHashAttribute()
    {
        return \Hashids::encode($this->id);
    }

    public function getHumanAgoAttribute()
    {
        return $this->created_at ? $this->created_at->diffForHumans() : '';
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

    public function user(){
        return $this->belongsTo(User::class, 'postable_id');
    }

    public function event(){
        return $this->belongsTo(\App\Entities\Event::class, 'postable_id');
    }

    public function media(){
        return $this->hasMany(Media::class, 'relation_id')
                ->where('type', 'post');
    }

    public function postable()
    {
        return $this->morphTo();
    }
}

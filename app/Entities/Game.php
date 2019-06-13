<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Game extends Group
{
    const VOTE_UP = 'vote-up';
    const VOTE_DOWN = 'vote-down';

    protected $table = 'groups';

    public static function boot()
    {
        parent::boot();
        
        static::addGlobalScope('isGame', function (Builder $builder) {
            $builder->where('is_game', true);
        });
    }

    public function getPlatformsAttribute()
    {
        $arr = collect($this->options['system_requirements']);
        
        return $arr->filter(function($platform){
            return !empty($platform);
        })->map(function($platform, $key){
            return ucfirst($key);
        })->implode(', ');
    }

    public function genres()
    {
        return $this->belongsToMany(\App\Entities\Genre::class, 'game_genre', 'group_id', 'genre_id');
    }

    public function developers()
    {
        return $this->belongsToMany(\App\Entities\GameDeveloper::class, 'game_developer');
    }

    public function gamers()
    {
        return $this->belongsToMany(\App\User::class, 'user_groups', 'group_id', 'user_id');
    }

    public function reviews()
    {
        return $this->hasMany(GameReview::class, 'group_id');
    }
}

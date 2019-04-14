<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Game extends Group
{
    protected $table = 'groups';

    public static function boot()
    {
        parent::boot();
        
        static::addGlobalScope('isGame', function (Builder $builder) {
            $builder->where('is_game', true);
        });
    }

    public function genres()
    {
        return $this->belongsToMany(\App\Entities\Genre::class, 'game_genre', 'group_id', 'genre_id');
    }

    public function developers()
    {
        return $this->belongsToMany(\App\Entities\GameDeveloper::class, 'game_developer');
    }
}

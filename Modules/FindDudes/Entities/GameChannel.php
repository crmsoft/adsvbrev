<?php

namespace Modules\FindDudes\Entities;

use App\Entities\Game;
use App\User;
use Illuminate\Database\Eloquent\Model;

class GameChannel extends Model
{
    /**
     * Table name
     * 
     * @var string
     */
    protected $table = 'find_dudes_game_channels';

    /**
     * Relation with User model
     * 
     * @return Relation\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation with Game model
     * 
     * @return Relation\BelongsTo
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
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

    /**
     * Relation with Subscription model
     * 
     * @return Relation\HasMany
     */
    public function participants()
    {
        return $this->hasManyThrough(
            User::class, 
            Subscription::class, 
            'sub_channel_id', 
            'id', 
            'id',
            'user_id'
        );
    }
}

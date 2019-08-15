<?php

namespace Modules\FindDudes\Entities;

use App\User;
use Illuminate\Database\Eloquent\Model;

class GameChannel extends Model
{
    protected $fillable = [];

    protected $table = 'find_dudes_game_channels';

    /**
     * 
     * @return Relation\HasMany
     */
    public function participants()
    {
        return $this->hasManyThrough(User::class, 'find_dudes_game_channel_participants');
    }
}

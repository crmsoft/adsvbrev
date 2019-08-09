<?php

namespace Modules\FindDudes\Entities;

use Illuminate\Database\Eloquent\Model;

use App\User;
use App\Entities\Game;
use App\Media;

class Subscription extends Model
{
    /**
     * table to use
     * 
     * @var string
     */
    protected $table = 'find_dudes_subscriptions';

    /**
     * The fields that can be mass assigned
     * 
     * @var array
     */
    protected $fillable = [
        'user_id', 'game_id', 'token'
    ];

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
     * Relationship with a Game Model
     * 
     * @return Relation\BelongsTo
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}

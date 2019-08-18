<?php

namespace Modules\FindDudes\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\User;
use App\Entities\Game;
use App\Media;
use Modules\FindDudes\Entities\GameChannel;

class Message extends Model
{
    use SoftDeletes;

    /**
     * table to use
     * 
     * @var string
     */
    protected $table = 'find_dudes_messages';

    /**
     * Encode resource id
     * 
     * @return string
     */
    public function getHashAttribute()
    {
        return \Hashids::encode($this->id);
    }

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

    /**
     * message may have a media file|files
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function mediable(){
        return $this->morphMany(Media::class, 'mediable');
    }

    /**
     * message might belong to GameChannel
     * 
     * @return Relation\GameChannel
     */
    public function gameChannel()
    {
        return $this->belongsTo(GameChannel::class, 'sub_channel_id');
    }
}

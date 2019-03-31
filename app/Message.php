<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Message extends Model
{
    use SoftDeletes;

    protected $hidden = [
        'deleted_at',
        'updated_at',
        'user_id'
    ];

    /**
     * @var array
     */
    protected $appends = [
        'from_me'
    ];

    public function getReadedAttribute()
    {
        $user_id = Auth::id();
        return \DB::table('message_reads')
                ->join('messages', 'messages.id', '=', 'message_reads.message_id')
                ->where('messages.user_id', $user_id)
                ->where('message_reads.user_id', '<>', $user_id)
                ->where('message_reads.message_id', $this->id)->count() > 0;
    }

    public function getFromMeAttribute(){
        $user_id = Auth::id();
        return $this->user->id == $user_id;
    }

    public function getHashAttribute()
    {
        return \Hashids::encode($this->id);
    }

    /**
     * message belongs to user
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(){
        return $this->belongsTo('\App\User');
    }

    /**
     * message belongs to conversation
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function conversation(){
        return $this->belongsTo('\App\Conversation');
    }

    /**
     * message may have a media file|files
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function mediable(){
        return $this->morphMany(Media::class, 'mediable');
    }
}

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
        'updated_at'
    ];

    /**
     * @var array
     */
    protected $appends = [
        'from_me'
    ];

    public function getFromMeAttribute(){
        $user_id = Auth::user()->id;
        return $this->user->id == $user_id;
    }

    public function getCreatedAtAttribute( $created_at ){
        $date = Carbon::createFromFormat('Y-m-d H:i:s', $created_at);
        return $date->diffInWeeks(Carbon::now()) > 1 ? $date->format('j M Y, g:ia') : $date->diffForHumans();
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
    public function messageMedia(){
        return $this->hasMany(Media::class, 'relation_id')
            ->where('type', 'message');
    }
}

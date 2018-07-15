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

    public function user(){
        return $this->belongsTo('\App\User');
    }

    public function conversation(){
        return $this->belongsTo('\App\Conversation');
    }
}

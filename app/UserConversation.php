<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserConversation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'conversation_id'
    ];

    public function user(){
        return $this->belongsTo('\App\User');
    }

    public function conversation(){
        return $this->belongsTo('\App\Conversation');
    }
}

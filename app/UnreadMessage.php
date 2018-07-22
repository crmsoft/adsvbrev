<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UnreadMessage extends Model
{
    protected $fillable = [
        'user_id', 'message_id', 'unread', 'viewed', 'user_online'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function message(){
        return $this->belongsTo(Message::class);
    }
}

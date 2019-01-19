<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MessageRead extends Model
{
    protected $fillable = [
        'user_id', 'message_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function message(){
        return $this->belongsTo(Message::class);
    }
}

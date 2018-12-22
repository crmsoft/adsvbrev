<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conversation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id'
    ];

    protected $hidden = [
        'user_id',
        'created_at',
        'updated_at',
        'deleted_at',
        'id'
    ];

    public function getRouteKeyName()
    {
        return 'hash_id';
    }

    public function user(){
        return $this->belongsTo('\App\User');
    }

    public function members()
    {
        return $this->hasManyThrough(
            User::class,
            UserConversation::class,
            'conversation_id',
            'id',
            'id',
            'user_id'
        );
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}

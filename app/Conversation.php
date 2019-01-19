<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Illuminate\Support\Facades\DB;

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
    
    protected $appends = [
        'unread'
    ];

    public function getRouteKeyName()
    {
        return 'hash_id';
    }

    public function getUnreadAttribute()
    {
        $conversation = $this->id;
        $user_id = auth()->user()->id;

        $count = DB::select("SELECT 
                                count(m.id) as unread
                            FROM
                                user_conversations uc
                                    JOIN
                                messages AS m ON m.conversation_id = uc.conversation_id
                                    LEFT JOIN
                                message_reads mr ON mr.message_id = m.id AND mr.user_id = $user_id
                            WHERE
                                uc.user_id = $user_id 
                                AND m.conversation_id = $conversation
                                AND mr.id IS NULL;");


        $count = $count[0]->unread;

        return $count < 100 ? $count : '99+';
    }

    public function markReaded()
    {
        $conversation = $this->id;
        $user_id = auth()->user()->id;

        DB::select("insert into message_reads (message_id, user_id, created_at, updated_at)
                    SELECT 
                        m.id, uc.user_id, now(), now()
                    FROM
                        user_conversations uc
                            JOIN
                        messages AS m ON m.conversation_id = uc.conversation_id
                            LEFT JOIN
                        message_reads mr ON mr.message_id = m.id AND mr.user_id = $user_id
                    WHERE
                        uc.user_id = $user_id
                            AND m.conversation_id = $conversation
                            AND mr.id IS NULL");
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

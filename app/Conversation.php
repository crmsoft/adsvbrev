<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

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

    /**
     * Last message in conversation
     * 
     * @return string
     */
    public function getLastMessageAttribute()
    {
        $last = $this->messages()->orderBy('id', 'desc')->with('user')->first();

        if ($last)
        {
            return mb_strimwidth('<b>'.mb_strimwidth($last->user->first_name, 0, 15, '...') . ':</b> ' . $last->message, 0, 35, '...');
        } // end if

        return '...';
    }

    public function markRead()
    {
        $conversation = $this->id;
        $user_id = auth()->user()->id;

        // find messages that user view for the first time
        $read_messages = DB::select("SELECT DISTINCT m.id, m.user_id as involved,
                        m.id as id, uc.user_id as user_id
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

        $insert_to_reads = [];
        $now = now();
        // mark messages as viewed
        foreach($read_messages as $message)
        {
            $insert_to_reads[] = [
                'message_id' => $message->id,
                'user_id' => $message->user_id,
                'created_at' => $now,
                'updated_at' => $now
            ];
        } // end foreach

        if (!empty($insert_to_reads))
        {
            $involved = collect($read_messages)->pluck('involved');
            \DB::table('message_reads')->insert($insert_to_reads);
            
            // notify users about view event
            if (!empty($involved)) {
                Redis::publish(config('app.pub-sub-channel'), json_encode([
                    'action' => 'message-read',
                    'target' => $this->hash_id,
                    'involved' => $involved
                ]));
            } // end if
        } // end if
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

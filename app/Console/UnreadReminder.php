<?php

namespace App\Console;

use DB;
use Illuminate\Support\Facades\Mail;

use App\Mail\UnreadMessagesEmail;

class UnreadReminder 
{
    /**
     * The function to send reminder email about unread messages.
     *
     */
    public function __invoke()
    {
        $recievers = DB::select("SELECT 
                    u.email, first_name, last_name
                FROM
                    user_conversations c
                        JOIN
                    (SELECT 
                        m.conversation_id AS c_id, m.id, m.message
                    FROM
                        messages m
                    WHERE
                        UNIX_TIMESTAMP(created_at) > (UNIX_TIMESTAMP() - 600)
                    GROUP BY conversation_id) AS t ON t.c_id = c.conversation_id
                        JOIN
                    message_reads mr ON mr.message_id = t.id
                        AND mr.user_id <> c.user_id
                        join users u on u.id = c.user_id
                WHERE
                    u.user_communication_id = 0
                GROUP BY c.user_id");

            foreach ($recievers as $reciever)
            {
                Mail::to($reciever)
                ->send(new UnreadMessagesEmail($this->
            ));
        } // end foreach
    }
}
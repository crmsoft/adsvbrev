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
        $receivers = DB::select("SELECT 
                                    u.email, u.first_name, u.last_name
                                FROM
                                    messages m
                                        JOIN
                                    user_conversations c ON c.conversation_id = m.conversation_id
                                        JOIN
                                    users u ON u.id = c.user_id
                                        AND u.user_communication_id IS NULL
                                WHERE
                                    NOT EXISTS( SELECT 
                                            *
                                        FROM
                                            message_reads mr
                                        WHERE
                                            mr.user_id = c.user_id
                                                AND m.id = mr.message_id)
                                        AND UNIX_TIMESTAMP(m.created_at) > (UNIX_TIMESTAMP() - 600)");

        foreach ($receivers as $receiver)
        {
            Mail::to($receiver)
            ->send(new UnreadMessagesEmail($receiver));
        } // end foreach
    }
}
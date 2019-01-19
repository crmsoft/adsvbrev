<?php

namespace App\Http\Controllers\Chat;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Conversation;
use App\Message;

class MessageController extends Controller{

    public function pull( Request $request, Conversation $conversation )
    {
        $latest = Conversation::where('id', $conversation->id)
                    ->with(['messages' => function($query){
                        $query->orderBy('id', 'desc');
                        $query->limit(15);
                    }])->first();

        
        $conversation->markReaded();

        return $latest->messages;
    }


} // end ConversationController
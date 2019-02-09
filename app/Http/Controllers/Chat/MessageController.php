<?php

namespace App\Http\Controllers\Chat;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Conversation;
use App\Message;

use \App\Http\Resources\Chat\Dialog\MessageCollection;

class MessageController extends Controller{

    static $limit_per_pull = 15;

    /**
     * Pull latest messages from Conversation
     * Mark all pulled messages as readed
     * 
     * @param Request $request
     * @param Conversation $conversation
     * @return \Illuminate\Http\Response
     */
    public function pull( Request $request, Conversation $conversation )
    {
        $latest = Conversation::where('id', $conversation->id)
                    ->with(['messages' => function($query){
                        $query->orderBy('id', 'desc');
                        $query->limit(self::$limit_per_pull);
                    }])->first();

        $conversation->markReaded();

        return new MessageCollection($latest->messages);
    }

    /**
     * Pull messages from conversation that was previous given one
     * 
     * @param Request $request
     * @param Conversation $conversation
     * @return \Illuminate\Http\Response
     */
    public function pullPrev( Request $request, Conversation $conversation )
    {
        $request->validate([
            'last' => 'required|string'
        ]);

        $first_message_in_chat = \Hashids::decode($request->last);

        $latest = Conversation::where('id', $conversation->id)
                    ->with(['messages' => function($query) use ($first_message_in_chat){
                        $query->orderBy('id', 'desc');
                        $query->limit(self::$limit_per_pull);
                        $query->where('id', '<', $first_message_in_chat);
                    }])->first();

        
        return (new MessageCollection($latest->messages))->additional([
            'more' => $latest->messages->count() === self::$limit_per_pull
        ]);
    }

} // end ConversationController
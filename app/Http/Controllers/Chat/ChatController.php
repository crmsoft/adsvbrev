<?php

namespace App\Http\Controllers\Chat;

use App\Conversation;
use App\Http\Controllers\Controller;
use App\Message;
use App\User;
use App\UserConversation;
use App\MessageRead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller{

    /**
     * retrieve list of chats
     */
    public function chats(Request $request)
    {

        $user = $request->user();

        $chats = User::where('id', $user->id)
                ->with(['chat' => function($query){
                    $query->orderBy('updated_at', 'desc');
                    $query->with('members');
                }])
                ->with('friend')
                ->first();

        return $chats;

    } // end list of chats

    /**
     * @param Request $request
     * @param String $username
     * @return null
     */
    public function start(Request $request, String $username)
    {
         $user = $request->user();
         $chat_to = User::where('username', $username)->first();

         $conversations = DB::select("SELECT *
                                FROM user_conversations uc
                                WHERE uc.user_id = {$user->id} AND uc.conversation_id IN (
                                  SELECT conversation_id
                                  FROM user_conversations
                                  WHERE user_id = {$chat_to->id}) AND uc.conversation_id IN (SELECT conversation_id
                                                FROM user_conversations
                                                GROUP BY conversation_id
                                                HAVING count(conversation_id) = 2)");
         // if there is no old conversation between
         if( empty($conversations) )
         {
             $conversation = Conversation::create(['user_id' => $user->id]);
             $conversation->hash_id = base64_encode(bcrypt($conversation->id));
             $conversation->save();
             // join users to conversation
             UserConversation::create([
                'user_id' => $user->id,
                'conversation_id' => $conversation->id
             ]);
             UserConversation::create([
                 'user_id' => $chat_to->id,
                 'conversation_id' => $conversation->id
             ]);

             return Conversation::with('messages')->with('members')->find($conversation->id);

         } // end if

         return Conversation::with('messages')->with('members')->find($conversations[0]->conversation_id);
    } // end start

    public function store(Conversation $conversation, Request $request)
    {
        $request->validate([
            'message' => 'required'
        ]);

        $user = auth()->user();

        if( $conversation->members->where('id', $user->id)->count() > 0 )
        {
            // update updated_at attr
            $conversation->touch();

            $message = new Message;
            $message->message = $request->message;
            $message->user()->associate($user);
            $message->conversation()->associate($conversation);
            $message->save();

            $messageRead = new MessageRead;
            $messageRead->message()->associate($message);
            $messageRead->user()->associate($user);
            $messageRead->save();

            return $message;
        } // end if

        return response('Conversation is not found', 404);
    }


} // end ConversationController
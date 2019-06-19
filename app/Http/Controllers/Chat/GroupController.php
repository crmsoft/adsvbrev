<?php

namespace App\Http\Controllers\Chat;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use Intervention\Image\Facades\Image;

use App\User;
use App\Media;
use App\Message;
use App\MessageRead;
use App\Conversation;
use App\UserConversation;

use App\Http\Controllers\Controller;
use App\Http\Resources\Chat\ResourceChat;
use App\Http\Resources\Chat\Dialog\ResourceMessage;
use App\Http\Resources\Chat\ChatUser;

class GroupController extends Controller{

    /**
     * User create group chat 
     * 
     * @param Request
     * @return ResourceChat
     */
    public function store(Request $request)
    {
        $request->validate([
            'users' => ['required', 'array']
        ]);

        $user = auth()->user();

        $conversation = Conversation::create(['user_id' => $user->id]);
        $conversation->is_group = true;
        $conversation->hash_id = base64_encode(bcrypt($conversation->id));
        $conversation->save();
        
        // join users to conversation
        UserConversation::create([
            'user_id' => $user->id,
            'conversation_id' => $conversation->id
        ]);

        foreach($request->get('users') as $username){
            $friend = $user->friend()->where('username', $username)->first();

            if (!$friend)
            {
                continue;
            } // end if

            // join users to conversation
            UserConversation::create([
                'user_id' => $friend->id,
                'conversation_id' => $conversation->id
            ]);
        } // end foreach


        return new ResourceChat($conversation);
    }

    /**
     * Group admin update group members
     * 
     * @param Request $request
     * @return ResourceChat
     */
    public function update(Request $request, Conversation $conversation)
    {
        $request->validate([
            'users' => ['required', 'array']
        ]);

        $user = auth()->user();
        
        // remove old members
        UserConversation::where('conversation_id', $conversation->id)
            ->where('user_id', '<>', $user->id)
            ->delete();

        foreach($request->get('users') as $username){
            $friend = $user->friend()->where('username', $username)->first();

            if (!$friend)
            {
                continue;
            } // end if

            // join users to conversation
            UserConversation::create([
                'user_id' => $friend->id,
                'conversation_id' => $conversation->id
            ]);
        } // end foreach

        return new ResourceChat($conversation);
    }

    /**
     * User leave the chat
     * 
     * @param Conversation
     * @return Response
     */
    public function leave(Conversation $conversation)
    {
        $user = auth()->user();

        if($conversation->members()->where('users.id', $user->id)->count())
        {
            UserConversation::where('user_id', $user->id)->where('conversation_id', $conversation->id)->delete();

            return response()->json([
                'done' => true
            ]);
        } // end if

        return response('Not found', 404);
    }

    public function destroy(Conversation $conversation)
    {
        $user = auth()->user();

        if($conversation->is_group && $conversation->user_id == $user->id)
        {
            $conversation->delete();

            return response()->json([
                'done' => true
            ]);
        } // end if

        return response('Not found', 404);
    }
}
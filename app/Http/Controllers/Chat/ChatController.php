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

class ChatController extends Controller{

    /**
     * retrieve list of chats
     */
    public function chats(Request $request)
    {
        //return [ 'chat' => [  ], 'friend' => [] ];
        $user = $request->user();

        return new ChatUser($user);
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

             return new ResourceChat($conversation);

         } // end if

         $conversation_id = $conversations[0]->conversation_id;

        UserConversation::where([
            'user_id' => $chat_to->id,
            'conversation_id' => $conversation_id
        ])->update(['status' => '']);

        UserConversation::where([
            'user_id' => $user->id,
            'conversation_id' => $conversation_id
        ])->update(['status' => '']);

         return new ResourceChat(Conversation::find($conversation_id));
    } // end start

    public function store(Conversation $conversation, Request $request)
    {
        $request->validate([
            'message' => 'required',
            'file' => ['image', 'mimes:jpeg,jpg,gif,png', 'max:8000']
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

            if ($request->hasFile('file')) {
                $media = $request->file('file');
    
                $image = Image::make($media->getRealPath());
    
                $image->stream();
                $name = hash('sha256', str_random() . $image) .'.'. $media->getClientOriginalExtension();
                $users_dir = "user-media/{$user->dir}/";
    
                Storage::disk('public')
                    ->put("{$users_dir}original_{$name}", $image);
                // profile main image;
                $image->resize(200, 120, function($constraint) {
                    $constraint->aspectRatio();
                });
                $image->stream();
    
                Storage::disk('public')
                    ->put("{$users_dir}chat_{$name}", $image);
    
                $media = new Media;
                $media->path = $name;
                $media->options = [
                    'chat' => [
                        'width' => $image->width(),
                        'height' => $image->height()  
                    ]
                ];
                $media->mediable()->associate($message);
                $media->user()->associate($user);
                $media->save();
    
            } // end if

            $messageRead = new MessageRead;
            $messageRead->message()->associate($message);
            $messageRead->user()->associate($user);
            $messageRead->save();

            $conversation->members->map(function($user) use ($conversation) {
                UserConversation::where([
                    'user_id' => $user->id,
                    'conversation_id' => $conversation->id
                ])->update(['status' => '']);
            });

            return new ResourceMessage($message);
        } // end if

        return response('Conversation is not found', 404);
    }

    public function destroy(Conversation $conversation)
    {
        $user = auth()->user();

        if($conversation->members()->where('users.id', $user->id)->count())
        {
            UserConversation::where([
                'user_id' => $user->id,
                'conversation_id' => $conversation->id
             ])->update(['status' => 'hidden']);

             return response('ok');
        } // end if

        return response('Not found', 404);   
    }

} // end ConversationController
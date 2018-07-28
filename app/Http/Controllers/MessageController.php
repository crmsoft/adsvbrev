<?php

namespace App\Http\Controllers;

use App\Conversation;
use App\Http\Resources\MessageCollection;
use App\Http\Resources\NewMessageNotification;
use App\Media;
use App\Message;
use App\UnreadMessage;
use App\User;
use App\UserConversation;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    /**
     * @param Request $request
     * @return MessageCollection
     */
    public function index(Request $request)
    {
        $conversation_id = $request->get('conversation_id',0);

        $user_id = $request->user()->id;

        $user_conversation = UserConversation::where('conversation_id', $conversation_id)
                            ->where('user_id', $user_id)
                            ->first();

        return new MessageCollection( Message::where('conversation_id', $user_conversation->conversation_id)
            ->with(['user' => function($query){
                return $query->select(['id', 'name', 'last_name']);
            }, 'messageMedia' => function($query){
                return $query->select(['relation_id','path']);
            }])->get() );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return MessageCollection|null
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $conversation_id = $request->get('conversation_id', 0);
        $conversation = Conversation::find($conversation_id);

        if($conversation){

            $user_conversations = UserConversation::where('conversation_id', $conversation_id)
                                ->where('user_id', '<>', $user->id)
                                ->join('users','users.id','=','user_conversations.user_id')
                                ->get([
                                    'users.user_communication_id',
                                    'users.id'
                                ]);

            if($user_conversations){
                $message = new Message;
                $message->conversation()->associate($conversation);
                $message->message = $request->get('message', '');
                $message->user()->associate($user);
                if ($message->save()) {

                    // attach media to message
                    $files = $request->get('attachments', []);
                    foreach ($files as $file) {

                        $file_path = explode('/',$file);
                        $file_name = array_pop($file_path);

                        $media = $user->media()
                                        ->where('path','like',"%$file_name")
                                        ->first();

                        // if the file exists
                        if($media) {
                            $media->message()->associate($message);
                            $media->save();
                        }
                    }

                    $notification_recipients = [];
                    foreach ($user_conversations as $user_conversation) {
                        if($user_conversation->user_communication_id)
                            $notification_recipients[] = $user_conversation->user_communication_id;

                        UnreadMessage::create([
                            'user_id' => $user_conversation->id,
                            'message_id' => $message->id,
                            'user_online' => !empty($user_conversation->user_communication_id)
                        ]);
                    }

                    // say node js to inform
                    // user about the new messages
                    if(!empty($notification_recipients)) {
                        Redis::publish(
                            config('database.redis.message_channel'),
                            json_encode($notification_recipients)
                        );
                    }

                    return new MessageCollection(
                        Message::where('id',$message->id)
                            ->with(['user' => function($query){
                                return $query->select(['id', 'name', 'last_name']);
                            }, 'messageMedia' => function($query){
                                return $query->select(['relation_id','path']);
                            }])->first()
                    );
                }
            }
        }

        return null;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $data = UnreadMessage::with('message')
            ->where('user_id', $request->user()->id)
            ->where('notified', false)
            ->where('user_online', true)
            ->get();

        $notify_messages = [];
        foreach ($data as $item) {
            $item->notified = true;
            if ($item->save()) {
                $notify_messages[]  = $item->message;
            }
        }

        return new NewMessageNotification($notify_messages);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

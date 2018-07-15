<?php

namespace App\Http\Controllers;

use App\Conversation;
use App\Http\Resources\MessageCollection;
use App\Message;
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

        return new MessageCollection( Message::with('user')->get() );
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
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $conversation_id = $request->get('conversation_id', 0);
        $conversation = Conversation::find($conversation_id);

        if($conversation){

            $user_conversation = UserConversation::where('conversation_id', $conversation_id)
                                ->where('user_id', '<>', $user->id)
                                ->join('users','users.id','=','user_conversations.user_id')
                                ->get([
                                    'users.user_communication_id'
                                ]);

            if($user_conversation){
                $message = new Message;
                $message->conversation()->associate($conversation);
                $message->message = $request->get('message', '');
                $message->user()->associate($user);
                if ($message->save()) {


                    Redis::publish(env('user_new_message_channel'), $user_conversation->map(function($user){
                        return $user->user_communication_id;
                    }));

                    return new MessageCollection(new Collection([
                        'message' => $message->message,
                        'full_name' => "{$user->name} {$user->last_name}",
                        'from_me' => 1,
                        'created_at' => $message->created_at->format('Y-m-d H:i:s')
                    ]));
                }
            }
        }

        return [
            $conversation
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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

<?php

namespace App\Http\Controllers;

use App\Conversation;
use App\Events\Event;
use App\Http\Resources\ConversationCollection;
use App\Http\Resources\MessageCollection;
use App\Message;
use App\User;
use App\UserConversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    /**
     * Show template,
     * other staff will be handled by js
     */
    public function go(){
        return view('conversation');
    }

    /**
     * @return ConversationCollection
     */
    public function index()
    {
        $user= Auth::user();

        return new ConversationCollection(
            UserConversation::join(DB::raw("(
                                              SELECT    MAX(id) max_id, conversation_id 
                                              FROM      messages 
                                              GROUP BY  conversation_id
                                          ) c_max"),'c_max.conversation_id','=','user_conversations.conversation_id')
                ->join('messages', 'messages.id','=','c_max.max_id')
                ->join('users','users.id','=','messages.user_id')
                ->groupBy([
                    'user_conversations.conversation_id',
                    'messages.message',
                    'users.name',
                    'users.last_name',
                    'messages.created_at'
                ])
                ->where('user_conversations.user_id','=',$user->id)
                ->select([
                    DB::raw("concat(users.name,' ',users.last_name) as last_message_user"),
                    DB::raw('substring(messages.message,1,25) as message'),
                    'user_conversations.conversation_id',
                    'messages.created_at'
                ])
                ->paginate()
        );
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
        $this->validate($request,[
            'unique' => 'required|exists:users,unique',
            'message' => 'required'
        ]);

        $unique = $request->get('unique', 0);
        $receiver = User::where('unique', $unique)
            ->first();

        $user = Auth::user();

        if($receiver){
            // find prev conversation
            $user_conversation = DB::select("SELECT *
                                                    FROM user_conversations uc
                                                    WHERE uc.user_id = ? 
                                                    AND uc.conversation_id IN (
                                                      SELECT conversation_id
                                                      FROM user_conversations
                                                      WHERE user_id = ?) 
                                                      AND uc.conversation_id IN (SELECT conversation_id
                                                                                    FROM user_conversations
                                                                                    GROUP BY conversation_id
                                                                                    HAVING count(conversation_id) = 2);",[ $user->id, $receiver->id ]);

            if(empty($user_conversation)){
                // create conversation and wire with users
                $conversation = new Conversation;
                $conversation->user()->associate($user);
                $conversation->save();

                $user_conversation = new UserConversation;
                $user_conversation->user()->associate($user);
                $user_conversation->conversation()->associate($conversation);
                $user_conversation->save();

                $user_conversation = new UserConversation;
                $user_conversation->user()->associate($receiver);
                $user_conversation->conversation()->associate($conversation);
                $user_conversation->save();
            } else {
                $conversation = Conversation::where('id',$user_conversation[0]->conversation_id)
                                ->first();
            }

            $message = new Message;
            $message->user()->associate($user);
            $message->message = $request->get('message');
            $message->conversation()->associate($conversation);
            $message->save();

        } return $conversation;
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

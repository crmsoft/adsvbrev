<?php

namespace App\Http\Controllers;

use App\User;
use App\UserFriends;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FriendsController extends Controller
{
    public function add(String $username){

        $addMe = User::where('username', $username)->where('validated',1)->first();

        if( $addMe ){

            $user = Auth::user();

            $subscribed = $user->subscribers()->where('friend_id', $addMe->id)->count();

            if( !$subscribed && $user->id != $addMe->id ){
                try{
                    UserFriends::create([
                        'user_id' => $user->id,
                        'friend_id' => $addMe->id,
                        'status' => User::STATUS_SUBSCRIBE
                    ]);

                    return [
                        'status' => 'subscribed'
                    ];
                } catch (\Exception $e){
                    // should be duplicate error
                    Log::debug($e);
                }
            }
        }

        return response('Not Found', 404);
    }

    public function accept(String $username)
    {

        $addMe = User::where('username', $username)->where('validated', 1)->first();

        if ($addMe) {

            $user = Auth::user();

            $subscriber = $user->followers()->where('user_id', $addMe->id)->first();

            if( $subscriber ){

                UserFriends::where('user_id', $addMe->id)
                            ->where('friend_id', $user->id)
                            ->where('status', User::STATUS_SUBSCRIBE)
                            ->update(['status' => User::STATUS_FRIEND]);

                UserFriends::create([
                    'status' => User::STATUS_FRIEND,
                    'friend_id' => $addMe->id,
                    'user_id' => $user->id
                ]);

                return [
                    'status' => 'friends'
                ];
            }

        }

        return response('Not Found', 404);
    }

    public function unfriend(String $username)
    {

        $user = Auth::user();

        $friend = $user->friend()->where('username', $username)->first();

        if( $friend && $user->id != $friend->id ){
            try{

                UserFriends::where('user_id', $friend->id)
                    ->where('friend_id', $user->id)
                    ->update(['status' => User::STATUS_SUBSCRIBE]);

                UserFriends::where('friend_id', $friend->id)
                            ->where('user_id', $user->id)->delete();

                return [
                    'status' => 'following'
                ];
            } catch (\Exception $e){
                // should be duplicate error
                Log::debug($e);
            }
        }

        return response('Not Found', 404);
    }

    public function unsubscribe(String $username)
    {
        $recipient = User::where('username', $username)->where('validated',1)->first();

        $result = 0;

        if($recipient)
        {   
            $user = auth()->user();

            $result = UserFriends::where('user_id', $user->id)
            ->where('friend_id', $recipient->id)
            ->where('status', User::STATUS_SUBSCRIBE)
            ->delete();
        } // end if

        return $result == 1 ? [
            'status' => 'none'
        ] : response('Not Found', 404);
    }

    public function decline(String $username)
    {
        $recipient = User::where('username', $username)->where('validated',1)->first();

        $result = 0;

        if($recipient)
        {   
            $user = auth()->user();

            $result = UserFriends::where('friend_id', $user->id)
            ->where('user_id', $recipient->id)
            ->where('status', User::STATUS_SUBSCRIBE)
            ->update(['status' => User::STATUS_DECLINED]);
        } // end if

        return $result == 1 ? [
            'status' => 'none'
        ] : response('Not Found', 403);
    }

}

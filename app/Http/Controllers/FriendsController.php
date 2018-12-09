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

                $subscriber->pivot->update([
                    'status' => User::STATUS_FRIEND
                ]);

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
        $addMe = User::where('username', $username)->where('validated',1)->first();

        if( $addMe ){

            $user = Auth::user();

            $friend = $user->friend()->where('friend_id', $addMe->id)->first();

            if( $friend && $user->id != $addMe->id ){
                try{

                    UserFriends::where('user_id', $friend->pivot->friend_id)
                        ->where('friend_id', $friend->pivot->user_id)
                        ->update(['status' => User::STATUS_SUBSCRIBE]);

                    $friend->pivot->update([ 'deleted_at' => now() ]);

                    return [
                        'status' => 'following'
                    ];
                } catch (\Exception $e){
                    // should be duplicate error
                    Log::debug($e);
                }
            }
        }

        return response('Not Found', 404);
    }

    public function unsubscribe(String $username)
    {
        $addMe = User::where('username', $username)->where('validated',1)->first();

        if( $addMe ){

            $user = Auth::user();

            $following = $user->subscribers()->where('friend_id',$addMe->id)->first();


            if( $following && $user->id != $addMe->id ){
                try{
                    $following->pivot->update(['deleted_at' => now()]);

                    return [
                        'status' => 'none'
                    ];
                } catch (\Exception $e){
                    // should be duplicate error
                    Log::debug($e);
                }
            }
        }

        return response('Not Found', 404);
    }

}

<?php

namespace App\Http\Controllers\Profile;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Post;
use App\Http\Resources\Post\PostCollection;

class FeedController extends Controller
{
    public function index( Request $request )
    {
        $user = auth()->user();

        return new PostCollection(
            Post::whereRaw("(postable_type = ?
                                AND (postable_id IN (SELECT 
                                    user_id
                                FROM
                                    user_friends
                                WHERE
                                    friend_id = ? AND status = 'friend'
                                        AND deleted_at IS NULL)
                                OR postable_id = ?))", [ 'App\User', $user->id, $user->id ])
                                ->with([
                                    'media', 
                                    'postable', 
                                    'loveReactant.reactions.reacter.reacterable',
                                    'loveReactant.reactions.type',
                                    'loveReactant.reactionCounters',
                                    'loveReactant.reactionTotal',
                                    'parent' => function($query) {
                                        $query->with(['media', 'postable']);
                                    }
                                ])
                                ->orderBy('created_at', 'desc')
                                ->take(2)
                                ->get()
        );
    } // end index

    public function more( Request $request)
    {
        $request->validate([
            'last' => 'required'
        ]);


        $user = auth()->user();
        $last_id = \Hashids::decode($request->last)[0];


        return new PostCollection(
            Post::whereRaw("(postable_type = ?
                                AND (postable_id IN (SELECT 
                                    user_id
                                FROM
                                    user_friends
                                WHERE
                                    friend_id = ? AND status = 'friend'
                                        AND deleted_at IS NULL)
                                OR postable_id = ?))", [ 'App\User', $user->id, $user->id ])
                                ->with([
                                    'media', 
                                    'postable', 
                                    'loveReactant.reactions.reacter.reacterable',
                                    'loveReactant.reactions.type',
                                    'loveReactant.reactionCounters',
                                    'loveReactant.reactionTotal',
                                    'parent' => function($query) {
                                        $query->with(['media', 'postable']);
                                    }
                                ])
                                ->where('id', '<', $last_id)
                                ->orderBy('created_at', 'desc')
                                ->take(2)
                                ->get()
        );
    } // end more

} // end class FeedController

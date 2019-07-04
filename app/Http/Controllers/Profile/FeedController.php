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
            Post::join('postables', 'postables.post_id', '=', 'posts.id')
            ->whereRaw("(postables.postable_type = ?
                            AND (postables.postable_id IN (SELECT 
                                user_id
                            FROM
                                user_friends
                            WHERE
                                friend_id = ? AND status = 'friend'
                                    AND deleted_at IS NULL)
                            OR postables.postable_id = ?))
                            OR (postables.postable_type = ?
                            AND postables.postable_id IN (SELECT DISTINCT
                                e.id
                            FROM
                                user_friends
                                    JOIN
                                events e ON e.creator_id = user_friends.user_id
                            WHERE
                                (friend_id = ? AND status = 'friend'
                                    AND user_friends.deleted_at IS NULL
                                    AND e.deleted_at IS NULL)
                                    OR (e.creator_id = ? 
                                    AND e.deleted_at IS NULL)))", [ 
                                        'App\User', 
                                        $user->id, 
                                        $user->id, 
                                        'App\Entities\Event' ,
                                        $user->id, 
                                        $user->id 
                                    ])
                                    ->orWhereRaw("
                                    (
                                        postables.postable_type = ? 
                                        AND postables.postable_id in (
                                            select group_id from user_groups 
                                            where user_id = ?
                                        )
                                    )
                                    ", [
                                        'App\Entities\Group',
                                        $user->id
                                    ])
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
                                ->orderBy('posts.created_at', 'desc')
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
            Post::join('postables', function($query) use ($last_id) {
                $query->on('postables.post_id', '=', 'posts.id');
                $query->on('postables.post_id', '<', \DB::raw($last_id));
            })
                    ->whereRaw("(postables.postable_type = ?
                            AND (postables.postable_id IN (SELECT 
                                user_id
                            FROM
                                user_friends
                            WHERE
                                friend_id = ? AND status = 'friend'
                                    AND deleted_at IS NULL)
                            OR postables.postable_id = ?))
                            OR (postables.postable_type = ?
                            AND postables.postable_id IN (SELECT DISTINCT
                                e.id
                            FROM
                                user_friends
                                    JOIN
                                events e ON e.creator_id = user_friends.user_id
                            WHERE
                                (friend_id = ? AND status = 'friend'
                                    AND user_friends.deleted_at IS NULL
                                    AND e.deleted_at IS NULL)
                                    OR (e.creator_id = ? 
                                    AND e.deleted_at IS NULL)))", [ 
                                        'App\User', 
                                        $user->id, 
                                        $user->id, 
                                        'App\Entities\Event' ,
                                        $user->id, 
                                        $user->id 
                                    ])
                                    ->orWhereRaw("
                                    (
                                        postables.postable_type = ? 
                                        AND postables.postable_id in (
                                            select group_id from user_groups 
                                            where user_id = ?
                                        )
                                    )
                                    ", [
                                        'App\Entities\Group',
                                        $user->id
                                    ])
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
                                ->orderBy('posts.created_at', 'desc')
                                ->take(2)
                                ->get()
        );
    } // end more

} // end class FeedController

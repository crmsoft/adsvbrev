<?php

namespace App\Http\Controllers;

use App\Media;
use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;

use App\Http\Resources\Post\ResourcePost;
use App\Http\Resources\Post\PostCollection;

class PostController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    public function store(Request $request){

        $request->validate([
            'post' => 'required',
            'type' => 'in:event,feed,game,group,user-feed'
        ]);

        $user = auth()->user();

        $post = new Post;

        $post->content = $request->get('post', 'Hello World');

        if ($request->has('type'))
        {
            if ($request->type == 'event')
            {
                $event = \App\Entities\Event::find(\Hashids::decode($request->get('id'))[0]);

                $is_owner = User::where('id', $user->id)->whereHas('event', 
                    function ($query) use ($event) {
                        $query->where('id', $event->id);
                    }
                )->count();

                $post->postable()->associate( $is_owner == 1 ? $event : $user);

                // save resource
                $post->save();
                // attach post to event
                $event->posts()->attach($post);

            } else if ($request->type == 'game')
            {
                $game = \App\Entities\Game::where('slug', $request->id)->first();

                $is_owner = $game->managers()->where('user_id', $user->id)->count();

                $post->postable()->associate( $is_owner == 1 ? $game : $user);

                // save resource
                $post->save();
                // attach post to event
                $game->posts()->attach($post);

            }  else if ($request->type == 'group')
            {
                $group = \App\Entities\Group::where( 'slug', $request->id )->first();

                $is_owner = $group->managers()->where('user_id', $user->id)->count();

                $post->postable()->associate( $is_owner == 1 ? $group : $user);

                // save resource
                $post->save();
                // attach post to event
                $group->posts()->attach($post);

            } else if ($request->type == 'user-feed')
            {
                $post->postable()->associate($user);
                $user_wall = User::where('username', $request->id)->first();

                // save resource
                $post->save();
                $user_wall->feed()->attach($post);
            } else if ($request->type == 'feed')
            {
                $post->postable()->associate($user);

                // save resource
                $post->save();
                $user->feed()->attach($post);
            } // end if
        } // end if


        foreach ($request->file('media', []) as $media) {
            $image = Image::make($media->getRealPath());

            $image->stream();
            $name = hash('sha256', str_random() . $image) .'.'. $media->getClientOriginalExtension();
            $users_dir = "user-media/{$user->dir}/";

            Storage::disk('public')
                ->put("{$users_dir}original_{$name}", $image);
            // profile main image;
            $image->fit(635);
            $image->stream();

            Storage::disk('public')
                ->put("{$users_dir}520_{$name}", $image);

            $media = new Media;
            $media->path = $name;
            $media->user()->associate($user);
            $media->mediable()->associate($post);
            $media->save();

        }


        return new ResourcePost($post);
    }

    public function toggleLike(Post $post)
    {
        $reactionType = \ReactionType::fromName('like');
        $user = auth()->user();
        
        if ( !$user->isRegisteredAsLoveReacter() )
        {
            $user->registerAsLoveReacter();
        } // end if
        
        if (!$post->isRegisteredAsLoveReactant())
        {
            $post->registerAsLoveReactant();
        } // end if
        
        $reacter = $user->getLoveReacter();

        return $reacter->isReactedToWithType( $post->getLoveReactant(), $reactionType ) ?
                    $reacter->unreactTo($post->getLoveReactant(), $reactionType) :
                    $reacter->reactTo($post->getLoveReactant(), $reactionType);
    }

    public function toggleShare( Post $post, Request $request )
    {

        $saved = false;
        $reactionType = \ReactionType::fromName('share');
        $user = auth()->user();
        
        if ( !$user->isRegisteredAsLoveReacter() )
        {
            $user->registerAsLoveReacter();
        } // end if
        
        if (!$post->isRegisteredAsLoveReactant())
        {
            $post->registerAsLoveReactant();
        } // end if
        
        $reacter = $user->getLoveReacter();
        if (!$reacter->isReactedToWithType( $post->getLoveReactant(), $reactionType ))
        {
            $user_post = new Post;
            
            $user_post->postable()->associate( $user );
            $user_post->content = $request->content;
            $user_post->parent_id = $post->id;
            $saved = $user_post->save();
            $user->feed()->toggle($user_post);

            $reacter->reactTo($post->getLoveReactant(), $reactionType);
        } // end if

        return $saved ? 1:0;
    }

    public function deletePost(Request $request, Post $post)
    {
        $user = auth()->user();

        $result = $user->feed()->where('id', $post->id)->first();

        if (!isset($result->pivot) && 
            $request->has('type') && 
            $request->has('target') &&
            $request->get('type') == 'event')
        {
            $result = \App\Entities\Event::where('id', \Hashids::decode($request->get('target')))
                        ->with(['posts' => function($query) use ($post) {
                            $query->where('id', $post->id);
                        }])
                        ->whereHas('user', function($query) use ($user) {
                            $query->where('id', $user->id);
                        })->first();

            $result = $result->posts ? $result->posts->first() : $result;
        } // end if

        return response()->json([
            'action' => isset($result->pivot) ? $result->pivot->delete() : 0
        ]);
    }

    public function loadMore(Request $request, string $username = null)
    {
        $request->validate([
            'last' => 'string|min:5'
        ]);

        if ($request->type == 'event')
        {
            $event = \App\Entities\Event::where('id', \Hashids::decode($username))->first();

            $last_post_id = \Hashids::decode( $request->last );

            return new PostCollection(
                $event->posts()
                    ->where('id', '<', $last_post_id)
                    ->with(
                        [
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
                        ->orderBy('created_at', 'desc')->take(2)->get()
            );
        } else if ($request->type == 'game')
        {
            $game = \App\Entities\Game::where('slug', $username)->first();

            $last_post_id = \Hashids::decode( $request->last );

            return new PostCollection(
                $game->posts()
                    ->where('id', '<', $last_post_id)
                    ->with(
                        [
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
                        ->orderBy('created_at', 'desc')->take(2)->get()
            );
        } else if ($request->type == 'group')
        {
            $group = \App\Entities\Group::where('slug', $username)->first();

            $last_post_id = \Hashids::decode( $request->last );

            return new PostCollection(
                $group->posts()
                    ->where('id', '<', $last_post_id)
                    ->with(
                        [
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
                        ->orderBy('created_at', 'desc')->take(2)->get()
            );
        } // end if

        $user = $username ? \App\User::where('username', $username)->first() : auth()->user();

        $last_post_id = \Hashids::decode( $request->last );

        return new PostCollection(
            $user->feed()
                ->where('id', '<', $last_post_id)
                ->with(['media', 'user'])
                    ->orderBy('created_at', 'desc')->take(2)->get()
        );
    }
}

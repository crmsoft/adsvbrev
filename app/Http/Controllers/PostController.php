<?php

namespace App\Http\Controllers;

use App\Media;
use App\Post;
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
            'type' => 'in:event,feed'
        ]);

        $user = auth()->user();

        $post = new Post;

        $post->content = $request->get('post', 'Hello World');

        if ($request->has('type'))
        {
            if ($request->type == 'event')
            {
                $event = \App\Entities\Event::find(\Hashids::decode($request->get('id'))[0]);
                $post->postable()->associate($event);
            } else if ($request->type == 'feed')
            {
                $post->postable()->associate($user);
            } // end if
        } // end if

        // save resource
        $post->save();

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
            $media->type = 'post';
            $media->user()->associate($user);
            $media->relation_id = $post->id;
            $media->save();

        }


        return new ResourcePost($post);
    }

    public function toggleLike(Post $post)
    {
        return $post->toggleLikeBy();
    }

    public function deletePost(Post $post)
    {
        $user = auth()->user();

        $result = $user->feed()->where('id', $post->id)->delete();

        return response()->json([
            'action' => $result
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
                    ->with(['media', 'user'])
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

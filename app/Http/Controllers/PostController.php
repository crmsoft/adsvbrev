<?php

namespace App\Http\Controllers;

use App\Media;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;

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
            'post' => 'required'
        ]);

        $user = auth()->user();

        $post = new Post;

        $post->type = 'feed';

        $post->content = $request->get('post', 'Hello World');

        $post->user()->associate($user);

        $post->save();

        $post->hash_id = base64_encode(bcrypt($post->id));

        $post->save();


        foreach ($request->file('media', []) as $media) {
            $image = Image::make($media->getRealPath());

            $image->stream();
            $name = hash('sha256', str_random() . $image) .'.'. $media->getClientOriginalExtension();
            $users_dir = "user-media/{$user->dir}/";

            Storage::disk('public')
                ->put("{$users_dir}original_{$name}", $image);
            // profile main image;
            $image->fit(520);
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


        return 'ok';
    }

    public function attachMedia(Request $request){

        if( $request->has('file') ){

        }

    }
}

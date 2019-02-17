<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Intervention\Image\Facades\Image;

use App\Post;
use App\Media;
use App\Entities\Comment;
use App\Http\Resources\Comment\ResourceComment;

class CommentController extends Controller
{

    public function store(Request $request, Post $post, Comment $comment)
    {

        $request->validate([
            'comment' => ['required', 'min:1'],
            'file'    => 'image|mimes:jpeg,jpg,gif,png|max:8000',
        ]);

        $user = auth()->user();

        $parentComment = $comment->id ? $comment : null;

        if ($comment && $comment->parent_id)
        {
            $parentComment = Comment::find( $comment->parent_id );
        } // end if

        $comment = $post->comment([
            'body' => $request->comment
        ], $user, $parentComment);

        if ($request->hasFile('file')) {
            $media = $request->file('file');

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
            $media->type = 'comment';
            $media->user()->associate($user);
            $media->relation_id = $comment->id;
            $media->save();

        }

        return new ResourceComment($comment);
    } // end store

    public function toggleLike(Comment $comment)
    {
        return $comment->toggleLikeBy();
    }

    public function delete(Comment $comment)
    {
        $user = auth()->user();

        $result = 0;

        if ($user->id == $comment->creator_id)
        {
            $result = $comment->delete();
        }

        return ['action' => $result];
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Intervention\Image\Facades\Image;

use App\Post;
use App\Media;
use App\Entities\Comment;
use App\Http\Resources\Comment\ResourceComment;
use App\Http\Resources\Comment\CommentCollection;

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
        $reactionType = \ReactionType::fromName('like');
        $user = auth()->user();
        
        if ( !$user->isRegisteredAsLoveReacter() )
        {
            $user->registerAsLoveReacter();
        } // end if
        
        if (!$comment->isRegisteredAsLoveReactant())
        {
            $comment->registerAsLoveReactant();
        } // end if
        
        $reacter = $user->getLoveReacter();

        return $reacter->isReactedTo( $comment->getLoveReactant() ) ?
                    $reacter->unreactTo($comment->getLoveReactant(), $reactionType) :
                    $reacter->reactTo($comment->getLoveReactant(), $reactionType);
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
    } // end delete

    public function loadMore( Request $request, Post $post, Comment $comment )
    {
        $request->validate([
            'last' => 'required|string'
        ]);

        $last = Comment::where( 'id', \Hashids::decode($request->last) )->firstOrFail();

        if ($comment->id)
        {
            if ($post->id == $comment->commentable_id)
            {
                return new CommentCollection(
                    $comment->children()->take(4)
                        ->where('id', '<', $last->id)->orderBy('id', 'desc')->get()
                );
            } // end if
        } else {
            return new CommentCollection(
                $post->comments()->take(4)
                ->where('parent_id', null)    
                ->where('id', '<', $last->id)->orderBy('id', 'desc')->get()
            );
        } // end if

        return response(null, 404);
    }
}

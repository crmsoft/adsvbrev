<?php

namespace App\Observers;

use App\User;
use App\Entities\Comment;
use App\Entities\UserNotification;

class CommentObserver
{
    static $notification;

    /**
     * Handle the comment "created" event.
     *
     * @param  \App\Comment  $comment
     * @return void
     */
    public function created(Comment $comment)
    {
        if ($comment->commentable->postable_type == 'App\Entities\Group')
        {
            return;
        } // end if

        $n = new UserNotification;
        $n->notifiable()->associate($comment);
        $n->user()->associate(
            $comment->parent_id ? $comment->parent->creator : $comment->commentable->user
        );
        $n->save();
        self::$notification = $n;
    }

    /**
     * Handle the comment "updated" event.
     *
     * @param  \App\Comment  $comment
     * @return void
     */
    public function updated(Comment $comment)
    {
        if ($comment->parent_id && self::$notification->notifiable_id == $comment->id)
        {
            self::$notification->user()->associate(
                $comment->parent->creator
            );
            self::$notification->save();
        }
    }

    /**
     * Handle the comment "deleted" event.
     *
     * @param  \App\Comment  $comment
     * @return void
     */
    public function deleted(Comment $comment)
    {
        //
    }

    /**
     * Handle the comment "restored" event.
     *
     * @param  \App\Comment  $comment
     * @return void
     */
    public function restored(Comment $comment)
    {
        //
    }

    /**
     * Handle the comment "force deleted" event.
     *
     * @param  \App\Comment  $comment
     * @return void
     */
    public function forceDeleted(Comment $comment)
    {
        //
    }
}

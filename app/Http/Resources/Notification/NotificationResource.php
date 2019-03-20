<?php

namespace App\Http\Resources\Notification;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\User;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $message = 'Not known...';
        $user = $this->user;

        switch ($this->notifiable_type)
        {
            case 'App\Entities\Comment' : {
                if ($this->notifiable->commentable_type == 'App\Post') 
                {
                    $user = $this->notifiable->creator;
                    if ($this->notifiable->parent_id == null)
                    {
                        $message = 'commented your post';
                    } else {
                        $message = 'replied to your comment';
                    } // end if
                } // end if
            } break;

            case 'Cog\Laravel\Love\Reactant\Models\Reactant' : {
                $subject = $this->notifiable;
                $reactions = $subject->reactions;
                if ($reactions)
                {
                    $target = $this->target_id;
                    
                    $reaction = $reactions->filter(function($reaction) use ($target) {
                        return $reaction->id == $target;
                    })->first();

                    $type = $reaction->type->name;
                    $user = $reaction->reacter->reacterable;

                    if ($type == 'like')
                    {
                        if ($subject->type == 'App\Entities\Comment')
                        {
                            $message = 'likes your comment';
                        } else if ($subject->type == 'App\Post') {
                            $message = 'likes your post';
                        } // end if
                    } else if ($type == 'share')
                    {
                        if ($subject->type == 'App\Post') {
                            $message = 'shared your post';
                        } // end if   
                    } // end if
                } // end if
            } break;
        }

        return [
            'id' => $this->id,
            'message' => $message,
            'time' => $this->created_at->diffForHumans(),
            'user' => new User($user)
        ];
    }
}

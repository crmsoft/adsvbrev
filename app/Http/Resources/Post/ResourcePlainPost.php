<?php

namespace App\Http\Resources\Post;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\User;
use App\Http\Resources\Media\MediaCollection;
use App\Http\Resources\Comment\CommentCollection;
use App\Http\Resources\Events\Event;

class ResourcePlainPost extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $poster = null;

        switch ( $this->postable_type )
        {
            case 'App\User'  : $poster = new User($this->user); $poster->additional(['path' => 'gg']); break;
            case 'App\Entities\Event' : $poster = new Event($this->event); $poster->additional(['path' => 'event']); break;
        } // end switch

        return [
            'id' => $this->hash,
            'created_at' => $this->human_ago,
            'content' => $this->content,
            'poster' => $poster,
            'repost' => null,
            'media' => new MediaCollection($this->media),
            'comment' => [],
            'like_count' => 0,
            'likes' => 0
        ];
    }
}

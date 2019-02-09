<?php

namespace App\Http\Resources\Post;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\User;
use App\Http\Resources\Media\MediaCollection;
use App\Http\Resources\Comment\CommentCollection;

class ResourcePost extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->hash,
            'created_at' => $this->human_ago,
            'content' => $this->content,
            'user' => new User($this->user),
            'media' => new MediaCollection($this->media),
            'comment' => new CommentCollection($this->comments()->where('parent_id', null)->take(4)->orderBy('id', 'desc')->get()),
            'like_count' => $this->likesCount,
            'likes' => $this->isLikedBy(auth()->id())
        ];
    }
}

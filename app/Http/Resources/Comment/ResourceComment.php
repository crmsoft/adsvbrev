<?php

namespace App\Http\Resources\Comment;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\User;
use App\Http\Resources\Media\MediaCollection;

class ResourceComment extends JsonResource
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
            'user' => new User($this->creator),
            'created_at' => $this->created_at->diffForHumans(null, true, true),
            'contnet' => $this->body,
            'like_count' => $this->likesCount,
            'likes' => $this->isLikedBy(auth()->id()),
            'media' => new MediaCollection($this->media)
        ];
    }
}

<?php

namespace App\Http\Resources\Chat\Dialog;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserList\User;
use App\Http\Resources\Media\MediaCollection;

class ResourceMessage extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        preg_match('/\s@\w+\s/', " $this->message ", $markers);

        return [
            'id' => $this->hash,
            'message' => $this->message,
            'created_at' => $this->created_at->getTimestamp(),
            'user' => new User($this->user),
            'readed' => $this->readed,
            'media' => new MediaCollection($this->mediable),
            'markers' => array_map('trim', $markers)
        ];
    }
}
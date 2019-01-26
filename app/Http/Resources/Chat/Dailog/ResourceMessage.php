<?php

namespace App\Http\Resources\Chat\Dialog;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserList\User;

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
        return [
            'id' => $this->id,
            'message' => $this->message,
            'created_at' => $this->created_at->getTimestamp(),
            'user' => new User($this->user)
        ];
    }
}
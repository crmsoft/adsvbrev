<?php

namespace App\Http\Resources\Chat;

use Illuminate\Http\Resources\Json\JsonResource;

use \App\Http\Resources\UserList\UserCollection;

class ResourceChat extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = auth()->user();

        return [
            'hash_id' => $this->hash_id,
            'unread' => (int) $this->unread,
            'members' => new UserCollection($this->members),
            'owner' => $this->user_id == $user->id,
            'group' => !!$this->is_group,
            'last' => $this->last_message,
        ];
    }
}
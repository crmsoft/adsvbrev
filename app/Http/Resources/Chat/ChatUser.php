<?php

namespace App\Http\Resources\Chat;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\Chat\ChatCollection;

class ChatUser extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $chats = \App\Conversation::hydrate(
            \DB::select(
                $this->chat()->select(['conversations.*'])->toSql(), 
                [$this->id, join(',', \App\User::CHATS_EXCEPT_STATUS)]
            )
        );

        return [
            'full_name' => $this->full_name,
            'username' => $this->username,
            'ava' => $this->ava,
            'chat' => new ChatCollection($chats),
            'friend' => new UserCollection($this->friend),
            'm_status' => $this->profile->m_status,
            'm_sound' => $this->profile->m_sound
        ];
    }
}
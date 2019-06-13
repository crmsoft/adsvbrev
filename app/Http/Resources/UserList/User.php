<?php

namespace App\Http\Resources\UserList;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
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
            'full_name' => $this->full_name,
            'first_name' => $this->first_name,
            'username' => $this->username,
            'value' => $this->username,
            'ava' => $this->ava,
            'status' => $this->status,
            'mutual' => isset($this->additional['mutual']) ? $this->getMutualFriendsOf(auth()->id())->count() : -1
        ];
    }
}

<?php

namespace App\Http\Resources\UserListStatus;

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
            'username' => $this->username,
            'ava' => $this->ava,
            'has_status' => $this->has_status
        ];
    }
}

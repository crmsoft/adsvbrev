<?php

namespace App\Http\Resources\Group;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserList\UserCollection;

class Group extends JsonResource
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
            'id' => \Hashids::encode($this->id),
            'username' => $this->slug,
            'full_name' => $this->name,
            'ava' => url(\Storage::url($this->ava)),
        ];
    }
}
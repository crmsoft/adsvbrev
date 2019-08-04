<?php

namespace App\Http\Resources\Game;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserList\UserCollection;

class Game extends JsonResource
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
            'participant_count' => $this->participants->count(),
            'full_name' => $this->name,
            'ava' => url(\Storage::url($this->ava)),
            'poster' => url(\Storage::url($this->poster)),
            'path' => isset($this->additional['path']) ? $this->additional['path'] : null
        ];
    }
}

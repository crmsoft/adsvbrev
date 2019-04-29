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
        $user = auth()->user();

        return $this->is_game == 1 ? [
            'id' => \Hashids::encode($this->id),
            'username' => $this->slug,
            'full_name' => $this->name,
            'ava' => url(\Storage::url($this->ava)),
            'd_and_p' => $this->developers->implode('name', ',') . ' for ' . $this->platforms,
            'gamers' => $this->gamers->count(),
            'playing' => $this->participants()->where('user_id', $user->id)->count()
        ] : [
            'id' => \Hashids::encode($this->id),
            'username' => $this->slug,
            'full_name' => $this->name,
            'ava' => url(\Storage::url($this->ava)),
        ];
    }
}
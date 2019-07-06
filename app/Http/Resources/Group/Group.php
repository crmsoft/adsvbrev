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
        $d_and_p = $this->developers ? ($this->developers->implode('name', ',') . ' for ' . $this->platforms) : NULL;

        return $this->is_game == 1 ? [
            'id' => \Hashids::encode($this->id),
            'value' => \Hashids::encode($this->id),
            'username' => $this->slug,
            'full_name' => $this->name,
            'ava' => url(\Storage::url($this->ava)),
            'd_and_p' => $d_and_p,
            'gamers' => $this->gamers ? $this->gamers->count():0,
            'playing' => $this->participants()->where('user_id', $user->id)->count()
        ] : [
            'id' => \Hashids::encode($this->id),
            'username' => $this->slug,
            'full_name' => $this->name,
            'manages' => !empty($this->role),
            'ava' => url(\Storage::url($this->ava)),
            'path' => isset($this->additional['path']) ? $this->additional['path'] : null
        ];
    }
}
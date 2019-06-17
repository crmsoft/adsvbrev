<?php

namespace App\Http\Resources\Group;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserList\UserCollection;

class EditGroup extends JsonResource
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

        $role = $this->role;

        $moderators = $this->managers->filter(function ($m) use ($user) { 
            return $user->id != $m->id && $m->pivot->hierarchy > 1;
        });

        return [
            'id' => $this->slug,
            'ava' => url(\Storage::url($this->ava)),
            'name' => $this->name,
            'role' => $role,
            'cover' => url(\Storage::url($this->poster)),
            'banned' => new UserCollection($this->participants()->where('status', 'banned')->get()),
            'related' => new GroupCollection($this->related_groups),
            'is_private' => $this->is_private,
            'moderators' => $role == 'administrator' ? new UserCollection($moderators) : false,
            'description' => $this->options['description'] ?? ''
        ];
    }
}
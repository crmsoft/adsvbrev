<?php

namespace App\Http\Resources\Events;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\User;
use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\Post\PostCollection;

class EventResource extends JsonResource
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
            'id' => $this->hash,
            'type' => 'dudes',
            'name' => $this->name,
            'description' => $this->description,
            'start' => $this->start->format('Y-m-d'),
            'start_human' => $this->start->format('d M, Y'),
            'owner' => new User($this->user),
            'ava' => url(\Storage::url($this->ava)),
            'poster' => url(\Storage::url($this->poster)),
            'user_participiant' => $this->userParticipants(),
            'participants' => [],
            'random' => new UserCollection($this->participants()->take(6)->inRandomOrder()->get()),
            'total_participiant' => $this->participants()->count(),
            'feed' => new PostCollection($this->posts()->with(['media', 'event'])->take(2)->orderBy('created_at', 'desc')->get())
        ];
    }
}
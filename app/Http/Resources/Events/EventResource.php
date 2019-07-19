<?php

namespace App\Http\Resources\Events;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\User;
use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\Post\PostCollection;
use App\Http\Resources\Group\GroupCollection;

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
        $user_participant = $this->userParticipants();
        $is_owner = $this->user->id == auth()->user()->id;

        return [
            'id' => $this->hash,
            'type' => 'dudes',
            'name' => $this->name,
            'description' => $this->description,
            'start' => $this->start->format('Y-m-d'),
            'start_human' => $this->start->format('d M, Y'),
            'owner' => new User($this->user),
            'is_owner' => $is_owner,
            'related' => new GroupCollection($this->games),
            'suggested' => ($user_participant || $is_owner) ? new UserCollection(
                auth()->user()->friend()
                ->whereNotIn('users.id', $this->participants->pluck('id'))
                ->take(3)->inRandomOrder()->get()
            ) : [],
            'ava' => url(\Storage::url($this->ava)),
            'poster' => url(\Storage::url($this->poster)),
            'user_participant' => !!$user_participant,
            'user_participant_as' => !$user_participant ? null : ($user_participant->pivot->type == 'interested' ? 'interested' : 'attends'),
            'is_private' => boolval($this->is_private),
            'participants' => [],
            'random' => new UserCollection($this->participants()->take(6)->inRandomOrder()->get()),
            'total_participant' => $this->participants()->count(),
            'feed' => new PostCollection($this->posts()->with(['media', 'event'])->take(2)->orderBy('created_at', 'desc')->get())
        ];
    }
}
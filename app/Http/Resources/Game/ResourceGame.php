<?php

namespace App\Http\Resources\Game;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\Post\PostCollection;

class ResourceGame extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $participants = new UserCollection($this->participants()->take(6)->inRandomOrder()->get());
        $user = auth()->user();

        return [
            'name' => $this->name,
            'ava' => $this->ava,
            'poster' => $this->poster,
            'random' => $participants,
            'participants' => $participants,
            'feed' => new PostCollection($this->posts()->with(['media', 'event'])->take(2)->orderBy('created_at', 'desc')->get()),
            'participant' => $this->participants()->where('user_id', $user->id)->count()
        ];
    }
}

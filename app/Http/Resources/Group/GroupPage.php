<?php

namespace App\Http\Resources\Group;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserList\UserCollection;

use App\Http\Resources\Post\PostCollection;

class GroupPage extends JsonResource
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

        return  [
            'id' => $this->slug,
            'ava' => url(\Storage::url($this->ava)),
            'poster' => url(\Storage::url($this->poster)),
            'name' => $this->name,
            'description' => $this->options['description'] ?? '',
            'participants' => new UserCollection($this->participants),
            'participant' => $this->participants->where('id', $user->id)->count(),
            'random' => new UserCollection($this->participants()->take(6)->inRandomOrder()->get()),
            'total_participant' => $this->participants->count(),
            'feed' => new PostCollection($this->posts()->orderBy('id','desc')->take(2)->get())
        ];
    }
}
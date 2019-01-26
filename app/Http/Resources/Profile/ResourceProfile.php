<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\UserList\User;
use App\Http\Resources\Post\PostCollection;

class ResourceProfile extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        $user = new User($this);

        $profile = $this->profile;
        $profile['user'] = $user;

        $feed = new PostCollection($this->feed()->with(['media', 'user'])
                ->limit(10)->orderBy('created_at', 'desc')->get());

        return [
            'friends' => new UserCollection($this->friend),
            'groups' => $this->group(function($query){
                            $query->inRandomOrder();
                            $query->limit(3);
                        })->get(),
            'feed' => $feed,
            'profile' => $profile,
            'totals' => [
                'friends' => $this->friend->count(),
                'groups' => $this->group->count()
            ]
        ];
    }
}

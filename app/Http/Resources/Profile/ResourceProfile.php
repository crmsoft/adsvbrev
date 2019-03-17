<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\UserListStatus\User;
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

        $feed = new PostCollection($this->feed()->with(
            [
                'media', 
                'postable', 
                'loveReactant.reactions.reacter.reacterable',
                'loveReactant.reactions.type',
                'loveReactant.reactionCounters',
                'loveReactant.reactionTotal',
                'parent' => function($query) {
                    $query->with(['media', 'postable']);
                }   
            ])
                    ->orderBy('created_at', 'desc')->take(2)->get());

        return [
            'friends' => new UserCollection($this->friend()->take(5)->inRandomOrder()->get()),
            'groups' => $this->group(function($query){
                            $query->inRandomOrder();
                            $query->limit(3);
                        })->get(),
            'feed' => $feed,
            'profile' => new ProfileConfig($profile),
            'totals' => [
                'friends' => $this->friend->count(),
                'groups' => $this->group->count()
            ]
        ];
    }
}

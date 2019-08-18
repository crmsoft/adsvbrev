<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\UserListStatus\User;
use App\Http\Resources\Post\PostCollection;
use App\Http\Resources\Group\GroupCollection;
use App\Http\Resources\Media\MediaCollection;

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

        $guest = $this->additional['guest'];

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
            'friends' => new UserCollection($this->friend()->take( $guest ? 6 : 5)->inRandomOrder()->get()),
            'groups' => new GroupCollection($this->group(function($query){
                            $query->inRandomOrder();
                            $query->limit(3);
                        })->where('is_game', 0)->get()),
            'feed' => $feed,
            'profile' => new ProfileConfig($profile),
            'games' => new GroupCollection( $this->games(function($q){ $q->with('gamers'); })->inRandomOrder()->where('is_game', 1)->get() ),
            'media' => new MediaCollection($this->media()->orderBy('id', 'desc')->take(3)->get()),
            'totals' => [
                'friends' => $this->friend->count(),
                'groups' => $this->group()->where('is_game', 0)->count(),
                'games' => $this->group()->where('is_game', 1)->count(),
                'media' => $this->media()->count()
            ]
        ];
    }
}

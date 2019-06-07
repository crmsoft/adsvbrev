<?php

namespace App\Http\Resources\Game;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\UserList\User;

class Review extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        $reactionType = \ReactionType::fromName('like');
        $reacter = auth()->user()->getLoveReacter();
        $reactant = $this->resource->getLoveReactant();

        $isLikes = $reacter
                    ->isReactedToWithType($reactant, $reactionType);

        return [
            'id' => \Hashids::encode($this->id),
            'text' => $this->review,
            'user' => new User($this->user),
            'type' => $this->type == 'vote-up' ? 'positive' : 'negative',
            'likes' => $isLikes,
            'like_count' => $reactant->getReactionCounterOfType( $reactionType )->getCount(),
            'created_at' => $this->created_at->diffForHumans(null, true, true),
            'timestamp' => $this->created_at->timestamp
        ];
    }
}

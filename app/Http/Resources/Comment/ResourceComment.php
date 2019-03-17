<?php

namespace App\Http\Resources\Comment;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\User;
use App\Http\Resources\Media\MediaCollection;

class ResourceComment extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        // like
        $isLikes = false;

        $reactionType = \ReactionType::fromName('like');
        $reacter = auth()->user()->getLoveReacter();
        $reactant = $this->resource->getLoveReactant();

        $isLikes = $reacter
                    ->isReactedToWithType($reactant, $reactionType);

        return [
            'id' => $this->hash,
            'user' => new User($this->creator),
            'created_at' => $this->created_at->diffForHumans(null, true, true),
            'contnet' => $this->body,
            'parent' => $this->parent_hash,
            'subs' => $this->parent_hash ? [] : new CommentCollection($this->children()->take(4)->orderBy('id', 'desc')->get()),
            'like_count' => $reactant->getReactionCounterOfType( $reactionType )->getCount(),
            'likes' => $isLikes,
            'media' => new MediaCollection($this->media)
        ];
    }
}

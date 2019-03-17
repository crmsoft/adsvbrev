<?php

namespace App\Http\Resources\Post;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\User;
use App\Http\Resources\Media\MediaCollection;
use App\Http\Resources\Comment\CommentCollection;
use App\Http\Resources\Events\Event;

class ResourcePost extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $poster = null;

        switch ( $this->postable_type )
        {
            case 'App\User'  : $poster = new User($this->user); break;
            case 'App\Entities\Event' : $poster = new Event($this->event); break;
        } // end switch

        $repost = null;

        if ( $this->parent )
        {
            $repost = new ResourcePlainPost($this->parent);
        } // end if
        
        // like
        $isLikes = false;

        $reactionType = \ReactionType::fromName('like');
        
        $reacter = auth()->user()->getLoveReacter();
        $reactant = $this->resource->getLoveReactant();

        $isLikes = $reacter
                    ->isReactedToWithType($reactant, $reactionType);

        // share
        $isShares = false;

        $reactionTypeShare = \ReactionType::fromName('share');
        
        $isShares = $reacter
                    ->isReactedToWithType($reactant, $reactionTypeShare);

        return [
            'id' => $this->hash,
            'created_at' => $this->human_ago,
            'content' => $this->content,
            'poster' => $poster,
            'repost' => $repost,
            'media' => new MediaCollection($this->media),
            'comment' => new CommentCollection($this->comments()->where('parent_id', null)->take(4)->orderBy('id', 'desc')->get()),
            'like_count' => $reactant->getReactionCounterOfType( $reactionType )->getCount(),
            'likes' => $isLikes,
            'shares' => $isShares,
            'share_count' => $reactant->getReactionCounterOfType( $reactionTypeShare )->getCount()
        ];
    }
}

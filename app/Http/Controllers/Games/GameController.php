<?php

namespace App\Http\Controllers\Games;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Resources\Game\ResourceGame;

use App\Entities\Game;
use App\Entities\GameReview;
use App\Http\Resources\Group\GroupCollection;
use App\Http\Resources\Game\Review as GameReviewResource;
use App\Http\Resources\Media\MediaCollection;

class GameController extends Controller
{
    public function show(Game $game)
    {
        return new ResourceGame($game);
    } // end show

    public function join(Game $game)
    {
        $user = auth()->user();

        return $game->participants()->attach($user);
    } // end join

    public function leave(Game $game)
    {
        $user = auth()->user();

        return $game->participants()->detach($user);
    } // end join

    /**
     * Fee Page right block "Game Groups"
     * 
     * @return Response
     */
    public function gameGroups()
    {
        return new GroupCollection(Game::inRandomOrder()->take(4)->get());
    }

    public function storeVote(Request $request, Game $game)
    {
        $request->validate([
            'type' => ['required', 'in:positive,negative']
        ]);
        
        $vote = $request->type == 'positive' ? 'vote-up':'vote-down';

        $reactionType = \ReactionType::fromName($vote);

        $user = auth()->user();

        if($user->group()->where('is_game', 1)->where('id', $game->id)->count() == 0)
        {
            return response()->json([
                'message' => __('Only players of this game can vote.'),
                'passes' => false
            ]);
        }
        
        if ( !$user->isRegisteredAsLoveReacter() )
        {
            $user->registerAsLoveReacter();
        } // end if
        
        if (!$game->isRegisteredAsLoveReactant())
        {
            $game->registerAsLoveReactant();
        } // end if
        
        $reacter = $user->getLoveReacter();

        if (!$reacter->isReactedTo( $game->getLoveReactant() )  ){
            $reacter->reactTo($game->getLoveReactant(), $reactionType);
            return response()->json([
                'passes' => true
            ]);
        } // end if
          
        return response()->json([
            'message' => __('You already did your vote.'),
            'passes' => true
        ]);
    }

    public function storeReview(Request $request, Game $game)
    {
        $request->validate([
            'review' => ['required', /*'min:15'*/ ]
        ]);

        $user = auth()->user();

        $reactionUp = \ReactionType::fromName('vote-up');
        $reactionDown = \ReactionType::fromName('vote-down');

        $reacter = $user->getLoveReacter();
        $reactant = $game->getLoveReactant();

        $can_add_review = $reacter->isReactedToWithType($reactant, $reactionUp) | $reacter->isReactedToWithType($reactant, $reactionDown);

        if ($can_add_review)
        {
            $gameReview = new GameReview;
            $gameReview->review = $request->review;
            $gameReview->vote = $reacter->isReactedToWithType($reactant, $reactionUp) ? 'vote-up':'vote-down';
            $gameReview->game()->associate($game);
            $gameReview->user()->associate($user);
            $gameReview->save();

            return new GameReviewResource($gameReview);
        } // end if
    }

    public function toggleReviewLike(GameReview $gameReview)
    {
        $reactionType = \ReactionType::fromName('like');
        $user = auth()->user();
        
        if ( !$user->isRegisteredAsLoveReacter() )
        {
            $user->registerAsLoveReacter();
        } // end if
        
        if (!$gameReview->isRegisteredAsLoveReactant())
        {
            $gameReview->registerAsLoveReactant();
        } // end if
        
        $reacter = $user->getLoveReacter();

        return $reacter->isReactedTo( $gameReview->getLoveReactant() ) ?
                    $reacter->unreactTo($gameReview->getLoveReactant(), $reactionType) :
                    $reacter->reactTo($gameReview->getLoveReactant(), $reactionType);
    }

    public function gameMedia(Game $game)
    {
        return new MediaCollection(
            $game->media
        );
    }
}

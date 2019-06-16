<?php

namespace App\Http\Resources\Game;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Cache;

use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\Post\PostCollection;
use App\Http\Resources\Media\MediaCollection;
use App\Http\Resources\TwitchStreams\StreamCollection;
use App\Entities\Game as EntityGame;

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
            'id' => $this->slug,
            'name' => $this->name,
            'ava' => url(\Storage::url($this->ava)),
            'poster' => url(\Storage::url($this->poster)),
            'random' => $participants,
            'participants' => $participants,
            'feed' => new PostCollection($this->posts()->with(['media', 'event'])->take(2)->orderBy('created_at', 'desc')->get()),
            'total_participant' => $this->participants->count(),
            'participant' => $this->participants->where('id', $user->id)->count(),
            'media' => new MediaCollection($this->media),
            'options' => array_merge($this->options, [
                'genres' => $this->genres->map(function($item){ return ['name' => $item->name]; }),
                'developers' => $this->developers->map(function($item){ return ['name' => $item->name]; }),
            ]),
            'streams' => new StreamCollection(
                Cache::remember("game_streams_{$this->slug}", 60 * 15, function (){
                    return $this->get_game_streams($this->name);
                })
            ),
            'votes' => $this->getVotes($this, $user),
            'reviews' => new ReviewCollection($this->reviews->shuffle()),
            'avg_rate' => $this->getRate($this)
        ];
    }

    public function getVotes($game,$user)
    {
        $reactionUp = \ReactionType::fromName(EntityGame::VOTE_UP);
        $reactionDown = \ReactionType::fromName(EntityGame::VOTE_DOWN);

        $reacter = $user->getLoveReacter();
        $reactant = $game->getLoveReactant();

        $positive = $reactant->getReactionCounterOfType( $reactionUp )->getCount();
        $negative = $reactant->getReactionCounterOfType( $reactionDown )->getCount();

        return [
            'can_add_review' => $reacter->isReactedToWithType($reactant, $reactionUp) | $reacter->isReactedToWithType($reactant, $reactionDown),
            'positive' => $positive,
            'negative' => $negative
        ];
    }

    private final function getRate($game)
    {
        $reactionUp = \ReactionType::fromName(EntityGame::VOTE_UP);
        $reactionDown = \ReactionType::fromName(EntityGame::VOTE_DOWN);

        $reactant = $game->getLoveReactant();

        $weight_positive = $reactant->getReactionCounterOfType( $reactionUp )->getWeight();
        $weight_negative = $reactant->getReactionCounterOfType( $reactionDown )->getWeight();

        if ($weight_positive == 0 && $weight_negative == 0)
            return 0;

        return $weight_positive / ($weight_positive + $weight_negative) * 5 * 20;
    }

    private function get_game_streams($name)
    {
        // The Guzzle client used can be the included `HelixGuzzleClient` class, for convenience. 
        // You can also use a mock, fake, or other double for testing, of course.
        $helixGuzzleClient = new \NewTwitchApi\HelixGuzzleClient(env('TWITCH_CLIENT_ID'));

        // Instantiate NewTwitchApi. Can be done in a service layer and injected as well.
        $newTwitchApi = new \NewTwitchApi\NewTwitchApi($helixGuzzleClient, env('TWITCH_CLIENT_ID'), env('TWITCH_CLIENT_SECRET'));

        try {
            // Make the API call. A ResponseInterface object is returned.
            $response = $newTwitchApi->getGamesApi()->getGames([],[$name]);
            $game = json_decode($response->getBody()->getContents(), true);
            
            if (empty($game['data']))
                return collect([]);

            $response = $newTwitchApi->getStreamsApi()->getStreams([],[],[$game['data'][0]['id']]);
            $streams = json_decode($response->getBody()->getContents(), true);

            if (empty($streams['data']))
                return collect([]);

            $game_streams = collect(array_slice($streams['data'], 0, 3));

            $userApi = $newTwitchApi->getUsersApi()->getUsers(
                $game_streams->map(function( $user ) {
                    return $user['user_id'];
                })->toArray()
            );

            $users = collect(json_decode($userApi->getBody()->getContents(), true)['data']);

            return collect($game_streams->reduce(function( $result, $item ) use ($users) {

                if ($users->where('id', $item['user_id'])->count())
                {
                    $item['username'] = $users->where('id', $item['user_id'])->first()['login'];
                    $result[] = $item;
                } // end if

                return $result;
            }, []));
        } catch (Exception $e) {
            // Handle error appropriately for your application
            \Log::debug($e);
        }
        return collect([]);
    }
}

<?php 

namespace Modules\FindDudes\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

use Modules\FindDudes\Entities\Message;
use Modules\FindDudes\Entities\Subscription;
use App\Http\Resources\Chat\Dialog\ResourceMessage;
use App\Http\Resources\Chat\Dialog\MessageCollection;
use App\Entities\Game;
use App\Http\Resources\UserList\UserCollection;
use Illuminate\Support\Facades\Redis;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Media;
use Illuminate\Validation\Rule;
use Modules\FindDudes\Entities\GameChannel;
use Modules\FindDudes\Http\GameChannel\GameChannelCollection;
use Modules\FindDudes\Http\GameChannel\GameChannelResource;

class SubChannelController extends Controller {

    public function __construct() {
        $this->middleware('user-plays');
    }

    /**
     * Get list of sub channels that belongs to the game
     * 
     * @param Game $game
     * 
     * @return Response
     */
    public function index(Game $game)
    {
        // get all sub channels of the game
        $subChannels = GameChannel::with('participants')->where('game_id', $game->id)->get();

        return new GameChannelCollection($subChannels);
    }

    /**
     * Store new Game room
     * 
     * @param Game $game
     * @param Request $request
     * 
     * @return Response
     */
    public function store(Request $request, Game $game)
    {
        $request->validate([
            'name'      => [
                'required',
                'alpha_dash',
                'max:20', 
                Rule::unique('find_dudes_game_channels', 'channel')
                ->where(function($query) use ($game) {
                    $query->where('game_id', $game->id);
                })
            ],
            'number'    => ['required', 'numeric', 'min:0', 'max:100']
        ]);

        // authenticated user
        $user = $request->user();

        // construct new resource
        $gameChannel = new GameChannel;
        // associate channel with a game
        $gameChannel->game()->associate($game);
        // set game channel channel
        $gameChannel->channel = $request->get('name');
        // associate game channel with a user
        $gameChannel->user()->associate($user);
        // set max participants
        $gameChannel->quota = $request->get('number');

        try {
            // store channel to the storage
            $gameChannel->save();
        } catch (\Throwable $e) {
            // duplicate entry
            if ($e->getCode() == 23000) {
                return response()->json([
                    'errors' => [
                        'name' => 'You can create only one room per game.'
                    ]
                ])->setStatusCode(422);
            }
        }

        return new GameChannelResource($gameChannel);
    }


    /**
     *  Users subscribes to game sub-channel
     * 
     * @param Game $game
     * @param GameChannel $gameChannel
     * 
     * @return Response
     */
    public function update(Request $request, Game $game, GameChannel $gameChannel)
    {
        $request->validate([
            'page-id' => ['required']
        ]);


        // authenticated user
        $user = $request->user();

        $channelQuota = $gameChannel->quota - $gameChannel->participants()->count();

        if ($channelQuota > 0 || (
            $gameChannel->participants()->where('users.id', $user->id)->count()
        )) {

            Redis::publish(config('app.pub-sub-channel'), json_encode([
                'action' => 'sub-find-dudes',
                'target' => "{$game->slug}_{$gameChannel->channel}",
                'user' => $user->id,
                'page' => $request->get('page-id')
            ]));

            Subscription::where([
                'user_id' => $user->id,
                'token' => $request->get('page-id')
            ])->orderBy('id', 'desc')->delete(); 

            $subscription = Subscription::firstOrNew([
                'user_id' => $user->id,
                'game_id' => $game->id,
                'token' => $request->get('page-id'),
                'sub_channel_id' => $gameChannel->id
            ]);

            $subscription->touch();

            return new GameChannelResource($gameChannel);
        } // end if

        return response()->json([
            'message' => __('Unfortunately the room is full for now.')
        ])->setStatusCode(303);
    }

    /**
     * User leaves sub channel
     * 
     * @param Request $request
     * @param Game $game
     * @param GameChannel $gameChannel
     * 
     * @return Response
     */
    public function destroy(Request $request, Game $game, GameChannel $gameChannel)
    {
        $request->validate([
            'page-id'   => ['required']
        ]);

        // authenticated user
        $user = auth()->user();

        Subscription::where([
            'user_id' => $user->id,
            'game_id' => $game->id,
            'token' => $request->get('page-id')
        ])->update([
            'sub_channel_id' => NULL
        ]); 

        Redis::publish(config('app.pub-sub-channel'), json_encode([
            'action' => 'unsub-find-dudes',
            'target' => "{$game->slug}_{$gameChannel->channel}",
            'user' => $user->id,
            'page' => $request->get('page-id')
        ]));
    }
}

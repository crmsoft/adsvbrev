<?php

namespace Modules\FindDudes\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use App\Http\Resources\Game\Game as ResourceGame;
use App\Http\Resources\UserList\UserCollection;
use App\Entities\Game;
use Illuminate\Support\Facades\Redis;
use Modules\FindDudes\Entities\Subscription;

class FindDudesController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $user = auth()->user();

        return $user->games->map(function($game) {
            return new ResourceGame($game);
        });
    }

    /**
     * Show the participants.
     * 
     * @return Response
     */
    public function participants(Request $request)
    {
        $request->validate([
            'channel' => ['required']
        ]);

        $user = auth()->user();

        $game = $user->games()->where('slug', $request->channel)->firstOrFail();

        return new UserCollection(
            $game->participants
        );
    }

    /**
     * Dude subscribes to the channel, adding a listener
     * subscription done in every few minutes,
     * subscription older then 2 minute should be snoozed
     * 
     * @return Response
     */
    public function unsubscribe(Request $request, Game $game)
    {
        $request->validate([
            'page-id' => ['required']
        ]);

        $user = auth()->user();

        Redis::publish(config('app.pub-sub-channel'), json_encode([
            'action' => 'unsub-find-dudes',
            'target' => $game->slug,
            'user' => $user->id,
            'page' => $request->get('page-id')
        ]));

        Subscription::where([
            'user_id' => $user->id,
            'token' => $request->get('page-id'),
            'game_id' => $game->id
        ])->delete();   

        return [
            'status' => 'unsubscribed'
        ];
    }
}

<?php

namespace Modules\FindDudes\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use App\Http\Resources\UserList\UserCollection;
use App\Entities\Game;
use Illuminate\Support\Facades\Redis;
use Modules\FindDudes\Entities\Subscription;
use Modules\FindDudes\Http\Requests\ResourceGame;

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
    public function subscribers(Game $game)
    {
        // authenticated user
        $user = auth()->user();
        // request game
        $game = $user->games()->where('id', $game->id)->firstOrFail();

        return new UserCollection(
            Subscription::where('game_id', $game->id)
                ->join('users', 'users.id', '=', 'user_id')
                ->where('users.id', '<>', $user->id)
                ->whereRaw('datediff(find_dudes_subscriptions.updated_at, now()) = 0')
                ->groupBy('users.id')
                ->select('users.*')
                ->get()
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

<?php

namespace Modules\FindDudes\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use App\Http\Resources\Game\Game as ResourceGame;
use App\Http\Resources\UserList\UserCollection;

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
}

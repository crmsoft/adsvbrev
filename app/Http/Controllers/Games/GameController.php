<?php

namespace App\Http\Controllers\Games;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Resources\Game\ResourceGame;

use App\Entities\Game;
use App\Http\Resources\Group\GroupCollection;

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
        return new GroupCollection(Game::inRandomOrder(4)->take(4)->get());
    }
}

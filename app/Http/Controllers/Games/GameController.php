<?php

namespace App\Http\Controllers\Games;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Resources\Game\ResourceGame;

use App\Entities\Game;

class GameController extends Controller
{
    public function show(Game $game)
    {
        return new ResourceGame($game);
    } // end show
}

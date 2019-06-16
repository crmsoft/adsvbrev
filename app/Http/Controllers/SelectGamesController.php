<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use \App\Entities\Genre;
use \App\Entities\Game;

use \App\Http\Resources\Group\GroupCollection;

class SelectGamesController extends Controller
{
    public function index()
    {
        $genres = Genre::all();
        $games = Game::with(['gamers', 'developers'])->limit(50)->inRandomOrder()->get();
        $user = auth()->user();

        return view('my-games.index', [
            'genres' => $genres,
            'platforms' => [
                'windows' => __('Windows'),
                'linux' => __('Linux'),
                'mac' => __('Mac')
            ],
            'games' => $games,
            'my_games' => $user->group()->where('is_game', 1)->get()->map(function($item) {
                return '"' . \Hashids::encode($item->id) . '"';
            })->implode(',')
        ]);
    }

    public function store(Request $request)
    {
        $selected = collect(json_decode($request->get('selected', '[]')));
        $user = auth()->user();

        $user->group()->where('is_game', 1)->sync($selected->map(function($id) {
            return \Hashids::decode($id)[0];
        })->toArray());

        return redirect()->route('profile-view');
    }

    public function search(Request $request)
    {
        $games = Game::with(['gamers', 'developers']);
        
        $query = $request->get('query', false);
        $platform = $request->get('platform', 'any');
        $genre = $request->get('genre', 0);
        $order = $request->get('order', 'a');

        if (!empty($query))
        {
            $games->where('name', 'like', "%" . $query . "%");
        } // end if

        if ($platform == 'mac')
        {
            $games->whereRaw('json_length(options->"$.system_requirements.mac") > 0');
        } // end if

        if ($platform == 'windows')
        {
            $games->whereRaw('json_length(options->"$.system_requirements.windows") > 0');
        } // end if

        if ($platform == 'linux')
        {
            $games->whereRaw('json_length(options->"$.system_requirements.linux") > 0');
        } // end if

        if ($order == 'a')
        {
            $games->orderBy('name', 'asc');
        } // end if

        if ($order == 'm')
        {
            $games
                ->select(['*', \DB::raw("count(user_groups.user_id) as cnt")])
                ->leftJoin("user_groups", function($query) {
                    $query->on("user_groups.group_id","=","id");
                })
                ->groupBy("groups.id")
                ->orderBy('cnt', 'desc');
        } // end if

        if ($order == 'n')
        {
            $games->orderBy('options->release.timestamp', 'asc');
        } // end if

        if (intval($genre))
        {
            $games->whereHas('genres', function($query) use ($genre) {
                $query->where('genre_id', $genre);
            });
        } // end if

        return new GroupCollection($games->get());
    }
}

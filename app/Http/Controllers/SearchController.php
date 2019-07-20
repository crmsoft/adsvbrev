<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\UserListStatus\UserCollection;
use App\Http\Resources\Group\GroupCollection;
use App\Entities\Group;
use App\Entities\Game;
use App\User;

class SearchController extends Controller
{

    public function search(Request $request)
    {
        $request->validate([
            'from' => ['min:0', 'lt:to'],
            'to'    => ['min:0', 'gt:from']
        ]);

        $search = $request->get('q','');
        $searchTab = $request->get('i', 'fr');

        $result = [];

        switch ($searchTab){
            case 'fr' : {

                $result = User::where('validated',1);
                
                if( !empty($search) )
                {
                   $result->where(function($query) use($search){
                        $query->orWhere('first_name','like',"%$search%");
                        $query->orWhere('last_name','like',"%$search%");
                        $query->orWhere('username','like',"%$search%");
                    });
                }

                if ($request->has('from') && $request->has('to'))
                {
                    $data = $result->offset($request->from)->take($request->to - $request->from)->get();
                } else {
                    $data = $result->take(25)->get();
                }// end if

                $result = new UserCollection($data);

            } break;
            case 'gr' : {
                $result = new GroupCollection(Group::where(function( $query ) use ($search){
                    $query->orWhere('name','like',"%$search%");
                })->offset($request->from ?? 0)->take(($request->to ?? 24) - $request->from)->get());
            }
        }

        return $result;
    }

    public function filterGame(string $search)
    {
        return new GroupCollection(Game::where(function( $query ) use ($search){
            $query->orWhere('name','like',"%$search%");
        })->with(['gamers'])->get());
    }

    public function filterUser(string $search)
    {
        $result = User::where('validated',1);
                
        if( !empty($search) )
        {
           $result->where(function($query) use($search){
                $query->orWhere('first_name','like',"%$search%");
                $query->orWhere('last_name','like',"%$search%");
                $query->orWhere('username','like',"%$search%");
            });
        }

        return new UserCollection($result->take(10)->get());   
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\UserListStatus\UserCollection;
use App\Http\Resources\Group\GroupCollection;
use App\Entities\Group;
use App\User;

class SearchController extends Controller
{

    public function search(Request $request)
    {
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

                return new UserCollection($result->get());

            } break;
            case 'gr' : {
                $result = new GroupCollection(Group::where(function( $query ) use ($search){
                    $query->orWhere('name','like',"%$search%");
                })->get());
            }
        }

        return $result;
    }
}

<?php

namespace App\Http\Controllers;

use App\Entities\Group;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{

    public function search(Request $request)
    {
        $search = $request->get('q','');
        $searchTab = $request->get('i', 'fr');

        $result = [];

        switch ($searchTab){
            case 'fr' : {
                $result = User::where('validated',1)
                    ->where(function($query) use($search){
                        $query->orWhere('first_name','like',"%$search%");
                        $query->orWhere('last_name','like',"%$search%");
                        $query->orWhere('username','like',"%$search%");
                    })
                    ->get();
            } break;
            case 'gr' : {
                $result = Group::where(function( $query ) use ($search){
                    $query->orWhere('name','like',"%$search%");
                })->get();
            }
        }

        return $result;
    }
}

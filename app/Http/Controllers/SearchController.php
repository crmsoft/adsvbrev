<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    public function search(Request $request)
    {
        $user = Auth::user();

        $search = $request->get('q','');
        $users = User::where('validated',1)
                ->where(function($query) use($search){
                    $query->orWhere('name','like',"%$search%");
                    $query->orWhere('last_name','like',"%$search%");
                })
                ->get();

        return view('search-results',compact('users', 'user'));
    }
}

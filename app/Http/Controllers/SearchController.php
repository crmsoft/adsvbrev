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

        $query = $request->get('q','');
        $users = User::where('validated',1)
                ->orWhere(function($query){
                    $query->orWhere('name','like',"%$query%");
                    $query->orWhere('last_name','like',"%$query%");
                })
                ->get();

        return view('search-results',compact('users', 'user'));
    }
}

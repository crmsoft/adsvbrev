<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('profile',[
            'user' => Auth::user()
        ]);
    }

    public function showProfile($unique){

        $user = User::where('unique',$unique)->first();

        if($user == null){
            abort(404);
        }

        return view('profile', [
            'user' => $user
        ]);
    }
}

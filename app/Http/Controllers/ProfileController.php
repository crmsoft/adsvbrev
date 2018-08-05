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

    public function show($unique){

        $user = User::where('unique',$unique)->first();

        if($user == null){
            abort(404);
        }

        return view('profile', [
            'user' => $user
        ]);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function storeAva(Request $request){

        $this->validate($request, [
            'ava' => 'required|image|mimes:jpeg,jpg,gif,png|max:5000'
        ]);

        $ava = $request->file('ava');

        $url = MediaController::putInStorage($ava,160);

        $profile = $request->user()->profile;
        $profile->ava = $url;
        $profile->save();

        return $url;
    }
}

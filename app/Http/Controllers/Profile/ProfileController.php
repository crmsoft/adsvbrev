<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
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
        $user = Auth::user();

        return view('profile.index',[
            'user' => $user->with([
                'profile',
                'friend' => function($query){
                    $query->inRandomOrder();
                    $query->limit(7);
                },
                'group' => function($query){
                    $query->inRandomOrder();
                    $query->limit(3);
                }
            ])->first()
        ]);
    }

    public function show($unique){

        $user = User::where('username',$unique)->with(['profile', 'friend' => function($query){
            $query->inRandomOrder();
            $query->limit(7);
        }])->first();

        if($user == null){
            abort(404);
        }

        return view('profile.profile', [
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

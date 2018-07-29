<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

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

    /**
     * @param Request $request
     * @return mixed
     */
    public function storeAva(Request $request){

        $this->validate($request, [
            'ava' => 'required|max:5000'
        ]);

        $ava = $request->file('ava');

        $ava = Image::make($ava->getRealPath());
        $ava->resize(160, null, function($constraint){
            $constraint->aspectRatio();
        });

        $ava->stream();

        $name = hash('sha256', str_random() . $ava) .'.'. (explode('/',$ava->mime())[1]);

        Storage::disk('public')
            ->put("uploads/$name", $ava);

        $url = Storage::url("uploads/$name");

        $profile = $request->user()->profile;
        $profile->ava = $url;
        $profile->save();

        return $url;
    }
}

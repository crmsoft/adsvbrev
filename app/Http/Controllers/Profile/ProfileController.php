<?php

namespace App\Http\Controllers\Profile;

use App\Entities\Profile;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
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
    }

    public function listGroups(){
        $user = auth()->user();

        return response($user->group()->with('profile')->get());
    }

    function listFriends(String $username = null){
        $user = $username ? User::where('username', $username)->first() : Auth::user();
        $friends = $user->friend()->with('profile')->get();
        return response($friends);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('test.index');
    }

    public function update(Request $request){

        $request->validate([
            'email' => 'email',
            'about' => 'string',
            'dob' => 'date',
            'timezone' => 'string',
            'new_password' => 'required_with:password|string|min:6',
            'password' => 'string|min:6',
            'username' => 'unique:users',
            'phone' => 'string',
            'gender' => 'in:male,female'
        ]);

        $user = auth()->user();

        $user_profile = optional(Profile::where('user_id', $user->id)->first());

        $user->fill($request->except('password'));

        $user_profile->fill($request->all());

        $user_profile->save();

        // update the password
        if( $request->has('new_password') &&
            Hash::check($request->password,$user->password) ){
            $user->password = Hash::make($request->new_password);
        }

        $user->save();

        return response([
            'saved' => true
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

    public function profile( String $username = null ){
        if(!$username) {
            $user = auth()->user();
        }else{
            $user = User::where('username', $username)->first();
        }

        $totalFriends = $user->friend()->count();
        $totalGroups = $user->group()->count();


        $profile = [
                'info' => [
                    'guest' => $username != null,
                    'profile' => $user->profile()->with('user')->first(),
                    'friends' => $user->friend()
                                        ->limit(7)
                                        ->inRandomOrder()
                                        ->get(),
                    'feed' => $user->feed()->with(['media', 'user'])
                        ->limit(10)->orderBy('created_at', 'desc')->get(),
                    'groups' => $user->group(function($query){
                        $query->inRandomOrder();
                        $query->limit(3);
                    })->get()
                ],
                'totals' => [
                    'friends' => $totalFriends,
                    'groups' => $totalGroups
                ]
            ];

        return response($profile);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function storeAva(Request $request){

        $this->validate($request, [
            'ava' => 'required|image|mimes:jpeg,jpg,gif,png|max:8000'
        ]);

        $user = Auth::user();

        $ava = $request->file('ava');

        $image = Image::make($ava->getRealPath());

        $image->stream();
        $name = hash('sha256', str_random() . $image) .'.'. $ava->getClientOriginalExtension();
        $users_dir = "user-media/{$user->dir}/";

        Storage::disk('public')
            ->put("{$users_dir}original_{$name}", $image);
        // profile main image;
        $image->fit(200);
        $image->stream();

        Storage::disk('public')
            ->put("{$users_dir}200_{$name}", $image);

        $image->fit(50);
        $image->stream();

        Storage::disk('public')
            ->put("{$users_dir}50_{$name}", $image);

        $profile = $user->profile;
        $profile->ava = $name;
        $profile->save();

        $user->ava = "storage/{$users_dir}50_{$name}";
        $user->save();

        return response(Storage::url("{$users_dir}200_{$name}"));
    }
}

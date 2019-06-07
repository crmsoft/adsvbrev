<?php

namespace App\Http\Controllers\Profile;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

use Intervention\Image\Facades\Image;


use App\Entities\Profile;
use App\Entities\UserNotification;
use App\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\Notification\NotificationCollection;
use App\Http\Resources\UserList\User as ResourceUser;
use App\Http\Resources\Profile\ResourceProfile;
use App\Http\Resources\UserList\UserCollection;

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

    /**
     * fetch logged in user inforamtion
     * 
     * @return Response $user
     */
    public function getUser()
    {
        $user = auth()->user();
        return (new ResourceUser($user))->additional(
            [
                'followers' => $user->followers()->count(),
                'notifications' => UserNotification::where('user_id', $user->id)->where('viewed', 0)->count()
            ]
        );
    }

    public function listGroups(){
        $user = auth()->user();

        return response($user->group()->with('profile')->get());
    }

    function listFriends(String $username = null){
        $user = $username ? User::where('username', $username)->first() : Auth::user();
        return new UserCollection($user->friend);
    }

    function listFollowers( String $username = null ){
        $user = $username ? User::where('username', $username)->first() : Auth::user();
        return (new UserCollection($user->followers))->additional(
            [
                'mutual' => true
            ]
        );
    }

    public function notifications()
    {
        $user = auth()->user();

        $response = new NotificationCollection(
            UserNotification::with([
                'notifiable'
            ])->where('user_id', $user->id)
                ->orderBy('id', 'desc')->take(10)->get()
        );

        UserNotification::with('notifiable')->where('user_id', $user->id)->update([
            'viewed' => 1
        ]);

        return $response;
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
            'username' => 'unique:users|alpha_dash',
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

        return (new ResourceProfile($user))->additional(
            [ 'guest' => $username != null ]
        );
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function storeAva(Request $request){

        $this->validate($request, [
            'ava' => 'required|image|mimes:jpeg,jpg,gif,png|max:8000'
        ]);

        $response = '';
        $user = Auth::user();
        $profile = $user->profile;

        $ava = $request->file('ava');

        $image = Image::make($ava->getRealPath());

        $image->stream();
        $name = hash('sha256', str_random() . $image) .'.'. $ava->getClientOriginalExtension();
        $users_dir = "user-media/{$user->dir}/";

        Storage::disk('public')
            ->put("{$users_dir}original_{$name}", $image);

        if (!$request->get('cover', false))
        {
            // profile main image;
            $image->fit(200);
            $image->stream();

            Storage::disk('public')
                ->put("{$users_dir}200_{$name}", $image);

            $image->fit(50);
            $image->stream();

            Storage::disk('public')
                ->put("{$users_dir}50_{$name}", $image);

            $profile->ava = $name;
            $profile->save();

            $user->ava = "/storage/{$users_dir}50_{$name}";
            $user->save();

            $response = Storage::url("{$users_dir}200_{$name}");
        } else {
            $image->fit(1110,250);
            $image->stream();

            Storage::disk('public')
                ->put("{$users_dir}cover_{$name}", $image);

            $profile->cover = $name;
            $profile->save();

            $response = Storage::url("{$users_dir}cover_{$name}");
        }// end if

        return response($response);
    }

    /**
     * set Devices of Profile, User
     */
    public function setDevices(Request $request)
    {

        $profile = auth()->user()->profile;

        $options = [];

        if(!empty($profile->options))
        {
            $options = $profile->options;
            $options['devices'] = [];
        } // end if

        $available_devices = collect(config('profile.devices'));

        foreach($request->get('device', []) as $device_key)
        {
            if ($available_devices->where('key', $device_key)->count())
            {
                $options['devices'][] = array_merge(
                    $available_devices->where('key', $device_key)->first(),
                    [
                        'selected' => true,
                        'description' => $device_key === 'pc' ? $request->get('pc_description', '') : NULL
                    ]
                );
            } // end if
            
        } // end foreach

        $profile->options = json_encode($options);

        return response()->json([
            'saved' => $profile->save()
        ]);

    }
}

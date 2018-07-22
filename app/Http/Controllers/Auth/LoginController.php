<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function credentials(Request $request)
    {
        $credentials = $request->only($this->username(), 'password');
        // Customization: validate if client status is active (1)
        $credentials['validated'] = 1;
        return $credentials;
    }

    protected function authenticated(Request $request, $user)
    {
        // generate some random key
        // this key will be used for user validation
        // on socket communication on front-end
        // that key generate for every user session
        $str = str_random(31);

        $request->session()->put('user_communication_id', $str);
        $user = $request->user();
        $user->user_communication_id = $str;
        // store the key
        if($user->save()) {
            Redis::publish(config('database.redis.channel'), $str);
        }else{ // user should have a key
            Auth::logout();
        }
    }
}

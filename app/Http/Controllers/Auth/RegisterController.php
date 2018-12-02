<?php

namespace App\Http\Controllers\Auth;

use App\Entities\Profile;
use App\Jobs\SendWelcomeEmail;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'username' => str_slug($data['username']),
            'email' => $data['email'],
            'dir' => str_random(22),
            'email_verification_token' => sha1($data['email']),
            'password' => Hash::make($data['password']),
        ]);

        $profile = new Profile;
        $profile->user()->associate($user);
        $profile->save();

        return $user;
    }

    protected function registered(Request $request, $user)
    {
        Auth::logout();
        $this->dispatch(new SendWelcomeEmail($user));

        if($request->ajax()){
            return response()->json([
                'message' =>
                __('You are almost done! You be able to login after email confirmation. Thank you for registering!')
            ]);
        }

        return redirect(route('login'))
            ->with('status',__('Please check your email address'));
    }

    public function validateEmail($token){

        $user = User::where('email_verification_token',$token)
                ->where('validated', 0)
                ->first();

        if($user){
            $user->validated = 1;
            $user->save();
            return redirect(route('login'))
                ->with('status', __('Thank you! Your account successfully validated!'))
                ->withInput([
                    'email' => $user->email
                ]);
        } return redirect(route('login'))->with('status', __('Failed validate your email please contact us, for more details!'));
    }
}

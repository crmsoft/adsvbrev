<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Hash;
use Socialite;

use App\Http\Controllers\Controller;
use App\User;
use App\Entities\Profile;

class SocialeLoginController extends Controller
{

    public function redirectToProvider( string $social_name )
    {
        return Socialite::with($social_name)->redirect();
    }

    /**
     * @param string $social_name
     */
    public function handleProviderCallback( string $social_name, Request $request )
    {
        $social_account = Socialite::driver( $social_name )->user();

        $user = User::where('email', $social_account->getEmail())->first();

        if($user){
            Auth::login($user);
            return redirect(route('profile-view'));
        } else if ($social_name == 'twitch')
        {
            $user = User::create([
                'username' => str_slug($social_account->nickname),
                'email' => $social_account->email,
                'first_name' => $social_account->user['display_name'],
                'dir' => str_random(22),
                'validated' => 1,
                'ava' => $social_account->user['profile_image_url'],
                'email_verification_token' => sha1($social_account->email),
                'password' => Hash::make( str_random(12) ),
            ]);
    
            $profile = new Profile;
            $profile->ava = $social_account->user['profile_image_url'];
            $profile->user()->associate($user);
            $profile->save();

            Auth::login($user);
            return redirect(route('profile-view'));
        } // end if

        return redirect(route('register'))->withInput([
            'name' => $social_account->getName(),
            'email' => $social_account->getEmail()
        ]);
    }

    public function ts( Request $request )
    {
        \Log::debug(
            $request->all()
        );
        return $request->get('hub.challenge');
    }

}

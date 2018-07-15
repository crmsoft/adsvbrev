<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Socialite;

class SocialeLoginController extends Controller
{

    public function redirectToProvider( string $social_name )
    {
        return Socialite::with($social_name)->redirect();
    }

    /**
     * @param string $social_name
     */
    public function handleProviderCallback( string $social_name )
    {
        $social_account = Socialite::driver( $social_name )->user();

        $user = User::where('email', $social_account->getEmail())->first();

        if($user){
            Auth::login($user);
            return redirect(route('profile'));
        }

        return redirect(route('register'))->withInput([
            'name' => $social_account->getName(),
            'email' => $social_account->getEmail()
        ]);
    }

}

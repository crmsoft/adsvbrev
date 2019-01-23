<?php

namespace App\Http\Controllers\Chat;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MessengerController extends Controller
{
    /**
     * Toggle status of profile
     * 
     * @param Request $request
     * @return \Illuminate\Http\Response $response
     */
    public function status(Request $request)
    {
        $request->validate([
            'status' => 'required|in:online,offline,busy'
        ]);

        $user = auth()->user();

        $profile = $user->profile;
        $profile->m_status = $request->get('status');
        $profile->save();
    } // end status


    /**
     * Toggle status of sound from mute to unmute
     * 
     * @param Request $request
     * @return \Illuminate\Http\Response $response
     */
    public function sound(Request $request)
    {
        $request->validate([
            'sound' => 'required|in:on,off'
        ]);

        $user = auth()->user();

        $profile = $user->profile;
        $profile->m_sound = $request->get('sound');
        $profile->save();

    } // end sound
}

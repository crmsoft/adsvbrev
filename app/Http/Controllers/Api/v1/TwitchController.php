<?php 

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;

class TwitchController extends Controller{
    
    public function videoThumb(int $id)
    {
        $options = [
            'client_id' => env('TWITCH_CLIENT_ID')
        ];
        
        $twitchApi = new \TwitchApi\TwitchApi($options);
        $video = $twitchApi->getVideo($id);
        
        return response()->json(
            $video['preview'] ?? []
        );  
    } // end videoThumb

} // end class TwitchController
<?php 

namespace Modules\FindDudes\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

use Modules\FindDudes\Entities\Message;
use Modules\FindDudes\Entities\Subscription;
use App\Http\Resources\Chat\Dialog\ResourceMessage;
use App\Http\Resources\Chat\Dialog\MessageCollection;
use App\Entities\Game;
use Illuminate\Support\Facades\Redis;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Media;

class MessageController extends Controller {

    static $PER_PAGE = 15;

    /**
     * Get last messages
     * 
     * @return Response
     */
    public function index(Request $request, Game $game, ?string $last_id = null)
    {
        $user = auth()->user();

        // make sure user gamer
        $user->games()->where('groups.id', $game->id)->firstOrFail();

        if ($request->has('page-id')) {
            Redis::publish(config('app.pub-sub-channel'), json_encode([
                'action' => 'sub-find-dudes',
                'target' => $game->slug,
                'user' => $user->id,
                'page' => $request->get('page-id')
            ]));

            Subscription::where([
                'user_id' => $user->id,
                'token' => $request->get('page-id')
            ])->delete();  

            $subscription = Subscription::firstOrNew([
                'user_id' => $user->id,
                'game_id' => $game->id,
                'token' => $request->get('page-id')
            ]);

            $subscription->touch();
        } // end if 

        $query = Message::where('game_id', $game->id)
        ->orderBy('id', 'desc')    
        ->take(self::$PER_PAGE);

        if ($last_id) {
            $last_id = \Hashids::decode($last_id);
            if (!empty($last_id)) {
                $query->where('id', '<', end($last_id));
            } // end if
        } // end if

        $messages = $query->get();

        return (new MessageCollection(
            $messages
        ))->additional([
            'more' => $messages->count() === self::$PER_PAGE
        ]);
    }

    /**
     * Store user message to the room
     * 
     * @param Request $request
     * 
     * @return Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required',
            'channel' => 'required',
            'file' => ['image', 'mimes:jpeg,jpg,gif,png', 'max:8000']
        ]);

        $user = auth()->user();

        if($game = $user->games()->where('slug', $request->channel)->first())
        {

            $message = new Message;
            $message->message = $request->message;
            $message->user()->associate($user);
            $message->game()->associate($game);
            $message->save();

            if ($request->hasFile('file')) {
                $media = $request->file('file');
    
                $image = Image::make($media->getRealPath());
    
                $image->stream();
                $name = hash('sha256', str_random() . $image) .'.'. $media->getClientOriginalExtension();
                $users_dir = "user-media/{$user->dir}/";
    
                Storage::disk('public')
                    ->put("{$users_dir}original_{$name}", $image);
                // profile main image;
                $image->resize(200, 120, function($constraint) {
                    $constraint->aspectRatio();
                });
                $image->stream();
    
                Storage::disk('public')
                    ->put("{$users_dir}chat_{$name}", $image);
    
                $media = new Media;
                $media->path = $name;
                $media->options = [
                    'chat' => [
                        'width' => $image->width(),
                        'height' => $image->height()  
                    ]
                ];
                $media->mediable()->associate($message);
                $media->user()->associate($user);
                $media->save();
    
            } // end if

            return new ResourceMessage($message);
        } // end if

        return response('Conversation is not found', 404);
    }
}

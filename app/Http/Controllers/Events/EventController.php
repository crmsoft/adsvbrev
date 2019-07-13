<?php

namespace App\Http\Controllers\Events;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

use \App\Http\Controllers\Controller;
use App\Http\Resources\Events\EventCollection;
use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\Events\EventResource;
use App\Http\Resources\Events\Event as StoreEventResponse;
use App\Entities\Event;

class EventController extends Controller
{
    public function list()
    {
        $user = auth()->user();

        $events = $user->events()->get();

        return new EventCollection($events);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'          => ['required', 'min:3'],
            'description'   => ['required', 'min:10'],

            'related'       => ['required'],
            
            'ava'           => ['required'],
            'poster'        => ['required'],
            
            'start'         => ['required', 'date']
        ]);

        $user = auth()->user();

        $data = $request->except(['_token', 'ava', 'poster']);

        $data['creator_id'] = $user->id;

        $event = new Event();

        $event->fill($data);
        $event->is_private = $request->get('is_private') == 'true';
        $event->start = Carbon::parse($request->start)->timestamp;

        $event->save();

        // attach related games
        $event->games()->attach(collect(explode(',', $request->related))->map(function($id) {
            return \Hashids::decode($id)[0];
        }));

        // save avatar
        $media = $request->file('ava');

        $image = Image::make($media->getRealPath());

        $image->stream();
        $name = hash('sha256', str_random() . $image) .'.'. $media->getClientOriginalExtension();
        $users_dir = "user-media/{$user->dir}/events/{$event->id}";

        Storage::disk('public')
                        ->put("{$users_dir}/original_{$name}", $image);

        // profile main image;
        $image->fit(200);
        $image->stream();

        Storage::disk('public')
                    ->put("{$users_dir}/200_{$name}", $image);

        $event->ava = "public/{$users_dir}/200_{$name}";

        // save poster
        $media = $request->file('poster');

        $image = Image::make($media->getRealPath());

        $image->stream();
        $name = hash('sha256', str_random() . $image) .'.'. $media->getClientOriginalExtension();
        $users_dir = "user-media/{$user->dir}/events/{$event->id}";

        $image->fit(1110,250);
        $image->stream();

        Storage::disk('public')
                    ->put("{$users_dir}/{$name}", $image);

        $event->poster = "public/{$users_dir}/{$name}";

        $event->save();

        return new StoreEventResponse($event);
    }

    /**
     * Update Event Resource
     * 
     * @param Request $request
     * @param Event $event
     * 
     * @return int
     */
    public function update(Request $request, Event $event)
    {
        // validate request
        $request->validate([
            'name'          => ['required', 'min:3'],
            'description'   => ['required', 'min:10'],

            'related'       => ['required'],
            
            'ava'           => ['image'],
            'poster'        => ['image'],
            
            'start'         => ['required', 'date']
        ]);

        $user = auth()->user();

        // set fillable attributes 
        $event->fill($request->all());

        // mark event is private
        $event->is_private = $request->get('is_private') == 'true';

        // attach related games
        $event->games()->sync(collect(explode(',', $request->related))->map(function($id) {
            return \Hashids::decode($id)[0];
        }));

        // save Avatar
        if ($request->hasFile('ava'))
        {
            $media = $request->file('ava');

            $image = Image::make($media->getRealPath());

            $image->stream();
            $name = hash('sha256', str_random() . $image) .'.'. $media->getClientOriginalExtension();
            $users_dir = "user-media/{$user->dir}/events/{$event->id}";

            Storage::disk('public')
                        ->put("{$users_dir}/original_{$name}", $image);

            // profile main image;
            $image->fit(200);
            $image->stream();

            Storage::disk('public')
                        ->put("{$users_dir}/200_{$name}", $image);

            $event->ava = "public/{$users_dir}/200_{$name}";
        } // end if

        // save Cover
        if ($request->hasFile('poster'))
        {
            // save poster
            $media = $request->file('poster');

            $image = Image::make($media->getRealPath());

            $image->stream();
            $name = hash('sha256', str_random() . $image) .'.'. $media->getClientOriginalExtension();
            $users_dir = "user-media/{$user->dir}/events/{$event->id}";

            $image->fit(1110,250);
            $image->stream();

            Storage::disk('public')
                        ->put("{$users_dir}/{$name}", $image);

            $event->poster = "public/{$users_dir}/{$name}";
        } // end if

        // update resource
        $event->save();

        return 1;
    } // end @update

    public function listDay(int $timestamp)
    {
        $date = Carbon::createFromTimestamp($timestamp / 1000);
        $user = auth()->user();

        return new EventCollection($user->events($date)->whereDate('events.start', $date)->get());
    } // end list

    /**
     * @param Event $event
     * 
     * @return Response
     */
    public function show(Event $event)
    {
        return new EventResource($event);
    }

    /**
     * @param Event $event
     * 
     * @return Response
     */
    public function join(Event $event)
    {
        $user = auth()->user();
        return $event->participants()->attach($user);
    }

    /**
     * @param Event $event
     * 
     * @return Response
     */
    public function leave(Event $event)
    {
        $user = auth()->user();
        return $event->participants()->detach($user);
    }

    public function listPartipicants(Event $event)
    {
        return new UserCollection(
            $event->participants
        );
    }
}

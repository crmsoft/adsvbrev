<?php

namespace App\Http\Controllers\Events;

use Illuminate\Http\Request;

use \App\Http\Controllers\Controller;
use App\Http\Resources\Events\EventCollection;
use App\Entities\Event;

class EventController extends Controller
{
    public function list()
    {
        $user = auth()->user();

        $events = Event::leftJoin('user_friends', function($query)  use ($user) {
                    $query->on(function ($query) use($user) {
                        $query->on('user_friends.friend_id', '=', 'events.creator_id');
                        $query->on('user_friends.status', '=', \DB::raw("'friend'"));
                        $query->on('user_friends.user_id', '=', \DB::raw($user->id));
                    });
                })
                ->whereNull('events.deleted_at')
                ->whereNull('user_friends.deleted_at')
                ->orWhere(function ($query) use ($user) {
                    $query->orWhere('events.creator_id','=', $user->id);
                })
                ->select(['events.*'])
                ->get();

        return new EventCollection($events);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'          => ['required', 'min:3'],
            'description'   => ['required', 'min:10'],
            
            'ava'           => ['required'],
            'poster'        => ['required'],
            
            'start'         => ['required', 'date']
        ]);

        $user = auth()->user();

        $data = $request->except(['_token', 'ava', 'poster']);

        $data['creator_id'] = $user->id;

        $event = new Event();
        $event->fill($data);

        $event->save();

        $event->poster = $request->file('poster')->store($user->dir . '/events/' . $event->id);
        $event->ava = $request->file('ava')->store($user->dir . '/events/' . $event->id);

        return $event->save() ? 1:0;
    }
}

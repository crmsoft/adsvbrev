<?php

namespace App\Http\Controllers\Events;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

use \App\Http\Controllers\Controller;
use App\Http\Resources\Events\EventCollection;
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

    public function show(int $timestamp)
    {
        $date = Carbon::createFromTimestamp($timestamp / 1000);
        $user = auth()->user();

        return new EventCollection($user->events($date)->whereDate('events.start', $date)->get());
    } // end show
}

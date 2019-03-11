<?php

namespace App\Http\Controllers\Events;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

use \App\Http\Controllers\Controller;
use App\Http\Resources\Events\EventCollection;
use App\Http\Resources\UserList\UserCollection;
use App\Http\Resources\Events\EventResource;
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

        $event->poster = $request->file('poster')->store('public/user-media/' . $user->dir . '/events/' . $event->id);
        $event->ava = $request->file('ava')->store('public/user-media/' . $user->dir . '/events/' . $event->id);

        return $event->save() ? 1:0;
    }

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

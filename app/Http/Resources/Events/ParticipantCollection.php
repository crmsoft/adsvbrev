<?php

namespace App\Http\Resources\Events;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ParticipantCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(function($u) {
            return [
                'full_name' => $u->full_name,
                'first_name' => $u->first_name,
                'username' => $u->username,
                'ava' => $u->ava,
                'type' => $u->pivot->type ?? 'attends'
            ];
        });
    }
}
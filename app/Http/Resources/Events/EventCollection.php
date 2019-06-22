<?php

namespace App\Http\Resources\Events;

use Illuminate\Http\Resources\Json\ResourceCollection;

use App\Http\Resources\Media\ResourceMedia;

class EventCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(function( $event ) {
            return new Event($event);
        });
    }
}
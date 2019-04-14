<?php

namespace App\Http\Resources\TwitchStreams;

use Illuminate\Http\Resources\Json\ResourceCollection;

use App\Http\Resources\Media\ResourceMedia;

class StreamCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
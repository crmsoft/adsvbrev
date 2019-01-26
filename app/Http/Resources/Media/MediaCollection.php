<?php

namespace App\Http\Resources\Media;

use Illuminate\Http\Resources\Json\ResourceCollection;

use App\Http\Resources\Media\ResourceMedia;

class MediaCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(function($media){
            return new ResourceMedia($media);
        });
    }
}
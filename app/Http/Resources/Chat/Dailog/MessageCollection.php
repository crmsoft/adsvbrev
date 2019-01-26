<?php

namespace App\Http\Resources\Chat\Dialog;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MessageCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(
            function($message){
                return new ResourceMessage($message);
            }
        );
    }
}
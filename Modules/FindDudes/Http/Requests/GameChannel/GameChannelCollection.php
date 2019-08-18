<?php

namespace Modules\FindDudes\Http\GameChannel;

use Illuminate\Http\Resources\Json\ResourceCollection;

class GameChannelCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(function ($channel) {
            return new GameChannelResource($channel);
        });
    }
}
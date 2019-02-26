<?php

namespace App\Http\Resources\Events;

use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->hash,
            'type' => 'dudes',
            'name' => $this->name,
            'description' => $this->description,
            'start' => $this->start->format('Y-m-d')
        ];
    }
}
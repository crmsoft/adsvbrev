<?php

namespace App\Http\Resources\Events;

use Illuminate\Http\Resources\Json\JsonResource;

class Event extends JsonResource
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
            'username' => '',
            'full_name' => $this->name,
            'start' => $this->start->format('Y-m-d'),
            'ava' => url(\Storage::url($this->ava)),
        ];
    }
}
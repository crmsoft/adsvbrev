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
            'type' => 'dudes',
            'description' => $this->description,
            'full_name' => $this->name,
            'name' => $this->name,
            'start' => $this->start->format('Y-m-d'),
            'start_human' => $this->start->format('d M, Y'),
            'ava' => url(\Storage::url($this->ava)),
            'owner' => [
                'username' => $this->user->username,
                'full_name' => $this->user->full_name
            ] 
        ];
    }
}
<?php

namespace App\Http\Resources\Group;

use Illuminate\Http\Resources\Json\JsonResource;


class PrivateGroupResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = auth()->user();

        return  [
            'id' => $this->slug,
            'ava' => url(\Storage::url($this->ava)),
            'name' => $this->name,
            'poster' => url(\Storage::url($this->poster)),
            'total_participant' => $this->participants->count(),
            'description' => $this->options['description'] ?? '',
            'related' => new GroupCollection($this->related_groups)
        ];
    }
}
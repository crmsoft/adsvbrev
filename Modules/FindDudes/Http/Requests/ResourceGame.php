<?php

namespace Modules\FindDudes\Http\Requests;

use Illuminate\Http\Resources\Json\JsonResource;

class ResourceGame extends JsonResource
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
            'id' => \Hashids::encode($this->id),
            'channel' => $this->slug,
            'participant_count' => $this->participants->count(),
            'name' => $this->name,
            'ava' => url(\Storage::url($this->ava)),
            'poster' => url(\Storage::url($this->poster)),
            'total_sub_channel' => $this->subChannels()->count()
        ];
    }
}

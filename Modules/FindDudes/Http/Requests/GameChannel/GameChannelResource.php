<?php

namespace Modules\FindDudes\Http\GameChannel;

use Illuminate\Http\Resources\Json\JsonResource;

class GameChannelResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $in_user_count = $this->participants->count();

        return [
            'id' => \Hashids::encode($this->id),
            'channel' => $this->channel,
            'full' => $this->quota == $in_user_count,
            'users_in' => $in_user_count
        ];
    }
}
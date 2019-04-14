<?php

namespace App\Http\Resources\TwitchStreams;

use Illuminate\Http\Resources\Json\JsonResource;

class Stream extends JsonResource
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
            'thumb' => str_replace(['{width}','{height}'],[205,115],$this->resource['thumbnail_url']),
            'username' => $this->resource['username'],
            'user_name' => $this->resource['user_name'],
            'watching' => $this->resource['viewer_count'],
            'title' => $this->resource['title']
        ];
    }
}
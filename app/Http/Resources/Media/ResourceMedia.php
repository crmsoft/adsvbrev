<?php

namespace App\Http\Resources\Media;

use Illuminate\Http\Resources\Json\JsonResource;

class ResourceMedia extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $full_path = $this->full_path;

        if ($this->mediable_type == 'App\Message')
        {
            $full_path = asset( '/storage/user-media/' . $this->user->dir . '/chat_' . $this->path);
        } // end if

        return [
            'full_path' => $full_path,
            'options' => $this->options
        ];
    }
}

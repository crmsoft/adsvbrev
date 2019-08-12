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
        $thumb = null;

        if ($this->mediable_type == 'App\Message' || $this->mediable_type == 'Modules\FindDudes\Entities\Message')
        {
            $full_path = asset( '/storage/user-media/' . $this->user->dir . '/original_' . $this->path);
            $thumb = asset( '/storage/user-media/' . $this->user->dir . '/chat_' . $this->path);
        } else if ($this->mediable_type == 'App\Entities\Game') {
            $full_path = $this->path;
        }  else if ($this->mediable_type == 'App\Entities\Comment') {
            $full_path = asset( '/storage/user-media/' . $this->user->dir . '/original_' . $this->path);
            $thumb = asset( '/storage/user-media/' . $this->user->dir . '/520_' . $this->path);
        } else if ($this->mediable_type == 'App\Post') {
            $full_path = asset( '/storage/user-media/' . $this->user->dir . '/original_' . $this->path);
            $thumb = asset( '/storage/user-media/' . $this->user->dir . '/520_' . $this->path);
        } else {
            $full_path = $this->full_path;
        }// end if

        return [
            'full_path' => $full_path,
            'options' => $this->options ?? [],
            'thumb' => $thumb
        ];
    }
}

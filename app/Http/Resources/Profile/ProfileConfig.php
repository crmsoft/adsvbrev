<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\UserList\User;
use App\Http\Resources\Media\MediaCollection;
use App\Http\Resources\Comment\CommentCollection;

class ProfileConfig extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user_devices = [];
        if (isset($this->options) && isset($this->options['devices']))
        {
            $user_devices = $this->options['devices'];
        } // end if

        return [
            'main_photo' => $this->main_photo,
            'cover' => $this->cover ? \Storage::url("user-media/{$this->user->dir}/cover_{$this->cover}") : null, 
            'user' => $this->user,
            'about' => $this->about,
            'dob' => $this->dob,
            'timezone' => $this->timezone,
            'gender' => $this->gender,
            'phone' => $this->phone,
            'devices' => config('profile.devices'),
            'user_devices' => $user_devices,
        ];
    }
}

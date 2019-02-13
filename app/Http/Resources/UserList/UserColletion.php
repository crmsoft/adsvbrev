<?php

namespace App\Http\Resources\UserList;

use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $ad = $this->additional;
        return $this->collection->map(function($u) use ($ad) {
            return (new User($u))->additional($ad);
        });
    }
}
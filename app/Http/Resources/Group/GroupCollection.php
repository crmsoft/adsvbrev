<?php

namespace App\Http\Resources\Group;

use Illuminate\Http\Resources\Json\ResourceCollection;

use App\Http\Resources\Media\ResourceMedia;

class GroupCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        
        if (isset($this->additional['type']) && $this->additional['type'] == 'manager')
        {
            return $this->collection->map(function($group) {
                return new ManagerGroup($group);
            });
        } // end if

        return parent::toArray($request);
    }
}
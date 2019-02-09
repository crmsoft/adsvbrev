<?php

namespace App\Http\Resources\Comment;

use Illuminate\Http\Resources\Json\ResourceCollection;

use App\Http\Resources\Comment\ResourceComment;

class CommentCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(function($comment){
            return new ResourceComment($comment);
        })->reverse();
    }
}
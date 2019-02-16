<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class UserNotification extends Model
{
    

    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }

    public function target()
    {
        switch($this->type)
        {
            case 'like' : {
                
                $like = $this->hasOne(
                    \App\Like::class,
                    'id',
                    'target_id'
                )->first();

                $this->target_id = $like->likeable_id;

                return $this->hasOne(
                    $like->likeable_type,
                    'id',
                    'target_id'
                );
            }
        }
    }
}

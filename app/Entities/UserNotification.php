<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class UserNotification extends Model
{
    /**
     * The person that receives notification
     * 
     * @return Relationship
     */
    public function user() : BelongsTo
    {
        return $this->belongsTo(\App\User::class);
    }

    /**
     * The notification related Model
     * 
     * @return Relationship
     */
    public function notifiable() : MorphTo
    {
        return $this->morphTo();
    }

    public function getMessageAttribute()
    {
        if ($this->notifiable_type == Invitation::class)
        {   
            $invitation = $this->notifiable;

            return $invitation->initiator->full_name . 
                    ' Invites you to join an event. ' . 
                    $invitation->to->name;
        } // end if 

        return 'Not known...';
    }
}

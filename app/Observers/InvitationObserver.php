<?php

namespace App\Observers;

use App\Entities\UserNotification;
use App\Entities\Invitation;

class InvitationObserver
{
    /**
     * Handle the comment "created" event.
     *
     * @param  \App\Entities\Invitation  $invitation
     * 
     * @return void
     */
    public function created(Invitation $invitation)
    {
        $not = new UserNotification;
        $not->notifiable()->associate($invitation);
        $not->user()->associate($invitation->user);
        $not->save();
    }
}

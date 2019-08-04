<?php

namespace App\Observers;

use App\Entities\UserNotification;
use Illuminate\Support\Facades\Redis;

class UserNotificationObserver
{
    /**
     * Handle the comment "created" event.
     *
     * @param  \App\UserNotification  $notification
     * @return void
     */
    public function created(UserNotification $notification)
    {
        // in app notification trigger
        if ($notification->user->user_communication_id > 0) {
            Redis::publish(config('app.pub-sub-channel'), json_encode([
                'action' => 'notification',
                'target' => $notification->user->id
            ]));
        } // end if
    }

    /**
     * Handle the UserNotification "updated" event.
     *
     * @param  \App\UserNotification  $UserNotification
     * @return void
     */
    public function updated(UserNotification $notification)
    {
        //
    }

    /**
     * Handle the UserNotification "deleted" event.
     *
     * @param  \App\UserNotification  $notification
     * @return void
     */
    public function deleted(UserNotification $notification)
    {
        //
    }

    /**
     * Handle the comment "restored" event.
     *
     * @param  \App\UserNotification  $notification
     * @return void
     */
    public function restored(UserNotification $notification)
    {
        //
    }

    /**
     * Handle the comment "force deleted" event.
     *
     * @param  \App\UserNotification  $notification
     * @return void
     */
    public function forceDeleted(UserNotification $notification)
    {
        //
    }
}

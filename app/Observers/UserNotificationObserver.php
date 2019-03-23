<?php

namespace App\Observers;

use App\Entities\UserNotification;

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
        file_put_contents('/tmp/.notreciever', $notification->user_id);
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

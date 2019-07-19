<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use DB;
use Log;

use App\Entities\Comment;
use App\Entities\UserNotification;
use App\Entities\Invitation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        Comment::observe(\App\Observers\CommentObserver::class);
        Invitation::observe(\App\Observers\InvitationObserver::class);
        UserNotification::observe(\App\Observers\UserNotificationObserver::class);
        // DB::listen(function($query) {
        //     Log::info(
        //         $query->sql,
        //         $query->bindings,
        //         $query->time
        //     );
        // });

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}

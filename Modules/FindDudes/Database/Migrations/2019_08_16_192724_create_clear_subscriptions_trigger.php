<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateClearSubscriptionsTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
        CREATE TRIGGER clear_channel_subscription AFTER UPDATE ON `users` FOR EACH ROW
            BEGIN
                IF(new.user_communication_id is NULL) THEN
                    delete from find_dudes_subscriptions where user_id = new.id;
                END IF;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER `clear_channel_subscription`');
    }
}

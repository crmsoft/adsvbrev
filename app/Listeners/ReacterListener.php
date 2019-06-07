<?php

namespace App\Listeners;

use \Cog\Laravel\Love\Reaction\Events\ReactionHasBeenAdded;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use \App\Entities\UserNotification;

class ReacterListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ReactionHasBeenAdded  $event
     * @return void
     */
    public function handle(ReactionHasBeenAdded $event)
    {
        $reaction = $event->getReaction();
        $reactant = $reaction->getReactant();
        $target = $reactant->reactable;

        $n = new UserNotification;
        $n->notifiable()->associate($reactant);
        $n->target_id = $reaction->id;
        
        if ($reactant->type == 'App\\Post')
        {
            $n->user()->associate(
                $target->user
            );
        } else if ($reactant->type == 'App\Entities\Comment')
        {
            $n->user()->associate(
                $target->creator
            );
        } else {return;} // end if

        $n->save();
    }
}

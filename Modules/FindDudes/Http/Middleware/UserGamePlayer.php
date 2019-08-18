<?php

namespace Modules\FindDudes\Http\Middleware;

use Closure;

class UserGamePlayer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $user = $request->user();
        $route = $request->route();

        $game = $route->parameter('game');

        if ($user->games()->where('groups.id', $game->id)->count() == 0) {
            abort(404);
        } // end if

        return $next($request);
    }
}

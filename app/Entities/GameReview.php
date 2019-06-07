<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Cog\Laravel\Love\Reactable\Models\Traits\Reactable;
use Cog\Contracts\Love\Reactable\Models\Reactable as ReactableContract;

class GameReview extends Model implements ReactableContract
{
    use SoftDeletes, Reactable;

    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($value)
    {
        $value = \Hashids::decode($value);
        return $this->where($this->getRouteKeyName(), $value)->first();
    }

    public function game()
    {
        return $this->belongsTo(Game::class, 'group_id');
    }

    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }
}

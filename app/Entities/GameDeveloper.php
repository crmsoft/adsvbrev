<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GameDeveloper extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'options'
    ];

    protected $casts = [
        'options' => 'array'
    ];

    public function games()
    {
        return $this->hasMany(\App\Entities\Game::class);
    }
}

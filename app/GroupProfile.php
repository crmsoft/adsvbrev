<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GroupProfile extends Model
{
    use SoftDeletes;

    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
        'deleted_at',
        'group_id'
    ];
}

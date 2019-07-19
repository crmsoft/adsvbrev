<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Invitation extends Model
{
    /** @var string $table_name */
    protected $table = 'user_invitations';

    /**
     * Relationship with User
     * The user that should receive an invitation
     * 
     * @return Relationship
     */
    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }

    /**
     * Relationship with User
     * The User that creates an invitation
     * 
     * @return Relationship
     */
    public function initiator()
    {
        return $this->belongsTo(\App\User::class, 'initiator_id');
    }

    /**
     * Generic relationship for Group, Event
     * 
     * @return Relationship
     */
    public function to()
    {
        return $this->morphTo();
    }

    /**
     * Relationship with notifications
     * 
     * @return MorphTo relationship 
     */
    public function notifiable() : MorphTo
    {
        return $this->morphTo();
    }
}


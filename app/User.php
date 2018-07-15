<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'last_name', 'unique', 'email', 'password',
    ];

    /**
     * @var array
     */
    protected $appends = [
        'full_name'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'user_communication_id', 'updated_at', 'created_at', 'email'
    ];

    public function getFullNameAttribute(){
        return $this->name . ' ' . $this->last_name;
    }

    public function conversations(){
        return $this->hasMany('\App\UserConversation');
    }
}

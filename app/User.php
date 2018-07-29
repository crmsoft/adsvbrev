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
        'name', 'last_name', 'unique', 'email', 'password', 'email_verification_token'
    ];

    /**
     * @var array
     */
    protected $appends = [
        'full_name',
        'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'user_communication_id',
        'updated_at',
        'created_at',
        'email',
        'id',
        'email_verification_token',
        'validated'
    ];

    public function getFullNameAttribute(){
        return $this->name . ' ' . $this->last_name;
    }

    public function getStatusAttribute(){
        return !empty($this->user_communication_id);
    }

    public function conversations(){
        return $this->hasMany('\App\UserConversation');
    }

    public function media(){
        return $this->hasMany(Media::class);
    }

    public function profile(){
        return $this->hasOne(Profile::class)->withDefault([
            'ava' => 'http://via.placeholder.com/160/95a/fff?text=?'
        ]);
    }
}

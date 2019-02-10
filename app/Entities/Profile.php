<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Profile extends Model
{
    protected $hidden = [
        'created_at',
        'updated_at',
        'user_id',
        'id',
        'pivot'
    ];

    protected $appends = [
        'main_photo',
        'list_photo'
    ];

    protected $fillable = [
        'dob',
        'gender',
        'phone',
        'timezone',
        'about',
        'm_sound',
        'm_status'
    ];

    protected $dates = [
        'dob'
    ];

    public function getOptionsAttribute($value)
    {
        return @json_decode($value, true);
    }
     
    public function getDobAttribute( $dob ){
        return $dob ? date('Y-m-d', strtotime($dob)) : '0000-00-00';
    }

    public function getMainPhotoAttribute(){
        // TODO: remove code below 1
        if( strpos($this->ava, 'https') !== false ){
            return $this->ava;
        }

        return $this->user ? Storage::url("user-media/{$this->user->dir}/200_{$this->ava}") : "200_{$this->ava}";
    }

    public function getListPhotoAttribute(){

        // TODO: remove code below 1
        if( strpos($this->ava, 'https') !== false ){
            return $this->ava;
        }

        return $this->user ? Storage::url("user-media/{$this->user->dir}/50_{$this->ava}") : "50_{$this->ava}";
    }

    public function user(){
        return $this->belongsTo(\App\User::class);
    }
}

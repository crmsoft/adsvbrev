<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Entities\Profile;
use \App\Entities\Group;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Facades\JWTAuth;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    const STATUS_SUBSCRIBE = 'subscribe';
    const STATUS_FRIEND = 'friend';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'unique',
        'email',
        'username',
        'password',
        'email_verification_token'
    ];

    /**
     * @var array
     */
    protected $appends = [
        'full_name',
        'status',
        'has_status'
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
        //'id',
        'email_verification_token',
        'validated',
        'pivot',
        'dir'
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'user' => [
                'username' => $this->username,
                'id' => $this->id
            ]
        ];
    }

    public function jwt(){
        return JWTAuth::fromUser($this);
    }

    public function getHasStatusAttribute(){

        $user = auth()->user();

        if($this->id != $user->id)
        {
            if($user->subscribers()->where('friend_id', $this->id)->count())
                return 'subscribed';

            if($user->followers()->where('user_id', $this->id)->count())
                return 'following';

            if($this->friend()->where('friend_id', $user->id)->count())
                return 'friends';
        } // end if 

        return 'none';
    }

    public function getFullNameAttribute(){
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getStatusAttribute(){
        return $this->user_communication_id == 0 ? 'offline' : $this->profile->m_status;
    }

    public function chat()
    {
        return $this->hasManyThrough(
            Conversation::class,
            UserConversation::class,
            'user_id',
            'id',
            'id',
            'conversation_id'
        );
    }

    public function media()
    {
        return $this->hasMany(Media::class);
    }

    public function profile()
    {
        return $this->hasOne(Profile::class)->withDefault([
            'ava' => 'http://via.placeholder.com/160/95a/fff?text=?'
        ]);
    }

    public function friend()
    {
        return $this->hasManyThrough(
            User::class,
            UserFriends::class,
            'user_id',
            'id',
            'id',
            'friend_id'
        )->where('status', self::STATUS_FRIEND);
    }

    public function subscribers()
    {
        return $this->hasManyThrough(
            User::class,
            UserFriends::class,
            'user_id',
            'id',
            'id',
            'friend_id'
        )->where('status', self::STATUS_SUBSCRIBE);
    }

    public function followers()
    {
        return $this->hasManyThrough(
            User::class,
            UserFriends::class,
            'friend_id',
            'id',
            'id',
            'user_id'
        )->where('status', self::STATUS_SUBSCRIBE);
    }


    public function group(){
        return $this->belongsToMany(Group::class, 'user_group', 'user_id', 'group_id')
            ->where('status', Group::STATUS_JOINED);
    }

    public function feed(){
        return $this->hasMany(Post::class)->where('type', 'feed');
    }
}

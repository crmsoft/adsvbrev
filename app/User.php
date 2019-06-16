<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Cog\Contracts\Love\Reacterable\Models\Reacterable as ReacterableContract;
use Cog\Laravel\Love\Reacterable\Models\Traits\Reacterable;

use App\Entities\Profile;
use \App\Entities\Group;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Facades\JWTAuth;

class User extends Authenticatable implements JWTSubject, ReacterableContract
{
    use Notifiable, Reacterable;

    const STATUS_SUBSCRIBE = 'subscribe';
    const STATUS_FRIEND = 'friend';
    const STATUS_DECLINED = 'declined';

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
        'ava',
        'validated',
        'dir',
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

    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function getRouteKeyName()
    {
        return 'username';
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
        )->orderBy('updated_at', 'desc');
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

    /**
     * Join users with friends
     * 
     * @return Builder 
     */
    public function getMutualFriendsOf( int $user_id )
    {
        $self_id = $this->id;
        return self::join(\DB::raw("(SELECT 
                            t1.friend_id
                        FROM
                            (SELECT 
                            friend_id
                        FROM
                            user_friends
                        WHERE
                            user_id = $self_id AND status = 'friend'
                                AND deleted_at IS NULL) AS t1
                        JOIN (SELECT 
                            friend_id
                        FROM
                            user_friends
                        WHERE
                            user_id = $user_id AND status = 'friend'
                                AND deleted_at IS NULL) AS t2 ON t2.friend_id = t1.friend_id) AS tt"), 'tt.friend_id', '=', 'users.id');
    } // end getMutualFriendsAttribute

    public function group(){
        return $this->belongsToMany(Group::class, 'user_groups', 'user_id', 'group_id');
    }

    public function feed(){
        return $this->morphToMany(Post::class, 'postable')->withTimestamps();
    }

    public function events( $date = null)
    {
        $user = $this;

        $user_friends_events = Entities\Event::join('user_friends', 
                                function($query) use ($user) {
                                    $query->on('user_friends.friend_id', 'events.creator_id');
                                    $query->on('user_friends.user_id', '=', \DB::raw($user->id));
                                })->select(['events.*']);

        if ($date)
        {
            $user_friends_events->whereDate('start', $date);
        } // end if

        $user_events = Entities\Event::where('creator_id', $user->id)
                        ->union($user_friends_events);
                   
        if ($date)
        {
            $user_events->whereDate('start', $date);
        } // end if

        return $user_events;
    }

    public function event()
    {
        return $this->hasMany(Entities\Event::class, 'creator_id');
    }
}

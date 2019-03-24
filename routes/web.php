<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/** validate email address of newly registered user */
Route::get('/validate/{token}', 'Auth\RegisterController@validateEmail')
    ->name('account.validation')
    ->middleware(['guest']);

// Lara Auth Routes
//---------------------------------------------------------------------------------
Auth::routes();

// Application main routes that handled by react route, only get req's
//=================================================================
Route::group([
    'namespace' => 'Profile',
    'middleware' => [ 'auth' ]
], function(){
    Route::get('/', 'ProfileController@index')->name('profile-view');
    Route::get('/gg/{user_unique}', 'ProfileController@index')->name('user-profile');
    Route::get('/search', 'ProfileController@index')->name('search-view');
    Route::get('/settings', 'ProfileController@index')->name('settings-view');
    Route::get('/schedule', 'ProfileController@index')->name('schedule-view');
    Route::get('/event/{id}', 'ProfileController@index')->name('event-page');
    Route::get('/dudes', 'ProfileController@index')->name('dudes-page');
    Route::get('/feed', 'ProfileController@index')->name('feed-page');
});

// Profile Specific Routes
//---------------------------------------------------------------------------------
Route::group([
    'namespace' => 'Profile',
    'middleware' => [ 'auth' ]
], function (){

    // User profile page
    Route::get('/get/profile/{username?}', 'ProfileController@profile')->name('get-profile');
    Route::post('/profile', 'ProfileController@getUser')->name('get-user');
    Route::post('/profile/ava', 'ProfileController@storeAva')->name('upload-avatar');
    Route::get('/friend/list/{username?}', 'ProfileController@listFriends')->name('list-fo-friends');
    Route::get('/followers/list/{username?}', 'ProfileController@listFollowers')->name('list-fo-friends');
    Route::get('/group/list/{group?}', 'ProfileController@listGroups')->name('list-fo-groups');
    Route::get('/notification/list', 'ProfileController@notifications')->name('list-fo-friends');

    Route::post('/settings','ProfileController@update')->name('edit-profile');

    Route::post('/setting/devices', 'ProfileController@setDevices')->name('settings-set-devices');

    Route::get('/feed/index', 'FeedController@index')->name('feed-list');
    Route::post('/feed/more', 'FeedController@more')->name('feed-load-more');

});

// Post Specific Routes
//---------------------------------------------------------------------------------
Route::group([
    // 'namespace' => '\Profile',
    'middleware' => [ 'auth' ]
], function (){

    // User profile page
    Route::post('/post/store', 'PostController@store')->name('store-post');
    Route::post('/post/like/{post}', 'PostController@toggleLike')->name('toggle-like-post');
    Route::post('/post/share/{post}', 'PostController@toggleShare')->name('toggle-share-post');
    Route::post('/post/delete/{post}', 'PostController@deletePost')->name('delete-post');
    Route::post('/post/more/{username?}', 'PostController@loadMore')->name('loade-more-posts');
});

// Comment Specific Routes
//---------------------------------------------------------------------------------
Route::group([
    // 'namespace' => '\Profile',
    'middleware' => [ 'auth' ]
], function (){

    // User profile page
    Route::post('/comment/store/{post}/{comment?}', 'CommentController@store')->name('store-comment');
    Route::post('/comment/more/{post}/{comment?}', 'CommentController@loadMore')->name('list-more');
    Route::post('/comment/like/{comment}', 'CommentController@toggleLike')->name('toggle-like-comment');
    Route::post('/comment/delete/{comment}', 'CommentController@delete')->name('delete-comment');

});

// Events Specific Routes
//---------------------------------------------------------------------------------
Route::group([
    'namespace' => 'Events',
    'middleware' => ['auth']
], function() {
    Route::get('/events', 'EventController@list')->name('user-event-list');
    Route::get('/event/list/{timestamp}', 'EventController@listDay')->name('user-event-list-day');
    Route::get('/event/show/{event}', 'EventController@show')->name('user-event-show');
    Route::post('/event/store', 'EventController@store')->name('user-event-create');
    Route::post('/event/join/{event}', 'EventController@join')->name('user-event-join');
    Route::post('/event/leave/{event}', 'EventController@leave')->name('user-event-leave');
    Route::get('/event/participants/{event}', 'EventController@listPartipicants')->name('user-event-list-p');

});

// Search page specific routes
//=================================================================
Route::group([
    'middleware' => [ 'auth' ]
], function(){
    Route::post('/search', 'SearchController@search')->name('settings-view');
});

// Search page specific routes
//=================================================================
Route::group([
    'middleware' => [ 'auth' ],
    'prefix' => 'friends'
], function(){
    Route::post('/add/{username}', 'FriendsController@add')->name('add-to-friends');
    Route::post('/unsubscribe/{username}', 'FriendsController@unsubscribe')->name('unsubscribe');
    Route::post('/accept/{username}', 'FriendsController@accept')->name('accept-to-friends');
    Route::post('/unfriend/{username}', 'FriendsController@unfriend')->name('accept-to-unfriend');
    Route::post('/decline/{username}', 'FriendsController@decline')->name('decline-to-unfriend');
});


Route::group([
    'namespace' => 'Chat',
    'middleware' => [ 'auth', 'web' ]
], function(){

    Route::get('/chats', 'ChatController@chats')->name('chat-list');
    Route::post('/chats/{username}/start', 'ChatController@start')->name('create-chat');
    Route::post('/chat/{conversation}/message', 'ChatController@store')->name('store-message');

    Route::post('/chat/{conversation}/pull', 'MessageController@pull')->name('pull-latest-messages');
    Route::post('/chat/{conversation}/pull/prev', 'MessageController@pullPrev')->name('pull-latest-messages');

    Route::post('/messenger/sound', 'MessengerController@sound')->name('set-meesenger-sound');
    Route::post('/messenger/status', 'MessengerController@status')->name('set-meesenger-status');
});





// social media login | redirects to register page
Route::group([
    'middleware' => [ 'guest' ],
    'prefix' => 'social/login/',
    'namespace' => 'Auth',
    'as' => 'login.with.'
], function(){

    // handle social option click
    Route::get('/with/{name}', 'SocialeLoginController@redirectToProvider')
        ->name('social')
        ->where([
            'name' => 'github|twitter|facebook|twitch|google'
        ]);

    // handle social callback
    Route::get('/callback/{name}', 'SocialeLoginController@handleProviderCallback')
        ->name('social.callback')
        ->where([
            'name' => 'github|twitter|facebook|twitch|google'
        ]);

});


Route::group([
   'middleware' => [ 'guest' ],
   'prefix' => 'SsXAZGWTyt/'
], function(){
    Route::get('/make_user_offline/{communication_id}', function($comm_id){
        $user = \App\User::where('user_communication_id',$comm_id)->first();
        if($user){
            $user->user_communication_id = null;
            $user->save();
        }
    });
});
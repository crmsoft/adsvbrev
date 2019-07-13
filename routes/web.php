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

Route::get('/add/steam/game/{id}', function(int $id){
    \Artisan::call('steam:pull', ['id' => $id]);
});

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
    Route::get('/g/{id}', 'ProfileController@index')->name('game-page');
    Route::get('/gr/{id}', 'ProfileController@index')->name('group-page');
    Route::get('/dudes', 'ProfileController@index')->name('dudes-page');
    Route::get('/feed', 'ProfileController@index')->name('feed-page');
});

// Application select my games 
//=================================================================
Route::name('my-games')->get('/my-games', 'SelectGamesController@index')->middleware('auth');
Route::name('my-games.search')->post('/my-games/search', 'SelectGamesController@search')->middleware('auth');
Route::name('my-games.store')->post('/my-games/store', 'SelectGamesController@store')->middleware('auth');

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
    Route::get('/group/list/{user?}', 'ProfileController@listGroups')->name('list-fo-groups');
    Route::get('/notification/list', 'ProfileController@notifications')->name('list-fo-friends');
    Route::get('/media/list/{user?}', 'ProfileController@listMedia')->name('list-user-media');

    Route::post('/settings','ProfileController@update')->name('edit-profile');

    Route::post('/setting/devices', 'ProfileController@setDevices')->name('settings-set-devices');

    Route::get('/feed/index', 'FeedController@index')->name('feed-list');
    Route::post('/feed/more', 'FeedController@more')->name('feed-load-more');

    Route::get('/groups', 'GroupController@index')->name('group-list');
    Route::post('/groups/store', 'GroupController@store')->name('store-group');
    Route::post('/groups/{group}/update', 'GroupController@update')->name('update-group');
    Route::post('/groups/{group}/destroy', 'GroupController@destroy')->name('destroy-group');
    
    Route::get('/groups/{group}', 'GroupManagerController@index')->name('get-group-info');

    Route::get('/p/{post}', 'PostController@index')->name('get-post-details');

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
    Route::post('/post/more/{username?}', 'PostController@loadMore')->name('load-more-posts');
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
    Route::post('/event/update/{event}', 'EventController@update')->name('user-event-update');
    Route::post('/event/join/{event}', 'EventController@join')->name('user-event-join');
    Route::post('/event/leave/{event}', 'EventController@leave')->name('user-event-leave');
    Route::get('/event/participants/{event}', 'EventController@listPartipicants')->name('user-event-list-p');

});

// Game Page Routes
//---------------------------------------------------------------------------------
Route::group([
    'namespace' => 'Games',
    'middleware' => ['auth']
], function() {
    Route::get('/games', 'GameController@list')->name('user-game-list');
    Route::post('/game/show/{game}', 'GameController@show')->name('user-game-show');
    Route::post('/game/{game}/join', 'GameController@join')->name('user-game-join');
    Route::post('/game/{game}/leave', 'GameController@leave')->name('user-game-leave');
    Route::get('/game/participants/{game}', 'GameController@listParticipants')->name('user-game-list-p');
    Route::get('/game/list/groups', 'GameController@gameGroups')->name('list-game-groups');
    Route::get('/game/media/{game}', 'GameController@gameMedia')->name('list-game-groups');

    Route::post('/game/vote/store/{game}', 'GameController@storeVote')->name('store-game-vote');
    Route::post('/game/review/store/{game}', 'GameController@storeReview')->name('store-game-review');
    Route::post('/game/review/toggle/like/{game_review}', 'GameController@toggleReviewLike')->name('toggle-review-like');

});

// Group Page Routes
//---------------------------------------------------------------------------------
Route::group([
    'middleware' => ['auth']
], function() {
    Route::get('/group/show/{group}', 'GroupController@show')->name('user-group-show');
    Route::post('/group/{group}/join', 'GroupController@join')->name('user-group-join');
    Route::post('/group/{group}/leave', 'GroupController@leave')->name('user-group-leave');
    Route::get('/group/participants/{group}', 'GroupController@listParticipants')->name('user-group-list-p');
    Route::get('/group/list/groups', 'GroupController@groupGroups')->name('list-group-groups');
});

// Search page specific routes
//=================================================================
Route::group([
    'middleware' => [ 'auth' ]
], function(){
    Route::post('/search', 'SearchController@search')->name('settings-view');
    Route::get('/filter/games/{query?}', 'SearchController@filterGame')->name('filter-game');
    Route::get('/filter/users/{query?}', 'SearchController@filterUser')->name('filter-game');
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
    Route::post('/chat/{conversation}/destroy', 'ChatController@destroy')->name('use-destroy-conversation');
    
    Route::post('/chat/group/store', 'GroupController@store')->name('create-chat');
    Route::post('/chat/group/{conversation}/update', 'GroupController@update')->name('admin-group-update');
    Route::post('/chat/group/{conversation}/leave', 'GroupController@leave')->name('use-leaves-chat');
    Route::post('/chat/group/{conversation}/destroy', 'GroupController@destroy')->name('admin-group-destroy');

    Route::post('/chat/{conversation}/pull', 'MessageController@pull')->name('pull-latest-messages');
    Route::post('/chat/{conversation}/pull/prev', 'MessageController@pullPrev')->name('pull-latest-messages');

    Route::post('/messenger/sound', 'MessengerController@sound')->name('set-messenger-sound');
    Route::post('/messenger/status', 'MessengerController@status')->name('set-messenger-status');
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

    // handle social callback
    Route::any('/twitch/sub', 'SocialeLoginController@ts')
    ->name('twitch.sub.callback');

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

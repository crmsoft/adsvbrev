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

Route::get('ab', function(){

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
    'namespace' => '\Profile',
    'middleware' => [ 'auth' ]
], function(){
    Route::get('/', 'ProfileController@index')->name('profile-view');
    Route::get('/gg/{user_unique}', 'ProfileController@index')->name('user-profile');
    Route::get('/search', 'ProfileController@index')->name('search-view');
    Route::get('/settings', 'ProfileController@index')->name('settings-view');
    Route::get('/schedule', 'ProfileController@index')->name('schedule-view');
});

// Profile Specific Routes
//---------------------------------------------------------------------------------
Route::group([
    'namespace' => '\Profile',
    'middleware' => [ 'auth' ]
], function (){

    // User profile page
    Route::get('/get/profile/{username?}', 'ProfileController@profile')->name('get-profile');
    Route::post('/profile', 'ProfileController@getUser')->name('get-user');
    Route::post('/profile/ava', 'ProfileController@storeAva')->name('upload-avatar');
    Route::get('/friend/list/{username?}', 'ProfileController@listFriends')->name('list-fo-friends');
    Route::get('/followers/list/{username?}', 'ProfileController@listFollowers')->name('list-fo-friends');
    Route::get('/group/list/{group?}', 'ProfileController@listGroups')->name('list-fo-groups');

    Route::post('/settings','ProfileController@update')->name('edit-profile');

    Route::post('/setting/devices', 'ProfileController@setDevices')->name('settings-set-devices');


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

});

// Comment Specific Routes
//---------------------------------------------------------------------------------
Route::group([
    // 'namespace' => '\Profile',
    'middleware' => [ 'auth' ]
], function (){

    // User profile page
    Route::post('/comment/store/{post}/{comment?}', 'CommentController@store')->name('store-comment');
    Route::post('/comment/like/{comment}', 'CommentController@toggleLike')->name('toggle-like-comment');

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
});


Route::group([
    'namespace' => '\Chat',
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
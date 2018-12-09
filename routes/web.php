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

Route::get('/ab/{user}', function(\App\User $user){
    // the user
    dump($user->subscribers()->where('friend_id',1)->get()->pluck('id')->toArray());
    dump($user->followers()->where('friend_id',28)->get()->pluck('id')->toArray());
    dump($user->friend()->where('friend_id',5)->pluck('users.id')->toArray());
    dump(\App\User::find(5)->friend()->pluck('users.id')->toArray());
    // dump(\App\User::find(23)->following()->where('user_id', 17)->get()->pluck('id')->toArray());

//    dump( 23, \App\User::find(23)->friend()->where('friend_id',17)->get()->pluck('id')->toArray() );
//    dd( 17,\App\User::find(17)->friend()->where('friend_id',23)->get()->pluck('id')->toArray() );
});

// Lara Auth Routes
//---------------------------------------------------------------------------------
Auth::routes();

Route::get('/dialog/{any?}', function(){
   return redirect(route('conversations-list'));
});

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
});

// Profile Specific Routes
//---------------------------------------------------------------------------------
Route::group([
    'namespace' => '\Profile',
    'middleware' => [ 'auth' ]
], function (){

    // User profile page
    Route::get('/get/profile/{username?}', 'ProfileController@profile')->name('get-profile');
    Route::post('/profile/ava', 'ProfileController@storeAva')->name('upload-avatar');
    Route::get('/friend/list/{username?}', 'ProfileController@listFriends')->name('list-fo-friends');
    Route::get('/followers/list/{username?}', 'ProfileController@listFollowers')->name('list-fo-friends');
    Route::get('/group/list/{group?}', 'ProfileController@listGroups')->name('list-fo-groups');

    Route::post('/settings','ProfileController@update')->name('edit-profile');

});

// Post Specific Routes
//---------------------------------------------------------------------------------
Route::group([
    // 'namespace' => '\Profile',
    'middleware' => [ 'auth' ]
], function (){

    // User profile page
    Route::post('/post/store', 'PostController@store')->name('store-post');

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
    'namespace' => '\Profile\Settings',
    'middleware' => [ 'all' ]
], function(){

    //Route::get('/settings', 'SettingController@index')->name('profile-settings');
    ///Route::post('/settings','SettingController@update')->name('edit-profile');

});

Route::get('/im', 'ConversationController@go')->name('conversations-list');
Route::post('/im/start','ConversationController@startConversation')->name('start-conversation');
//Route::get('/search','SearchController@search')->name('search');


Route::resources([
    'messages' => 'MessageController',
    'conversations' => 'ConversationController',
    'media' => 'MediaController'
]);




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
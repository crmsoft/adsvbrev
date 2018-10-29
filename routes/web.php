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

Route::get('/dialog/{any?}', function(){
   return redirect(route('conversations-list'));
});

// Profile Specific Routes
//---------------------------------------------------------------------------------
Route::group([
    'namespace' => '\Profile'
], function (){

    // User profile page
    Route::get('/', 'ProfileController@index')->name('profile');
    Route::get('/gg/{user_unique}', 'ProfileController@show')->name('user-profile');

});

Route::group([
    'namespace' => '\Profile\Settings'
], function(){

    Route::get('/settings', 'SettingController@index')->name('profile-settings');

});

Route::post('/profile/ava', 'ProfileController@storeAva')->name('upload-avatar');
Route::get('/im', 'ConversationController@go')->name('conversations-list');
Route::post('/im/start','ConversationController@startConversation')->name('start-conversation');
Route::get('/search','SearchController@search')->name('search');


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
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


Auth::routes();

Route::get('/dialog', function(){
   return redirect(route('conversations-list'));
});

Route::get('/', 'ProfileController@index')->name('profile');
Route::get('/im', 'ConversationController@go')->name('conversations-list');
Route::post('/im/start','ConversationController@startConversation')->name('start-conversation');
Route::get('/search','SearchController@search')->name('search');


Route::resources([
    'messages' => 'MessageController',
    'conversation' => 'ConversationController'
]);

Route::get('/gg/{user_unique}', 'ProfileController@showProfile')->name('show-user-profile');

Route::group([
    'middleware' => [ 'guest' ],
    'prefix' => 'social/login/',
    'namespace' => 'Auth',
    'as' => 'login.with.'
], function(){

    Route::get('/with/{name}', 'SocialeLoginController@redirectToProvider')
        ->name('social')
        ->where([
            'name' => 'github|twitter|facebook'
        ]);

    Route::get('/callback/{name}', 'SocialeLoginController@handleProviderCallback')
        ->name('social.callback')
        ->where([
            'name' => 'github|twitter|facebook'
        ]);

});
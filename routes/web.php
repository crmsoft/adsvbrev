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

Route::get('/', 'ProfileController@index')->name('profile');
Route::get('/im', 'ConversationController@go')->name('conversations-list');
Route::post('/im/start','ConversationController@startConversation')->name('start-conversation');
Route::get('/search','SearchController@search')->name('search');

Route::get('a',function (){
    dd(\App\District::all());
});

Route::resources([
    'messages' => 'MessageController',
    'conversation' => 'ConversationController'
]);

Route::get('/{user_unique}', 'ProfileController@showProfile')->name('show-user-profile');
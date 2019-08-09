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

Route::group([
    'prefix' => 'find-dudes',
    'middleware' => ['auth']
], function(){

    Route::name('games.index')->get('/games', 'FindDudesController@index');
    Route::name('games.subscribe')->post('/{game}/subscribe', 'FindDudesController@subscribe');
    Route::name('games.unsubscribe')->post('/{game}/unsubscribe', 'FindDudesController@unsubscribe');


    Route::name('messages.store')->post('messages/store', 'MessageController@store');
    Route::name('messages.index')->post('messages/{game}/{last?}', 'MessageController@index');
});
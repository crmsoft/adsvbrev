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
    Route::name('games.subscribers')->get('/{game}/subscribers/{game_channel?}', 'FindDudesController@subscribers');
    Route::name('games.unsubscribe')->post('/{game}/unsubscribe', 'FindDudesController@unsubscribe');

    Route::name('messages.store')->post('messages/store', 'MessageController@store');
    Route::name('messages.index')->post('messages/{game}/{last?}', 'MessageController@index');

    Route::name('sub-channels.index')->get('sub-channels/{game}', 'SubChannelController@index');
    Route::name('sub-channels.store')->post('sub-channels/{game}/store', 'SubChannelController@store');
    Route::name('sub-channels.update')->put('sub-channels/{game}/{game_channel}/update', 'SubChannelController@update');
    Route::name('sub-channels.destroy')->post('sub-channels/{game}/{game_channel}/destroy', 'SubChannelController@destroy');
});
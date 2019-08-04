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


    Route::name('messages.index')->get('messages/{game}', 'MessageController@index');
    Route::name('messages.store')->post('messages/store', 'MessageController@store');
});
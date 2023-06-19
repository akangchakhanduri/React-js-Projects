<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controller\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();

// use App\Http\Controllers\SayhelloController;
// Route::get('/users/{name?}' , [SayhelloController::class,'index']);
// });
Route::POST("/user_registration", 'App\Http\Controllers\UserController@userRegistration');
Route::post('/user_login', 'App\Http\Controllers\UserController@userLogin');
Route::get('/user_profile/{email}', 'App\Http\Controllers\UserController@userDetails');


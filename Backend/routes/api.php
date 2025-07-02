<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/people', [App\Http\Controllers\SwapiController::class, 'people']);
Route::get('/people/{id}', [App\Http\Controllers\SwapiController::class, 'personDetails']);
Route::get('/films', [App\Http\Controllers\SwapiController::class, 'films']);
Route::get('/films/{id}', [App\Http\Controllers\SwapiController::class, 'filmDetails']);
Route::get('/vehicles/{id}', [App\Http\Controllers\SwapiController::class, 'vehicleDetails']);
Route::get('/starships/{id}', [App\Http\Controllers\SwapiController::class, 'starshipsDetails']);
Route::get('/species/{id}', [App\Http\Controllers\SwapiController::class, 'speciesDetails']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'me']);



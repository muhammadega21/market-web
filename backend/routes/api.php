<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProducController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(ProducController::class)->group(function () {
        Route::get('/products', 'index');
        Route::post('/product', 'store');
        Route::put('/product/{id}', 'update');
        Route::delete('/product/{id}', 'delete');
    });
    Route::controller(UserController::class)->group(function () {
        Route::get('/user', 'profile');
        Route::get('/users', 'index');
        Route::post('/user', 'store');
        Route::put('/user/{id}', 'update');
        Route::delete('/user/{id}', 'destroy');
    });
});

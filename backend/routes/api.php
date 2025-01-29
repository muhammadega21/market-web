<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProducController;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function () {
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
});

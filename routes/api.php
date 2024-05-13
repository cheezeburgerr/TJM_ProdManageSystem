<?php

use App\Http\Controllers\APIController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('users', [OrderController::class, 'order']);
Route::get('users/{id}', [OrderController::class, 'show']);
Route::post('addnew', [OrderController::class, 'store']);
Route::put('usersupdate/{id}', [OrderController::class, 'update']);
Route::delete('usersdelete/{id}', [OrderController::class, 'destroy']);

Route::get('/order_details/{id}', [OrderController::class, 'get_details']);
Route::get('/edit_lineup/{id}', [OrderController::class, 'edit_lineup']);
Route::get('/get-lineup/{id}', [OrderController::class, 'get_lineup']);
Route::get('/get-teams/{id}', [APIController::class, 'get_teams']);
Route::get('/edit_order/{id}', [OrderController::class, 'edit_order']);
Route::put('/update-player/{id}', [OrderController::class, 'update_player']);
Route::delete('/delete-player/{id}', [OrderController::class, 'delete_player']);
Route::post('/order/update/{id}', [OrderController::class, 'update_order']);

Route::put('/approve', [APIController::class, 'approve']);
Route::get('/fetch-pending', [APIController::class, 'fetch_pending']);
Route::get('/without-artist', [APIController::class, 'withoutArtist']);
Route::put('/assign-artist/{id}', [APIController::class, 'assign']);

Route::put('/assign-printer/{id}', [APIController::class, 'assign_printer']);
Route::put('/lineup-status/{id}', [APIController::class, 'update_lineup_status']);
Route::put('/first-check/{id}', [APIController::class, 'first_check']);
Route::put('/update-printing/{id}', [APIController::class, 'update_printing']);

Route::put('/return-records', [APIController::class, 'return_records']);
Route::get('/get-errors/{id}', [APIController::class, 'get_errors']);

Route::put('/reprint-errors/{id}', [APIController::class, 'reprint_errors']);
Route::put('/printers/{printer}', [APIController::class, 'updateStatus']);


Route::put('/update_check/{id}', [APIController::class, 'update_check']);
Route::post('/add/picture', [APIController::class, 'add_picture']);
Route::get('/get_employees', [APIController::class, 'get_employees']);

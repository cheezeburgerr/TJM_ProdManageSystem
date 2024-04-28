<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Models\Products;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Dashboard', ['products' => Products::all()]);
})->name('dashboard');



Route::middleware('auth')->group(function () {

    Route::get('/configurator', [OrderController::class, 'configurator'])->name('configurator');

    Route::get('/order/{id}', [OrderController::class, 'order'])->name('orders');
    Route::get('/order/{id}/edit', [OrderController::class, 'edit_order'])->name('orders.edit');
    Route::post('/order/store', [OrderController::class, 'store'])->name('place.order');
    Route::get('/show_products', [OrderController::class, 'show_products'])->name('show.products');
    Route::get('/lineup/{id}', [OrderController::class, 'lineup'])->name('order.lineup');
    Route::get('/downpayment/{id}', [OrderController::class, 'downpayment'])->name('order.downpayment');
    Route::post('/lineup/submit/{id}', [OrderController::class, 'store_lineup'])->name('lineup.submit');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile-show', [ProfileController::class, 'index'])->name('profile.show');
});

Route::get('employee/login', [EmployeeController::class, 'login'])->name('employee.login');
Route::post('employee/login-check', [EmployeeController::class, 'login_functionality'])->name('login.functionality');

Route::get('admin/login', [AdminController::class, 'login'])->name('admin.login');
Route::post('admin/login-check', [AdminController::class, 'login_functionality'])->name('admin.login.functionality');

Route::middleware('employee')->group(function () {
    Route::get('employee/dashboard', [EmployeeController::class, 'dashboard'])->name('employee.dashboard');
    Route::get('employee/teams', [EmployeeController::class, 'teams'])->name('employee.teams');
    Route::get('employee/pending', [EmployeeController::class, 'pending_teams'])->name('employee.pending');
    Route::get('employee/print/{id}', [EmployeeController::class, 'print_order'])->name('employee.print');
    Route::get('employee/production', [EmployeeController::class, 'production'])->name('employee.production');
    Route::get('employee/printers', [EmployeeController::class, 'printers'])->name('employee.printers');
    Route::post('employee/approve/{id}', [EmployeeController::class, 'approve'])->name('team.approve');
    Route::post('employee/logout', [EmployeeController::class, 'logout'])->name('employee.logout');
});

Route::middleware('auth:admin')->group(function () {
    Route::get('admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('admin/teams', [AdminController::class, 'teams'])->name('admin.teams');
    Route::get('admin/pending', [AdminController::class, 'pending_teams'])->name('admin.pending');
    Route::get('admin/print/{id}', [AdminController::class, 'print_order'])->name('admin.print');
    Route::get('admin/production', [AdminController::class, 'production'])->name('admin.production');
    Route::get('admin/printers', [AdminController::class, 'printers'])->name('admin.printers');
    Route::post('admin/approve/{id}', [AdminController::class, 'approve'])->name('team.approve');
    Route::post('admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
});

require __DIR__ . '/auth.php';

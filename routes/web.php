<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\APIController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ProductController;
use App\Models\Gallery;
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

Route::get('/', [PagesController::class, 'dashboard'])->name('dashboard');

Route::get('/messages', [PagesController::class, 'messages'])
    ->name('messages');
Route::post('/message', [PagesController::class, 'message'])
    ->name('message');

Route::get('product_gallery', [PagesController::class, 'gallery'])->name('gallery');
Route::get('product_gallery/{id}', [PagesController::class, 'show_pic'])->name('show.pic');


Route::get('/show_products', [OrderController::class, 'show_products'])->name('show.products');
Route::get('/configurator', [OrderController::class, 'configurator'])->name('configurator');

Route::middleware('auth')->group(function () {


    Route::get('/custom_order/{id}', [OrderController::class, 'custom_order'])->name('custom.orders');

    Route::get('/order/{id}', [OrderController::class, 'order'])->name('orders');
    Route::get('view_order/{id}', [OrderController::class, 'view_order'])->name('view_order');
    Route::get('/order/{id}/edit', [OrderController::class, 'edit_order'])->name('orders.edit');
    Route::post('/order/store', [OrderController::class, 'store'])->name('place.order');
    Route::post('/order/design_store', [OrderController::class, 'design_store'])->name('place.design_order');
    Route::get('/lineup/{id}', [OrderController::class, 'lineup'])->name('order.lineup');
    Route::get('/downpayment/{id}', [OrderController::class, 'downpayment'])->name('order.downpayment');
    Route::post('/downpayment/store/{id}', [OrderController::class, 'downpayment_store'])->name('set.downpayment');


    Route::post('/cancel_order/{id}', [APIController::class, 'cancel_order'])->name('cancel.order');
    Route::get('/verifying-order/{id}', [OrderController::class, 'verifying'])->name('verifying');
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
    Route::get('employee/checking', [EmployeeController::class, 'checking'])->name('employee.checking');
    Route::get('employee/final_checking', [EmployeeController::class, 'final_checking'])->name('employee.finalchecking');
    Route::get('employee/gallery', [EmployeeController::class, 'gallery'])->name('employee.gallery');
    Route::get('employee/pending', [EmployeeController::class, 'pending_teams'])->name('employee.pending');
    Route::get('employee/finished', [EmployeeController::class, 'finished_teams'])->name('employee.finished');
    Route::get('employee/print/{id}', [EmployeeController::class, 'print_order'])->name('employee.print');
    Route::get('employee/production', [EmployeeController::class, 'production'])->name('employee.production');
    Route::get('employee/check/{id}', [EmployeeController::class, 'check'])->name('employee.check');
    Route::get('employee/finalcheck/{id}', [EmployeeController::class, 'final_check'])->name('employee.finalcheck');
    Route::get('employee/printers', [EmployeeController::class, 'printers'])->name('employee.printers');
    Route::post('employee/approve/{id}', [EmployeeController::class, 'approve'])->name('team.approve');
    Route::post('employee/logout', [EmployeeController::class, 'logout'])->name('employee.logout');
    Route::post('employee/change_status/{id}', [APIController::class, 'change_status'])->name('change.status');
    Route::get('employee/reprint', [EmployeeController::class, 'reprint'])->name('employee.reprint');
});


Route::post('/add/picture', [GalleryController::class, 'add_picture'])->name('add.picture');

Route::middleware('auth:admin')->group(function () {
    Route::get('admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('admin/employees', [AdminController::class, 'employees'])->name('admin.employees');
    Route::post('admin/employee_store', [AdminController::class, 'employee_store'])->name('add.employee');

    Route::get('admin/products', [ProductController::class, 'index'])->name('admin.products');
    Route::get('product/{id}', [ProductController::class, 'view_product'])->name('product');
    Route::post('product/store', [ProductController::class, 'store'])->name('product.store');


    Route::get('admin/teams', [AdminController::class, 'teams'])->name('admin.teams');
    Route::get('admin/pending', [AdminController::class, 'pending_teams'])->name('admin.pending');
    Route::get('admin/print/{id}', [AdminController::class, 'print_order'])->name('admin.print');
    Route::get('admin/production', [AdminController::class, 'production'])->name('admin.production');
    Route::get('admin/printers', [AdminController::class, 'printers'])->name('admin.printers');
    Route::post('admin/approve/{id}', [AdminController::class, 'approve'])->name('team.approve');
    Route::post('admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
});

require __DIR__ . '/auth.php';

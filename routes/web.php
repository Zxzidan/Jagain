<?php

use App\Http\Controllers\Admin\AdminAgencyController;
use App\Http\Controllers\Admin\AdminAuditLogController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminExportController;
use App\Http\Controllers\Admin\AdminReportController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Admin Route Group
    Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', AdminDashboardController::class)->name('dashboard');

        // Reports Review & Management
        Route::get('/reports', [AdminReportController::class, 'index'])->name('reports.index');
        Route::get('/reports/{report}', [AdminReportController::class, 'show'])->name('reports.show');
        Route::post('/reports/{report}/transitions', [AdminReportController::class, 'transition'])->name('reports.transition');
        Route::post('/reports/{report}/assignments', [AdminReportController::class, 'assign'])->name('reports.assign');

        // Agencies Management
        Route::get('/agencies', [AdminAgencyController::class, 'index'])->name('agencies.index');
        Route::post('/agencies', [AdminAgencyController::class, 'store'])->name('agencies.store');
        Route::put('/agencies/{agency}', [AdminAgencyController::class, 'update'])->name('agencies.update');
        Route::patch('/agencies/{agency}/toggle-status', [AdminAgencyController::class, 'toggleStatus'])->name('agencies.toggle-status');

        // Categories Management
        Route::get('/categories', [AdminCategoryController::class, 'index'])->name('categories.index');
        Route::post('/categories', [AdminCategoryController::class, 'store'])->name('categories.store');
        Route::put('/categories/{category}', [AdminCategoryController::class, 'update'])->name('categories.update');
        Route::patch('/categories/{category}/toggle-status', [AdminCategoryController::class, 'toggleStatus'])->name('categories.toggle-status');

        // Audit Logs
        Route::get('/audit-logs', AdminAuditLogController::class)->name('audit-logs.index');

        // Exports
        Route::get('/exports/reports', [AdminExportController::class, 'reports'])->name('exports.reports');
    });
});

require __DIR__.'/settings.php';

<?php

use App\Http\Controllers\Admin\AdminAgencyController;
use App\Http\Controllers\Admin\AdminAuditLogController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminExportController;
use App\Http\Controllers\Admin\AdminReportController;
use App\Http\Controllers\Agency\AgencyAssignmentController;
use App\Http\Controllers\Agency\AgencyDashboardController;
use App\Http\Controllers\CitizenReportController;
use App\Http\Controllers\Community\DashboardController;
use App\Http\Controllers\Community\ReportController;
use App\Http\Controllers\PublicController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public Routes (Open to all visitors)
Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/peta', [PublicController::class, 'map'])->name('public.map');
Route::get('/laporan-publik/{tracking_code}', [PublicController::class, 'showReport'])->name('public.reports.show');
Route::get('/panduan-keselamatan', [PublicController::class, 'safetyGuide'])->name('public.safety-guide');
Route::get('/tentang-kami', [PublicController::class, 'about'])->name('public.about');

// Authenticated Routes
Route::middleware(['auth'])->group(function () {
    // Role-based Dashboard Dispatcher
    Route::get('/dashboard', function (Request $request) {
        $user = $request->user();
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        if ($user->isAgency()) {
            return redirect()->route('agency.dashboard');
        }

        return app(DashboardController::class)->index($request);
    })->name('dashboard');

    // Community Reports (from main)
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('reports/create', [ReportController::class, 'create'])->name('reports.create');
    Route::post('reports', [ReportController::class, 'store'])->name('reports.store');
    Route::get('reports/{report}', [ReportController::class, 'show'])->name('reports.show');
    Route::post('reports/{report}/additional-info', [ReportController::class, 'submitAdditionalInfo'])->name('reports.additional-info');

    // Citizen Report Creation & Tracking (from brian)
    Route::get('/lapor', [CitizenReportController::class, 'create'])->name('citizen.reports.create');
    Route::post('/lapor', [CitizenReportController::class, 'store'])->name('citizen.reports.store');
    Route::get('/laporan-saya', [CitizenReportController::class, 'index'])->name('citizen.reports.index');
    Route::get('/laporan-saya/{tracking_code}', [CitizenReportController::class, 'show'])->name('citizen.reports.show');
    Route::post('/laporan-saya/{tracking_code}/tambah-informasi', [CitizenReportController::class, 'provideInformation'])->name('citizen.reports.provide-info');
});

// Admin Route Group (Requires ADMIN role)
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', AdminDashboardController::class)->name('dashboard');
    Route::get('/dashboard', AdminDashboardController::class);

    // Reports Review & Management
    Route::get('/reports', [AdminReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/{report}', [AdminReportController::class, 'show'])->name('reports.show');
    Route::post('/reports/{report}/transitions', [AdminReportController::class, 'transition'])->name('reports.transition');
    Route::post('/reports/{report}/assignments', [AdminReportController::class, 'assign'])->name('reports.assign');

    // Aliases for alternate route paths
    Route::get('/laporan', [AdminReportController::class, 'index']);
    Route::get('/laporan/{report}', [AdminReportController::class, 'show']);
    Route::post('/laporan/{report}/status', [AdminReportController::class, 'transition']);
    Route::post('/laporan/{report}/assign', [AdminReportController::class, 'assign']);

    // Agencies Management
    Route::get('/agencies', [AdminAgencyController::class, 'index'])->name('agencies.index');
    Route::post('/agencies', [AdminAgencyController::class, 'store'])->name('agencies.store');
    Route::put('/agencies/{agency}', [AdminAgencyController::class, 'update'])->name('agencies.update');
    Route::patch('/agencies/{agency}/toggle-status', [AdminAgencyController::class, 'toggleStatus'])->name('agencies.toggle-status');
    Route::get('/instansi', [AdminAgencyController::class, 'index']);
    Route::post('/instansi', [AdminAgencyController::class, 'store']);
    Route::post('/instansi/{agency}/toggle', [AdminAgencyController::class, 'toggleActive']);

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

// OPD / Agency Handling (Requires AGENCY role)
Route::middleware(['auth', 'role:AGENCY'])->prefix('opd')->name('agency.')->group(function () {
    Route::get('/dashboard', [AgencyDashboardController::class, 'index'])->name('dashboard');
    Route::get('/tugas', [AgencyAssignmentController::class, 'index'])->name('assignments.index');
    Route::get('/tugas/{assignment}', [AgencyAssignmentController::class, 'show'])->name('assignments.show');
    Route::post('/tugas/{assignment}/respon', [AgencyAssignmentController::class, 'respond'])->name('assignments.respond');
    Route::post('/tugas/{assignment}/progres', [AgencyAssignmentController::class, 'updateProgress'])->name('assignments.update-progress');
    Route::post('/tugas/{assignment}/ajukan-review', [AgencyAssignmentController::class, 'submitReview'])->name('assignments.submit-review');
});

require __DIR__.'/settings.php';

<?php

use App\Models\Agency;
use App\Models\Category;
use App\Models\Report;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->admin = User::factory()->create([
        'role' => 'ADMIN',
        'email_verified_at' => now(),
    ]);

    $this->communityUser = User::factory()->create([
        'role' => 'COMMUNITY',
        'email_verified_at' => now(),
    ]);

    $this->category = Category::create([
        'name' => 'Lahan Gambut',
        'slug' => 'lahan-gambut',
        'description' => 'Area gambut',
        'is_active' => true,
    ]);

    $this->agency = Agency::create([
        'name' => 'BPBD Kalbar',
        'agency_type' => 'BPBD',
        'jurisdiction' => 'Kalimantan Barat',
        'is_active' => true,
    ]);
});

test('guests are redirected to login when accessing admin dashboard', function () {
    $response = $this->get(route('admin.dashboard'));
    $response->assertRedirect(route('login'));
});

test('non-admin users receive 403 forbidden on admin routes', function () {
    $response = $this->actingAs($this->communityUser)->get(route('admin.dashboard'));
    $response->assertForbidden();
});

test('admin can access admin dashboard with metrics', function () {
    Report::create([
        'created_by_user_id' => $this->communityUser->id,
        'category_id' => $this->category->id,
        'title' => 'Asap Tebal di Kubu Raya',
        'description' => 'Asap pekat di dekat parit perkebunan.',
        'latitude' => -0.1234567,
        'longitude' => 109.1234567,
        'report_status' => 'SUBMITTED',
        'lock_version' => 1,
    ]);

    $response = $this->actingAs($this->admin)->get(route('admin.dashboard'));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/dashboard')
        ->has('statusCounts')
        ->where('statusCounts.submitted', 1)
        ->has('priorityQueue', 1)
    );
});

test('admin can view reports index with filters', function () {
    Report::create([
        'created_by_user_id' => $this->communityUser->id,
        'category_id' => $this->category->id,
        'title' => 'Asap Rasau Jaya',
        'description' => 'Deskripsi laporan...',
        'latitude' => -0.155,
        'longitude' => 109.387,
        'report_status' => 'SUBMITTED',
        'lock_version' => 1,
    ]);

    $response = $this->actingAs($this->admin)->get(route('admin.reports.index', ['status' => 'SUBMITTED']));
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/reports/index')
        ->has('reports.data', 1)
    );
});

test('admin can transition report from SUBMITTED to UNDER_REVIEW', function () {
    $report = Report::create([
        'created_by_user_id' => $this->communityUser->id,
        'category_id' => $this->category->id,
        'title' => 'Kebakaran Semak',
        'description' => 'Semak kering terbakar...',
        'latitude' => -0.082,
        'longitude' => 109.432,
        'report_status' => 'SUBMITTED',
        'lock_version' => 1,
    ]);

    $response = $this->actingAs($this->admin)->post(route('admin.reports.transition', $report), [
        'target_status' => 'UNDER_REVIEW',
        'note' => 'Admin mulai verifikasi berkas.',
        'lock_version' => 1,
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('reports', [
        'id' => $report->id,
        'report_status' => 'UNDER_REVIEW',
        'lock_version' => 2,
    ]);

    $this->assertDatabaseHas('report_status_histories', [
        'report_id' => $report->id,
        'from_status' => 'SUBMITTED',
        'to_status' => 'UNDER_REVIEW',
        'actor_user_id' => $this->admin->id,
    ]);

    $this->assertDatabaseHas('audit_logs', [
        'actor_user_id' => $this->admin->id,
        'action' => 'REPORT_STATUS_TRANSITION',
        'entity_type' => 'Report',
        'entity_id' => $report->id,
    ]);
});

test('admin can request additional information with mandatory note', function () {
    $report = Report::create([
        'created_by_user_id' => $this->communityUser->id,
        'category_id' => $this->category->id,
        'title' => 'Titik Asap Jauh',
        'description' => 'Asap di kejauhan...',
        'latitude' => -0.05,
        'longitude' => 109.4,
        'report_status' => 'UNDER_REVIEW',
        'lock_version' => 1,
    ]);

    $response = $this->actingAs($this->admin)->post(route('admin.reports.transition', $report), [
        'target_status' => 'NEEDS_INFORMATION',
        'public_note' => 'Mohon tambahkan patok kilometer terdekat.',
        'lock_version' => 1,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('reports', [
        'id' => $report->id,
        'report_status' => 'NEEDS_INFORMATION',
    ]);

    $this->assertDatabaseHas('report_status_histories', [
        'report_id' => $report->id,
        'to_status' => 'NEEDS_INFORMATION',
        'public_note' => 'Mohon tambahkan patok kilometer terdekat.',
    ]);
});

test('admin cannot transition to NEEDS_INFORMATION without note', function () {
    $report = Report::create([
        'created_by_user_id' => $this->communityUser->id,
        'category_id' => $this->category->id,
        'title' => 'Asap Tidak Jelas',
        'description' => 'Deskripsi singkat...',
        'latitude' => -0.05,
        'longitude' => 109.4,
        'report_status' => 'UNDER_REVIEW',
        'lock_version' => 1,
    ]);

    $response = $this->actingAs($this->admin)->post(route('admin.reports.transition', $report), [
        'target_status' => 'NEEDS_INFORMATION',
        'public_note' => '',
        'note' => '',
        'lock_version' => 1,
    ]);

    $response->assertSessionHasErrors('note');
});

test('admin can close report with mandatory reason', function () {
    $report = Report::create([
        'created_by_user_id' => $this->communityUser->id,
        'category_id' => $this->category->id,
        'title' => 'Kebakaran Sampah Rumah Tangga',
        'description' => 'Warga membakar sampah di pekarangan...',
        'latitude' => -0.02,
        'longitude' => 109.33,
        'report_status' => 'UNDER_REVIEW',
        'lock_version' => 1,
    ]);

    $response = $this->actingAs($this->admin)->post(route('admin.reports.transition', $report), [
        'target_status' => 'CLOSED_WITH_REASON',
        'reason' => 'Bukan Kebakaran Hutan atau Lahan',
        'note' => 'Hanya pembakaran sampah domestik skala kecil.',
        'lock_version' => 1,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('reports', [
        'id' => $report->id,
        'report_status' => 'CLOSED_WITH_REASON',
    ]);
});

test('admin cannot close report without reason', function () {
    $report = Report::create([
        'created_by_user_id' => $this->communityUser->id,
        'category_id' => $this->category->id,
        'title' => 'Laporan Meragukan',
        'description' => 'Deskripsi singkat...',
        'latitude' => -0.02,
        'longitude' => 109.33,
        'report_status' => 'UNDER_REVIEW',
        'lock_version' => 1,
    ]);

    $response = $this->actingAs($this->admin)->post(route('admin.reports.transition', $report), [
        'target_status' => 'CLOSED_WITH_REASON',
        'reason' => '',
        'lock_version' => 1,
    ]);

    $response->assertSessionHasErrors('reason');
});

test('admin transition detects optimistic concurrency conflicts', function () {
    $report = Report::create([
        'created_by_user_id' => $this->communityUser->id,
        'category_id' => $this->category->id,
        'title' => 'Laporan Bersamaan',
        'description' => 'Dua admin membuka bersamaan...',
        'latitude' => -0.02,
        'longitude' => 109.33,
        'report_status' => 'SUBMITTED',
        'lock_version' => 2, // Database already incremented to 2
    ]);

    // Admin sends stale lock_version 1
    $response = $this->actingAs($this->admin)->post(route('admin.reports.transition', $report), [
        'target_status' => 'UNDER_REVIEW',
        'lock_version' => 1,
    ]);

    $response->assertSessionHasErrors('lock_version');
});

test('admin can assign verified report to an active agency', function () {
    $report = Report::create([
        'created_by_user_id' => $this->communityUser->id,
        'category_id' => $this->category->id,
        'title' => 'Kebakaran Lahan Gambut Terverifikasi',
        'description' => 'Api membakar gambut sedalam 50cm...',
        'latitude' => -0.155,
        'longitude' => 109.387,
        'report_status' => 'VERIFIED',
        'lock_version' => 1,
    ]);

    $response = $this->actingAs($this->admin)->post(route('admin.reports.assign', $report), [
        'agency_id' => $this->agency->id,
        'note' => 'Prioritaskan pembasahan parit sekunder.',
        'lock_version' => 1,
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('reports', [
        'id' => $report->id,
        'report_status' => 'DISPATCHED',
    ]);

    $this->assertDatabaseHas('assignments', [
        'report_id' => $report->id,
        'agency_id' => $this->agency->id,
        'assignment_status' => 'ASSIGNED',
    ]);

    $this->assertDatabaseHas('assignment_histories', [
        'to_status' => 'ASSIGNED',
        'actor_user_id' => $this->admin->id,
    ]);
});

test('admin can manage agencies master data', function () {
    $response = $this->actingAs($this->admin)->post(route('admin.agencies.store'), [
        'name' => 'Manggala Agni Daops Sintang',
        'agency_type' => 'MANGGALA_AGNI',
        'jurisdiction' => 'Kabupaten Sintang',
        'is_active' => true,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('agencies', [
        'name' => 'Manggala Agni Daops Sintang',
    ]);

    $agency = Agency::where('name', 'Manggala Agni Daops Sintang')->first();

    $this->actingAs($this->admin)->patch(route('admin.agencies.toggle-status', $agency));
    expect($agency->fresh()->is_active)->toBeFalse();
});

test('admin can manage categories master data', function () {
    $response = $this->actingAs($this->admin)->post(route('admin.categories.store'), [
        'name' => 'Hutan Bakau & Pesisir',
        'description' => 'Vegetasi mangrove pesisir pantai',
        'is_active' => true,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('categories', [
        'name' => 'Hutan Bakau & Pesisir',
        'slug' => 'hutan-bakau-pesisir',
    ]);
});

test('admin can export reports to CSV with audit trail', function () {
    Report::create([
        'created_by_user_id' => $this->communityUser->id,
        'category_id' => $this->category->id,
        'title' => 'Laporan Ekspor',
        'description' => 'Deskripsi laporan ekspor...',
        'latitude' => -0.155,
        'longitude' => 109.387,
        'report_status' => 'VERIFIED',
        'lock_version' => 1,
    ]);

    $response = $this->actingAs($this->admin)->get(route('admin.exports.reports'));
    $response->assertOk();
    $response->assertHeader('content-type', 'text/csv; charset=UTF-8');

    $this->assertDatabaseHas('audit_logs', [
        'actor_user_id' => $this->admin->id,
        'action' => 'REPORTS_EXPORTED_CSV',
    ]);
});

<?php

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Models\AuditLog;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\ReportStatusHistory;
use App\Models\User;

test('admin can transition report from SUBMITTED to UNDER_REVIEW', function () {
    $admin = User::factory()->create([
        'role' => UserRole::ADMIN,
    ]);

    $category = ReportCategory::create([
        'name' => 'Lahan Semak Belukar',
        'slug' => 'semak-belukar',
        'is_active' => true,
    ]);

    $report = Report::create([
        'category_id' => $category->id,
        'title' => 'Laporan Menunggu Review',
        'description' => 'Titik asap terlihat membubung.',
        'latitude' => -0.0500,
        'longitude' => 109.3500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'location_description' => 'Kubu Raya',
        'report_status' => ReportStatus::SUBMITTED,
        'fire_condition' => FireCondition::UNKNOWN,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $this->actingAs($admin);

    $response = $this->post(route('admin.reports.transition', ['report' => $report->id]), [
        'target_status' => ReportStatus::UNDER_REVIEW->value,
        'note' => 'Admin memulai proses penelaahan laporan.',
    ]);

    $response->assertRedirect();
    $report->refresh();

    expect($report->report_status)->toBe(ReportStatus::UNDER_REVIEW);

    // Verify status history
    $history = ReportStatusHistory::where('report_id', $report->id)
        ->where('to_status', ReportStatus::UNDER_REVIEW->value)
        ->first();
    expect($history)->not->toBeNull();
    expect($history->from_status)->toBe(ReportStatus::SUBMITTED->value);
    expect($history->actor_user_id)->toBe($admin->id);

    // Verify audit log
    $audit = AuditLog::where('entity_type', Report::class)
        ->where('entity_id', $report->id)
        ->where('action', 'REPORT_STATUS_TRANSITION')
        ->first();
    expect($audit)->not->toBeNull();
});

test('admin transitioning to NEEDS_INFORMATION requires clarification note', function () {
    $admin = User::factory()->create([
        'role' => UserRole::ADMIN,
    ]);

    $category = ReportCategory::create([
        'name' => 'Hutan Lindung',
        'slug' => 'hutan-lindung',
        'is_active' => true,
    ]);

    $report = Report::create([
        'category_id' => $category->id,
        'title' => 'Laporan Butuh Info',
        'description' => 'Laporan dengan deskripsi kurang detail.',
        'latitude' => -0.0500,
        'longitude' => 109.3500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'location_description' => 'Kubu Raya',
        'report_status' => ReportStatus::UNDER_REVIEW,
        'fire_condition' => FireCondition::UNKNOWN,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $this->actingAs($admin);

    // Transitioning to NEEDS_INFORMATION without note must fail validation
    $response = $this->post(route('admin.reports.transition', ['report' => $report->id]), [
        'target_status' => ReportStatus::NEEDS_INFORMATION->value,
        'note' => '',
    ]);

    $response->assertSessionHasErrors(['note']);
    $report->refresh();
    expect($report->report_status)->toBe(ReportStatus::UNDER_REVIEW);
});

test('admin transitioning to CLOSED_WITH_REASON requires close reason', function () {
    $admin = User::factory()->create([
        'role' => UserRole::ADMIN,
    ]);

    $category = ReportCategory::create([
        'name' => 'Lahan Pertanian',
        'slug' => 'lahan-tani',
        'is_active' => true,
    ]);

    $report = Report::create([
        'category_id' => $category->id,
        'title' => 'Laporan Duplikat Akan Ditutup',
        'description' => 'Laporan duplikat kejadian.',
        'latitude' => -0.0500,
        'longitude' => 109.3500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'location_description' => 'Kubu Raya',
        'report_status' => ReportStatus::UNDER_REVIEW,
        'fire_condition' => FireCondition::UNKNOWN,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $this->actingAs($admin);

    // Transitioning to CLOSED_WITH_REASON without reason must fail
    $response = $this->post(route('admin.reports.transition', ['report' => $report->id]), [
        'target_status' => ReportStatus::CLOSED_WITH_REASON->value,
        'reason' => '',
    ]);

    $response->assertSessionHasErrors(['reason']);
    $report->refresh();
    expect($report->report_status)->toBe(ReportStatus::UNDER_REVIEW);
});

test('invalid status transition is rejected by server state machine', function () {
    $admin = User::factory()->create([
        'role' => UserRole::ADMIN,
    ]);

    $category = ReportCategory::create([
        'name' => 'Lahan Kering',
        'slug' => 'lahan-kering',
        'is_active' => true,
    ]);

    // Report is currently SUBMITTED
    $report = Report::create([
        'category_id' => $category->id,
        'title' => 'Laporan Baru Masuk',
        'description' => 'Baru dikirim oleh masyarakat.',
        'latitude' => -0.0500,
        'longitude' => 109.3500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'location_description' => 'Kubu Raya',
        'report_status' => ReportStatus::SUBMITTED,
        'fire_condition' => FireCondition::UNKNOWN,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $this->actingAs($admin);

    // SUBMITTED cannot transition directly to RESOLVED_VERIFIED
    $response = $this->post(route('admin.reports.transition', ['report' => $report->id]), [
        'target_status' => ReportStatus::RESOLVED_VERIFIED->value,
        'reason' => 'Langsung diselesaikan tanpa penelaahan.',
    ]);

    $response->assertSessionHasErrors(['target_status']);
    $report->refresh();
    expect($report->report_status)->toBe(ReportStatus::SUBMITTED);
});

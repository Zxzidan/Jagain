<?php

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Models\AuditLog;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\User;

test('guests cannot access create report form and are redirected to login', function () {
    $response = $this->get(route('citizen.reports.create'));
    $response->assertRedirect(route('login'));
});

test('citizen can create report with valid Kalimantan coordinates and safety checklist', function () {
    $citizen = User::factory()->create([
        'role' => UserRole::COMMUNITY,
        'name' => 'Warga Pelapor',
        'phone' => '081234567890',
    ]);

    $category = ReportCategory::create([
        'name' => 'Lahan Gambut Kering',
        'slug' => 'lahan-gambut-kering',
        'is_active' => true,
    ]);

    $this->actingAs($citizen);

    $response = $this->post(route('citizen.reports.store'), [
        'category_id' => $category->id,
        'title' => 'Asap Pekat di Tepi Jalan Trans Kalimantan',
        'description' => 'Terlihat asap tebal membubung dari semak belukar kering di pinggir jalan.',
        'latitude' => -0.0500,
        'longitude' => 109.3500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'location_description' => 'KM 14 Tepi Jalan Trans Kalimantan',
        'reported_occurrence_at' => now()->format('Y-m-d\TH:i'),
        'safety_acknowledged' => true,
    ]);

    $report = Report::where('title', 'Asap Pekat di Tepi Jalan Trans Kalimantan')->first();
    expect($report)->not->toBeNull();
    expect($report->report_status)->toBe(ReportStatus::SUBMITTED);
    expect($report->fire_condition)->toBe(FireCondition::UNKNOWN);
    expect($report->tracking_code)->toStartWith('JGN-');
    expect($report->created_by_user_id)->toBe($citizen->id);

    // Verify AuditLog was recorded
    $audit = AuditLog::where('entity_type', Report::class)
        ->where('entity_id', $report->id)
        ->where('action', 'REPORT_SUBMITTED')
        ->first();
    expect($audit)->not->toBeNull();
    expect($audit->actor_user_id)->toBe($citizen->id);

    $response->assertRedirect(route('citizen.reports.show', ['tracking_code' => $report->tracking_code]));
});

test('report creation fails if coordinates are outside Kalimantan bounding box', function () {
    $citizen = User::factory()->create([
        'role' => UserRole::COMMUNITY,
    ]);

    $category = ReportCategory::create([
        'name' => 'Lahan Terbuka',
        'slug' => 'lahan-terbuka-2',
        'is_active' => true,
    ]);

    $this->actingAs($citizen);

    // Jakarta coordinates (-6.2088, 106.8456) are outside Kalimantan
    $response = $this->post(route('citizen.reports.store'), [
        'category_id' => $category->id,
        'title' => 'Titik Api Luar Kalimantan',
        'description' => 'Mencoba membuat laporan dengan koordinat di luar Kalimantan.',
        'latitude' => -6.2088,
        'longitude' => 106.8456,
        'province' => 'DKI Jakarta',
        'regency_city' => 'Jakarta Pusat',
        'location_description' => 'Monas',
        'safety_acknowledged' => true,
    ]);

    $response->assertSessionHasErrors(['latitude', 'longitude']);
    expect(Report::where('title', 'Titik Api Luar Kalimantan')->count())->toBe(0);
});

test('report creation fails if safety checklist is not confirmed', function () {
    $citizen = User::factory()->create([
        'role' => UserRole::COMMUNITY,
    ]);

    $category = ReportCategory::create([
        'name' => 'Hutan Produksi',
        'slug' => 'hutan-produksi',
        'is_active' => true,
    ]);

    $this->actingAs($citizen);

    $response = $this->post(route('citizen.reports.store'), [
        'category_id' => $category->id,
        'title' => 'Laporan Tanpa Ceklist Keselamatan',
        'description' => 'Mencoba mengirim tanpa menyetujui panduan keselamatan.',
        'latitude' => -0.0500,
        'longitude' => 109.3500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'location_description' => 'Sungai Raya',
        'safety_acknowledged' => false,
    ]);

    $response->assertSessionHasErrors(['safety_acknowledged']);
});

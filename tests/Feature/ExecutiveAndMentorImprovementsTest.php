<?php

use App\Enums\AssignmentStatus;
use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Models\Agency;
use App\Models\Assignment;
use App\Models\Category;
use App\Models\DataSource;
use App\Models\ExternalObservation;
use App\Models\OperationalUpdate;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('report status enum differentiates submitted and under review stage labels', function () {
    expect(ReportStatus::SUBMITTED->label())->toBe('Menunggu Verifikasi')
        ->and(ReportStatus::UNDER_REVIEW->label())->toBe('Dalam Peninjauan')
        ->and(ReportStatus::NEEDS_INFORMATION->label())->toBe('Membutuhkan Informasi Tambahan')
        ->and(ReportStatus::VERIFIED->label())->toBe('Terverifikasi')
        ->and(ReportStatus::DISPATCHED->label())->toBe('Diteruskan ke Instansi')
        ->and(ReportStatus::RESOLUTION_REVIEW->label())->toBe('Menunggu Validasi Penyelesaian')
        ->and(ReportStatus::RESOLVED_VERIFIED->label())->toBe('Selesai Terverifikasi')
        ->and(ReportStatus::CLOSED_WITH_REASON->label())->toBe('Ditutup dengan Alasan');
});

test('public report detail includes chronological status labels and agency operational updates without leaking reporter pii', function () {
    $category = Category::factory()->create(['name' => 'Kebakaran Lahan Gambut', 'slug' => 'gambut']);
    $reporter = User::factory()->create([
        'role' => UserRole::COMMUNITY,
        'name' => 'Rahasia Warga',
        'email' => 'rahasia@warga.id',
        'phone' => '081299998888',
    ]);
    $agency = Agency::create([
        'name' => 'BPBD Provinsi Kalimantan Barat',
        'code' => 'BPBD-KALBAR-TEST',
        'agency_type' => 'BPBD',
        'jurisdiction' => 'Kalimantan Barat',
        'is_active' => true,
    ]);
    $officer = User::factory()->create([
        'role' => UserRole::AGENCY,
    ]);

    $report = Report::create([
        'tracking_code' => 'JGN-2026-WIA001',
        'report_number' => 'JGN-2026-WIA001',
        'created_by_user_id' => $reporter->id,
        'category_id' => $category->id,
        'title' => '[BERAT] Kebakaran Gambut Kubu Raya',
        'description' => 'Asap tebal mengepul dari lahan gambut.',
        'latitude' => -0.155,
        'longitude' => 109.387,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'report_status' => ReportStatus::DISPATCHED,
        'fire_condition' => FireCondition::OBSERVED_CONTAINED,
    ]);

    ReportStatusHistory::create([
        'report_id' => $report->id,
        'changed_by_user_id' => $reporter->id,
        'from_status' => ReportStatus::VERIFIED->value,
        'to_status' => ReportStatus::DISPATCHED->value,
        'note' => 'Laporan telah diteruskan ke BPBD Kalbar.',
        'created_at' => now(),
    ]);

    $assignment = Assignment::create([
        'report_id' => $report->id,
        'agency_id' => $agency->id,
        'assigned_by_user_id' => $reporter->id,
        'assignment_status' => AssignmentStatus::IN_PROGRESS,
        'notes' => 'Segera lakukan penyekatan kanal.',
        'assigned_at' => now(),
    ]);

    OperationalUpdate::create([
        'assignment_id' => $assignment->id,
        'created_by_user_id' => $officer->id,
        'update_type' => 'FIELD_PROGRESS',
        'fire_condition_observed' => FireCondition::OBSERVED_CONTAINED->value,
        'note' => 'Tim lapangan telah membuat sekat kanal dan membasahi perimeter gambut.',
        'created_at' => now(),
    ]);

    $response = $this->get(route('public.reports.show', $report->tracking_code));

    $response->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('public/report-detail')
        ->where('report.tracking_code', 'JGN-2026-WIA001')
        ->where('report.status_label', 'Diteruskan ke Instansi')
        ->where('report.active_agency.name', 'BPBD Provinsi Kalimantan Barat')
        ->where('report.active_agency.assignment_status', 'IN_PROGRESS')
        ->where('report.active_agency.operational_updates.0.note', 'Tim lapangan telah membuat sekat kanal dan membasahi perimeter gambut.')
        ->missing('report.reporter_name')
        ->missing('report.reporter_phone')
        ->missing('report.reporter_email')
        ->missing('report.created_by_user_id')
    );
});

test('public map filters both citizen reports and satellite hotspot observations by province', function () {
    $category = Category::factory()->create(['name' => 'Gambut', 'slug' => 'gambut-map']);
    $user = User::factory()->create(['role' => UserRole::COMMUNITY]);
    $source = DataSource::create([
        'name' => 'NASA FIRMS Test',
        'code' => 'FIRMS-TEST',
        'source_type' => 'SATELLITE_HOTSPOT',
        'attribution_text' => 'NASA FIRMS & BMKG',
        'integration_status' => 'ACTIVE',
    ]);

    Report::create([
        'tracking_code' => 'JGN-2026-KB01',
        'report_number' => 'JGN-2026-KB01',
        'created_by_user_id' => $user->id,
        'category_id' => $category->id,
        'title' => 'Laporan Kalbar',
        'description' => 'Titik api di Kalbar',
        'latitude' => -0.05,
        'longitude' => 109.34,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kota Pontianak',
        'report_status' => ReportStatus::VERIFIED,
        'fire_condition' => FireCondition::OBSERVED_ACTIVE,
    ]);

    Report::create([
        'tracking_code' => 'JGN-2026-KT01',
        'report_number' => 'JGN-2026-KT01',
        'created_by_user_id' => $user->id,
        'category_id' => $category->id,
        'title' => 'Laporan Kalteng',
        'description' => 'Titik api di Kalteng',
        'latitude' => -2.21,
        'longitude' => 113.92,
        'province' => 'Kalimantan Tengah',
        'regency_city' => 'Kota Palangka Raya',
        'report_status' => ReportStatus::VERIFIED,
        'fire_condition' => FireCondition::OBSERVED_ACTIVE,
    ]);

    ExternalObservation::create([
        'data_source_id' => $source->id,
        'external_record_id' => 'OBS-KALBAR-1',
        'latitude' => -0.10,
        'longitude' => 109.40,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'confidence_level' => 'HIGH',
        'satellite_instrument' => 'VIIRS',
        'observed_at' => now(),
        'ingested_at' => now(),
        'is_simulated' => true,
    ]);

    ExternalObservation::create([
        'data_source_id' => $source->id,
        'external_record_id' => 'OBS-KALTENG-1',
        'latitude' => -2.25,
        'longitude' => 113.95,
        'province' => 'Kalimantan Tengah',
        'regency_city' => 'Kota Palangka Raya',
        'confidence_level' => 'HIGH',
        'satellite_instrument' => 'VIIRS',
        'observed_at' => now(),
        'ingested_at' => now(),
        'is_simulated' => true,
    ]);

    $response = $this->get(route('public.map', ['province' => 'Kalimantan Barat']));

    $response->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('public/map')
        ->has('reports', 1)
        ->where('reports.0.province', 'Kalimantan Barat')
        ->has('observations', 1)
        ->where('observations.0.province', 'Kalimantan Barat')
    );
});

test('executive users are redirected from generic dashboard to executive dashboard', function () {
    $executive = User::factory()->create(['role' => UserRole::EXECUTIVE]);

    $response = $this->actingAs($executive)->get(route('dashboard'));

    $response->assertRedirect(route('executive.dashboard'));
});

test('executive users can access executive dashboard with real database analytics props', function () {
    $executive = User::factory()->create(['role' => UserRole::EXECUTIVE]);

    $response = $this->actingAs($executive)->get(route('executive.dashboard'));

    $response->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('executive/dashboard')
        ->has('statusCounts')
        ->has('fireConditionCounts')
        ->has('kpis')
        ->has('provincialBreakdown', 5)
        ->has('trendSeries')
        ->has('agencyPerformance')
        ->has('dataIntegrity')
    );
});

test('executive role is strictly read-only and forbidden from mutating or accessing operational portals', function () {
    $executive = User::factory()->create(['role' => UserRole::EXECUTIVE]);

    // Cannot access Admin portal
    $this->actingAs($executive)->get(route('admin.dashboard'))->assertForbidden();

    // Cannot access OPD / Agency portal
    $this->actingAs($executive)->get(route('agency.dashboard'))->assertForbidden();

    // Cannot access citizen report creation form or submit reports
    $this->actingAs($executive)->get(route('citizen.reports.create'))->assertForbidden();
    $this->actingAs($executive)->post(route('citizen.reports.store'), [])->assertForbidden();
    $this->actingAs($executive)->post(route('reports.store'), [])->assertForbidden();
});

test('community and agency users cannot access executive dashboard', function () {
    $community = User::factory()->create(['role' => UserRole::COMMUNITY]);
    $agency = User::factory()->create(['role' => UserRole::AGENCY]);

    $this->actingAs($community)->get(route('executive.dashboard'))->assertForbidden();
    $this->actingAs($agency)->get(route('executive.dashboard'))->assertForbidden();
});

test('public home, map, and executive dashboard do not trigger lazy loading violations when assignments and operational updates exist', function () {
    \Illuminate\Database\Eloquent\Model::preventLazyLoading(true);

    $category = Category::factory()->create(['name' => 'Gambut', 'slug' => 'gambut-lazy']);
    $reporter = User::factory()->create(['role' => UserRole::COMMUNITY]);
    $executive = User::factory()->create(['role' => UserRole::EXECUTIVE]);
    $agency = Agency::create([
        'name' => 'BPBD Kalbar',
        'code' => 'BPBD-KB-LAZY',
        'agency_type' => 'BPBD',
        'jurisdiction' => 'Kalimantan Barat',
        'is_active' => true,
    ]);

    $report = Report::create([
        'tracking_code' => 'JGN-2026-LAZY01',
        'report_number' => 'JGN-2026-LAZY01',
        'created_by_user_id' => $reporter->id,
        'category_id' => $category->id,
        'title' => 'Laporan Uji Lazy Loading',
        'description' => 'Deskripsi uji',
        'latitude' => -0.05,
        'longitude' => 109.34,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kota Pontianak',
        'report_status' => ReportStatus::DISPATCHED,
        'fire_condition' => FireCondition::OBSERVED_ACTIVE,
        'visibility' => 'PUBLIC',
    ]);

    $assignment = Assignment::create([
        'report_id' => $report->id,
        'agency_id' => $agency->id,
        'assigned_by_user_id' => $reporter->id,
        'assignment_status' => AssignmentStatus::IN_PROGRESS,
        'assigned_at' => now(),
    ]);

    OperationalUpdate::create([
        'assignment_id' => $assignment->id,
        'created_by_user_id' => $reporter->id,
        'update_type' => 'FIELD_PROGRESS',
        'fire_condition_observed' => FireCondition::OBSERVED_ACTIVE->value,
        'note' => 'Pemadaman sedang berlangsung.',
        'created_at' => now(),
    ]);

    $this->get(route('home'))->assertOk();
    $this->get(route('public.map'))->assertOk();
    $this->get(route('public.reports.show', $report->tracking_code))->assertOk();
    $this->actingAs($executive)->get(route('executive.dashboard'))->assertOk();
});


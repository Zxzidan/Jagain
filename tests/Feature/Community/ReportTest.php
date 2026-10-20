<?php

use App\Enums\ReportStatus;
use App\Models\Evidence;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
});

test('unauthenticated users are redirected to login when visiting community dashboard', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('unauthenticated users are redirected to login when visiting reports list', function () {
    $response = $this->get(route('reports.index'));
    $response->assertRedirect(route('login'));
});

test('community member can visit dashboard and see metrics', function () {
    $user = User::factory()->create();

    // Create a report for this user
    Report::create([
        'report_number' => Report::generateReportNumber(),
        'created_by_user_id' => $user->id,
        'title' => 'Asap Tebal di Lahan Gambut',
        'category' => 'gambut',
        'description' => 'Terlihat kepulan asap tebal di lahan gambut sejak pagi hari.',
        'location_description' => 'Desa Taruna Sari Km 12',
        'latitude' => -2.2161,
        'longitude' => 113.9139,
        'report_status' => ReportStatus::SUBMITTED,
    ]);

    $response = $this->actingAs($user)->get(route('dashboard'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->has('metrics')
        ->where('metrics.total', 1)
        ->where('metrics.submitted', 1)
        ->has('recentReports', 1)
    );
});

test('community member can visit create report page', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('reports.create'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('community/reports/create'));
});

test('community member can submit a valid report and initial status is SUBMITTED', function () {
    $user = User::factory()->create();

    $reportData = [
        'title' => 'Titik Api Terpantau di Batas Hutan Produksi',
        'category' => 'hutan',
        'description' => 'Terlihat api membakar semak belukar dan mendekati pepohonan akasia.',
        'location_description' => 'Jl Trans Kalimantan Km 35, samping parit batas konsesi',
        'latitude' => -2.1500,
        'longitude' => 113.8200,
        'reported_occurrence_at' => now()->format('Y-m-d H:i:s'),
    ];

    $response = $this->actingAs($user)->post(route('reports.store'), $reportData);

    $report = Report::where('created_by_user_id', $user->id)->first();

    expect($report)->not->toBeNull();
    expect($report->report_status)->toBe(ReportStatus::SUBMITTED);
    expect($report->title)->toBe($reportData['title']);
    expect($report->report_number)->toStartWith('JGN-');

    // Initial status history must be logged
    $history = ReportStatusHistory::where('report_id', $report->id)->first();
    expect($history)->not->toBeNull();
    expect($history->to_status)->toBe(ReportStatus::SUBMITTED);
    expect($history->actor_user_id)->toBe($user->id);

    $response->assertRedirect(route('reports.show', $report));
    $response->assertSessionHas('success');
});

test('report submission validates required fields and coordinate ranges', function () {
    $user = User::factory()->create();

    // Invalid coordinates and missing fields
    $invalidData = [
        'title' => 'ab', // too short (min 5)
        'category' => 'invalid_category',
        'description' => 'pendek', // too short (min 10)
        'location_description' => '',
        'latitude' => 150.0, // out of range (-90 to 90)
        'longitude' => 250.0, // out of range (-180 to 180)
    ];

    $response = $this->actingAs($user)->post(route('reports.store'), $invalidData);

    $response->assertSessionHasErrors([
        'title',
        'category',
        'description',
        'location_description',
        'latitude',
        'longitude',
    ]);
});

test('community member can upload evidence photo with report', function () {
    $user = User::factory()->create();

    $file = UploadedFile::fake()->create('kebakaran.jpg', 500, 'image/jpeg');

    $reportData = [
        'title' => 'Kebakaran Semak Belukar Dekat Pemukiman',
        'category' => 'pemukiman',
        'description' => 'Api membakar semak di belakang pemukiman warga desa.',
        'location_description' => 'Desa Bukit Rawi, belakang kantor pos',
        'latitude' => -2.1800,
        'longitude' => 113.9500,
        'evidence' => $file,
    ];

    $response = $this->actingAs($user)->post(route('reports.store'), $reportData);

    $report = Report::where('created_by_user_id', $user->id)->first();
    expect($report)->not->toBeNull();

    $evidence = Evidence::where('report_id', $report->id)->first();
    expect($evidence)->not->toBeNull();
    expect($evidence->uploaded_by_user_id)->toBe($user->id);
    Storage::disk('public')->assertExists($evidence->storage_key);

    $response->assertRedirect(route('reports.show', $report));
});

test('evidence upload rejects non-image files', function () {
    $user = User::factory()->create();

    $fakeFile = UploadedFile::fake()->create('dokumen.pdf', 100, 'application/pdf');

    $reportData = [
        'title' => 'Laporan dengan Bukti Tidak Valid',
        'category' => 'hutan',
        'description' => 'Deskripsi valid untuk pengujian upload dokumen.',
        'location_description' => 'Lokasi valid',
        'latitude' => -2.1800,
        'longitude' => 113.9500,
        'evidence' => $fakeFile,
    ];

    $response = $this->actingAs($user)->post(route('reports.store'), $reportData);

    $response->assertSessionHasErrors(['evidence']);
});

test('community member can view only their own reports list and cannot see other users private reports', function () {
    $userA = User::factory()->create();
    $userB = User::factory()->create();

    // Report belonging to User A
    Report::create([
        'report_number' => 'JGN-20261020-0001',
        'created_by_user_id' => $userA->id,
        'title' => 'Laporan Milik User A',
        'category' => 'hutan',
        'description' => 'Deskripsi laporan User A.',
        'location_description' => 'Lokasi A',
        'latitude' => -2.0,
        'longitude' => 113.0,
        'report_status' => ReportStatus::SUBMITTED,
    ]);

    // Report belonging to User B
    Report::create([
        'report_number' => 'JGN-20261020-0002',
        'created_by_user_id' => $userB->id,
        'title' => 'Laporan Milik User B',
        'category' => 'gambut',
        'description' => 'Deskripsi laporan User B privat.',
        'location_description' => 'Lokasi B',
        'latitude' => -2.5,
        'longitude' => 114.0,
        'report_status' => ReportStatus::SUBMITTED,
    ]);

    // User A views reports list
    $response = $this->actingAs($userA)->get(route('reports.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('community/reports/index')
        ->has('reports.data', 1)
        ->where('reports.data.0.report_number', 'JGN-20261020-0001')
    );
});

test('community member cannot view another user private report detail (403 forbidden)', function () {
    $userA = User::factory()->create();
    $userB = User::factory()->create();

    $reportB = Report::create([
        'report_number' => 'JGN-20261020-0003',
        'created_by_user_id' => $userB->id,
        'title' => 'Laporan Rahasia User B',
        'category' => 'gambut',
        'description' => 'Deskripsi privat user B.',
        'location_description' => 'Lokasi B',
        'latitude' => -2.5,
        'longitude' => 114.0,
        'report_status' => ReportStatus::SUBMITTED,
        'visibility' => 'PRIVATE',
    ]);

    // User A tries to view User B's report
    $response = $this->actingAs($userA)->get(route('reports.show', $reportB));

    $response->assertForbidden();
});

test('community member can view their own report detail with history timeline', function () {
    $user = User::factory()->create();

    $report = Report::create([
        'report_number' => 'JGN-20261020-0004',
        'created_by_user_id' => $user->id,
        'title' => 'Laporan Kebakaran Lahan Sendiri',
        'category' => 'hutan',
        'description' => 'Deskripsi lengkap kejadian karhutla.',
        'location_description' => 'Sebangau Km 15',
        'latitude' => -2.3000,
        'longitude' => 113.8500,
        'report_status' => ReportStatus::SUBMITTED,
    ]);

    ReportStatusHistory::create([
        'report_id' => $report->id,
        'from_status' => null,
        'to_status' => ReportStatus::SUBMITTED,
        'actor_user_id' => $user->id,
        'note' => 'Laporan baru dibuat.',
    ]);

    $response = $this->actingAs($user)->get(route('reports.show', $report));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('community/reports/show')
        ->where('report.id', $report->id)
        ->where('report.report_number', 'JGN-20261020-0004')
        ->has('report.status_histories', 1)
    );
});

test('community member can provide additional information when report is in NEEDS_INFORMATION status', function () {
    $user = User::factory()->create();

    $report = Report::create([
        'report_number' => 'JGN-20261020-0005',
        'created_by_user_id' => $user->id,
        'title' => 'Laporan Membutuhkan Konfirmasi',
        'category' => 'gambut',
        'description' => 'Asap terlihat dari kejauhan.',
        'location_description' => 'Dekat sungai Kahayan',
        'latitude' => -2.2000,
        'longitude' => 113.9000,
        'report_status' => ReportStatus::NEEDS_INFORMATION,
        'information_requested' => 'Mohon sebutkan apakah asap masih membubung tinggi dan apakah dekat pemukiman.',
    ]);

    $response = $this->actingAs($user)->post(route('reports.additional-info', $report), [
        'additional_information' => 'Asap terpantau berjarak sekitar 500 meter dari pemukiman warga terdekat.',
    ]);

    $report->refresh();
    expect($report->report_status)->toBe(ReportStatus::UNDER_REVIEW);
    expect($report->additional_information)->toBe('Asap terpantau berjarak sekitar 500 meter dari pemukiman warga terdekat.');

    // Status history entry must be logged
    $latestHistory = ReportStatusHistory::where('report_id', $report->id)->latest('id')->first();
    expect($latestHistory->to_status)->toBe(ReportStatus::UNDER_REVIEW);
    expect($latestHistory->actor_user_id)->toBe($user->id);

    $response->assertRedirect(route('reports.show', $report));
    $response->assertSessionHas('success');
});

test('community member cannot provide additional information if report is not in NEEDS_INFORMATION status', function () {
    $user = User::factory()->create();

    $report = Report::create([
        'report_number' => 'JGN-20261020-0006',
        'created_by_user_id' => $user->id,
        'title' => 'Laporan Berstatus Terkirim',
        'category' => 'hutan',
        'description' => 'Laporan biasa.',
        'location_description' => 'Lokasi',
        'latitude' => -2.2,
        'longitude' => 113.9,
        'report_status' => ReportStatus::SUBMITTED, // Not NEEDS_INFORMATION
    ]);

    $response = $this->actingAs($user)->post(route('reports.additional-info', $report), [
        'additional_information' => 'Informasi tambahan yang tidak diminta.',
    ]);

    $response->assertForbidden();
});

test('user cannot provide additional information on another users report', function () {
    $userA = User::factory()->create();
    $userB = User::factory()->create();

    $reportB = Report::create([
        'report_number' => 'JGN-20261020-0007',
        'created_by_user_id' => $userB->id,
        'title' => 'Laporan User B',
        'category' => 'gambut',
        'description' => 'Laporan B.',
        'location_description' => 'Lokasi B',
        'latitude' => -2.2,
        'longitude' => 113.9,
        'report_status' => ReportStatus::NEEDS_INFORMATION,
        'information_requested' => 'Pertanyaan untuk user B.',
    ]);

    // User A attempts to submit additional info to User B's report
    $response = $this->actingAs($userA)->post(route('reports.additional-info', $reportB), [
        'additional_information' => 'Hacker mencoba mengirim jawaban.',
    ]);

    $response->assertForbidden();
});

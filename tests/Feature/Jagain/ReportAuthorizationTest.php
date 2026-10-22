<?php

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\User;

test('citizen can view their own report detail', function () {
    $citizen = User::factory()->create([
        'role' => UserRole::COMMUNITY,
    ]);

    $category = ReportCategory::create([
        'name' => 'Lahan Perkebunan',
        'slug' => 'lahan-perkebunan',
        'is_active' => true,
    ]);

    $report = Report::create([
        'created_by_user_id' => $citizen->id,
        'category_id' => $category->id,
        'title' => 'Laporan Milik Citizen A',
        'description' => 'Deskripsi laporan oleh Citizen A.',
        'latitude' => -1.2654,
        'longitude' => 116.8312,
        'province' => 'Kalimantan Timur',
        'regency_city' => 'Kota Balikpapan',
        'location_description' => 'Samboja Barat',
        'report_status' => ReportStatus::SUBMITTED,
        'fire_condition' => FireCondition::UNKNOWN,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $this->actingAs($citizen);

    $response = $this->get(route('citizen.reports.show', ['tracking_code' => $report->tracking_code]));
    $response->assertOk();
});

test('citizen B cannot view private report created by citizen A', function () {
    $citizenA = User::factory()->create([
        'role' => UserRole::COMMUNITY,
    ]);

    $citizenB = User::factory()->create([
        'role' => UserRole::COMMUNITY,
    ]);

    $category = ReportCategory::create([
        'name' => 'Lahan Semak',
        'slug' => 'lahan-semak',
        'is_active' => true,
    ]);

    $report = Report::create([
        'created_by_user_id' => $citizenA->id,
        'category_id' => $category->id,
        'title' => 'Laporan Privat Milik Citizen A',
        'description' => 'Deskripsi rahasia oleh Citizen A.',
        'latitude' => -1.2654,
        'longitude' => 116.8312,
        'province' => 'Kalimantan Timur',
        'regency_city' => 'Kota Balikpapan',
        'location_description' => 'Samboja Barat',
        'report_status' => ReportStatus::SUBMITTED,
        'fire_condition' => FireCondition::UNKNOWN,
        'visibility' => 'INTERNAL_ONLY',
        'is_simulated' => false,
    ]);

    // Citizen B tries to access Citizen A's report tracker
    $this->actingAs($citizenB);
    $response = $this->get(route('citizen.reports.show', ['tracking_code' => $report->tracking_code]));

    $response->assertForbidden();
});

test('non-admin users cannot access admin dashboard or reports queue', function () {
    $citizen = User::factory()->create([
        'role' => UserRole::COMMUNITY,
    ]);

    $this->actingAs($citizen);

    $response = $this->get(route('admin.dashboard'));
    $response->assertForbidden();

    $responseReports = $this->get(route('admin.reports.index'));
    $responseReports->assertForbidden();
});

test('admin user can access admin dashboard and review queue', function () {
    $admin = User::factory()->create([
        'role' => UserRole::ADMIN,
    ]);

    $this->actingAs($admin);

    $response = $this->get(route('admin.dashboard'));
    $response->assertOk();

    $responseReports = $this->get(route('admin.reports.index'));
    $responseReports->assertOk();
});

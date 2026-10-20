<?php

use App\Enums\AssignmentStatus;
use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Models\Agency;
use App\Models\AgencyMembership;
use App\Models\Assignment;
use App\Models\OperationalUpdate;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\User;

test('admin can assign report to agency and report status transitions to DISPATCHED', function () {
    $admin = User::factory()->create([
        'role' => UserRole::ADMIN,
    ]);

    $agency = Agency::create([
        'name' => 'BPBD Provinsi Kalimantan Barat',
        'code' => 'BPBD_KALBAR_TEST',
        'agency_type' => 'BPBD',
        'jurisdiction' => 'Provinsi Kalimantan Barat',
        'is_active' => true,
    ]);

    $category = ReportCategory::create([
        'name' => 'Hutan Produksi',
        'slug' => 'hutan-produksi-test',
        'is_active' => true,
    ]);

    $report = Report::create([
        'category_id' => $category->id,
        'title' => 'Karhutla Terverifikasi',
        'description' => 'Titik api aktif di area semak kering.',
        'latitude' => -0.0500,
        'longitude' => 109.3500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'location_description' => 'Kubu Raya',
        'report_status' => ReportStatus::VERIFIED,
        'fire_condition' => FireCondition::REPORTED_ACTIVE,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $this->actingAs($admin);

    $response = $this->post(route('admin.reports.assign', ['report' => $report->id]), [
        'agency_id' => $agency->id,
        'notes' => 'Tolong segera kirimkan regu pemadam terdekat.',
    ]);

    $response->assertRedirect();
    $report->refresh();

    expect($report->report_status)->toBe(ReportStatus::DISPATCHED);

    $assignment = Assignment::where('report_id', $report->id)
        ->where('agency_id', $agency->id)
        ->first();
    expect($assignment)->not->toBeNull();
    expect($assignment->assignment_status)->toBe(AssignmentStatus::ASSIGNED);
});

test('opd member can accept assignment for their agency', function () {
    $agency = Agency::create([
        'name' => 'BPBD Pontianak',
        'code' => 'BPBD_PTK_TEST',
        'agency_type' => 'BPBD',
        'jurisdiction' => 'Kota Pontianak',
        'is_active' => true,
    ]);

    $opdUser = User::factory()->create([
        'role' => UserRole::AGENCY,
    ]);

    AgencyMembership::create([
        'user_id' => $opdUser->id,
        'agency_id' => $agency->id,
        'membership_status' => 'ACTIVE',
        'role_in_agency' => 'OPERATOR',
    ]);

    $category = ReportCategory::create([
        'name' => 'Lahan Gambut',
        'slug' => 'lahan-gambut-opd',
        'is_active' => true,
    ]);

    $report = Report::create([
        'category_id' => $category->id,
        'title' => 'Karhutla Dekat Pontianak',
        'description' => 'Asap pekat di pinggir jalan.',
        'latitude' => -0.0500,
        'longitude' => 109.3500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kota Pontianak',
        'location_description' => 'Siantan',
        'report_status' => ReportStatus::DISPATCHED,
        'fire_condition' => FireCondition::REPORTED_ACTIVE,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $assignment = Assignment::create([
        'report_id' => $report->id,
        'agency_id' => $agency->id,
        'assigned_by_user_id' => $opdUser->id,
        'assignment_status' => AssignmentStatus::ASSIGNED,
        'assigned_at' => now(),
    ]);

    $this->actingAs($opdUser);

    $response = $this->post(route('agency.assignments.respond', ['assignment' => $assignment->id]), [
        'response_type' => 'ACCEPT',
    ]);
    $response->assertRedirect();

    $assignment->refresh();
    expect($assignment->assignment_status)->toBe(AssignmentStatus::RECEIVED_BY_AGENCY);
});

test('opd member can decline assignment with mandatory reason', function () {
    $agency = Agency::create([
        'name' => 'Manggala Agni Daops Ketapang',
        'code' => 'MA_KTP_TEST',
        'agency_type' => 'MANGGALA_AGNI',
        'jurisdiction' => 'Kabupaten Ketapang',
        'is_active' => true,
    ]);

    $opdUser = User::factory()->create([
        'role' => UserRole::AGENCY,
    ]);

    AgencyMembership::create([
        'user_id' => $opdUser->id,
        'agency_id' => $agency->id,
        'membership_status' => 'ACTIVE',
        'role_in_agency' => 'COMMANDER',
    ]);

    $category = ReportCategory::create([
        'name' => 'Hutan Lindung',
        'slug' => 'hutan-lindung-decline',
        'is_active' => true,
    ]);

    $report = Report::create([
        'category_id' => $category->id,
        'title' => 'Karhutla Luar Yurisdiksi',
        'description' => 'Titik api di luar radius jangkauan daops.',
        'latitude' => -1.8333,
        'longitude' => 109.9833,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Ketapang',
        'location_description' => 'Pedalaman Kendawangan',
        'report_status' => ReportStatus::DISPATCHED,
        'fire_condition' => FireCondition::REPORTED_ACTIVE,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $assignment = Assignment::create([
        'report_id' => $report->id,
        'agency_id' => $agency->id,
        'assigned_by_user_id' => $opdUser->id,
        'assignment_status' => AssignmentStatus::ASSIGNED,
        'assigned_at' => now(),
    ]);

    $this->actingAs($opdUser);

    // Decline without reason must fail
    $failResponse = $this->post(route('agency.assignments.respond', ['assignment' => $assignment->id]), [
        'response_type' => 'DECLINE',
        'decline_reason' => '',
    ]);
    $failResponse->assertSessionHasErrors(['decline_reason']);

    // Decline with valid reason succeeds
    $successResponse = $this->post(route('agency.assignments.respond', ['assignment' => $assignment->id]), [
        'response_type' => 'DECLINE',
        'decline_reason' => 'Lokasi berada di luar yurisdiksi operasional Daops Ketapang, rekomendasikan ke Damkar Kabupaten.',
    ]);
    $successResponse->assertRedirect();

    $assignment->refresh();
    expect($assignment->assignment_status)->toBe(AssignmentStatus::DECLINED_BY_AGENCY);
    expect($assignment->decline_reason)->toContain('di luar yurisdiksi');
});

test('opd member can add operational update and update fire condition with provenance', function () {
    $agency = Agency::create([
        'name' => 'Damkar Pontianak',
        'code' => 'DAMKAR_PTK_TEST',
        'agency_type' => 'DAMKAR',
        'jurisdiction' => 'Kota Pontianak',
        'is_active' => true,
    ]);

    $opdUser = User::factory()->create([
        'role' => UserRole::AGENCY,
        'name' => 'Petugas Lapangan Damkar',
    ]);

    AgencyMembership::create([
        'user_id' => $opdUser->id,
        'agency_id' => $agency->id,
        'membership_status' => 'ACTIVE',
        'role_in_agency' => 'FIELD_OFFICER',
    ]);

    $category = ReportCategory::create([
        'name' => 'Lahan Semak Belukar',
        'slug' => 'semak-damkar',
        'is_active' => true,
    ]);

    $report = Report::create([
        'category_id' => $category->id,
        'title' => 'Pemadaman Api Lahan',
        'description' => 'Api merambat di lahan semak.',
        'latitude' => -0.0500,
        'longitude' => 109.3500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kota Pontianak',
        'location_description' => 'Pontianak Utara',
        'report_status' => ReportStatus::DISPATCHED,
        'fire_condition' => FireCondition::REPORTED_ACTIVE,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $assignment = Assignment::create([
        'report_id' => $report->id,
        'agency_id' => $agency->id,
        'assigned_by_user_id' => $opdUser->id,
        'assignment_status' => AssignmentStatus::IN_PROGRESS,
        'assigned_at' => now(),
    ]);

    $this->actingAs($opdUser);

    $response = $this->post(route('agency.assignments.update-progress', ['assignment' => $assignment->id]), [
        'update_type' => 'EXTINGUISHING',
        'note' => 'Regu pemadam telah mendinginkan area bara api. Asap putih tipis tersisa, kondisi terkendali.',
        'fire_condition_observed' => FireCondition::OBSERVED_EXTINGUISHED->value,
    ]);

    $response->assertRedirect();

    // Verify operational update created
    $update = OperationalUpdate::where('assignment_id', $assignment->id)->first();
    expect($update)->not->toBeNull();
    expect($update->update_type)->toBe('EXTINGUISHING');
    expect($update->fire_condition_observed)->toBe(FireCondition::OBSERVED_EXTINGUISHED->value);

    // Verify report fire condition updated with provenance
    $report->refresh();
    expect($report->fire_condition)->toBe(FireCondition::OBSERVED_EXTINGUISHED);
    expect($report->fire_condition_source)->toContain('Petugas Lapangan Damkar');
});

test('opd member from Agency A cannot modify assignment of Agency B', function () {
    $agencyA = Agency::create([
        'name' => 'Agency A',
        'code' => 'AGENCY_A',
        'agency_type' => 'BPBD',
        'jurisdiction' => 'Wilayah A',
        'is_active' => true,
    ]);

    $agencyB = Agency::create([
        'name' => 'Agency B',
        'code' => 'AGENCY_B',
        'agency_type' => 'DAMKAR',
        'jurisdiction' => 'Wilayah B',
        'is_active' => true,
    ]);

    $userA = User::factory()->create([
        'role' => UserRole::AGENCY,
    ]);

    AgencyMembership::create([
        'user_id' => $userA->id,
        'agency_id' => $agencyA->id,
        'membership_status' => 'ACTIVE',
        'role_in_agency' => 'OFFICER',
    ]);

    $category = ReportCategory::create([
        'name' => 'Lahan Uji',
        'slug' => 'lahan-uji',
        'is_active' => true,
    ]);

    $report = Report::create([
        'category_id' => $category->id,
        'title' => 'Laporan Khusus Wilayah B',
        'description' => 'Ditugaskan ke Agency B.',
        'latitude' => -0.0500,
        'longitude' => 109.3500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kota Pontianak',
        'location_description' => 'Wilayah B',
        'report_status' => ReportStatus::DISPATCHED,
        'fire_condition' => FireCondition::REPORTED_ACTIVE,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $assignmentB = Assignment::create([
        'report_id' => $report->id,
        'agency_id' => $agencyB->id,
        'assigned_by_user_id' => $userA->id,
        'assignment_status' => AssignmentStatus::ASSIGNED,
        'assigned_at' => now(),
    ]);

    // User A from Agency A tries to accept Agency B's assignment
    $this->actingAs($userA);
    $response = $this->post(route('agency.assignments.respond', ['assignment' => $assignmentB->id]), [
        'response_type' => 'ACCEPT',
    ]);

    $response->assertForbidden();
});

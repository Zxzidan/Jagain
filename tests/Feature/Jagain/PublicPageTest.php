<?php

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Models\DataSource;
use App\Models\ExternalObservation;
use App\Models\Report;
use App\Models\ReportCategory;
use Inertia\Testing\AssertableInertia as Assert;

test('public home page renders successfully with emergency notice and real data metrics', function () {
    $category = ReportCategory::create([
        'name' => 'Kebakaran Hutan Gambut',
        'slug' => 'hutan-gambut',
        'is_active' => true,
    ]);

    Report::create([
        'category_id' => $category->id,
        'title' => 'Asap Tebal Dekat Pemukiman',
        'description' => 'Terlihat kepulan asap tebal dari arah lahan gambut.',
        'latitude' => -0.0263,
        'longitude' => 109.3425,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kota Pontianak',
        'location_description' => 'Siantan Hulu',
        'report_status' => ReportStatus::VERIFIED,
        'fire_condition' => FireCondition::REPORTED_ACTIVE,
        'fire_condition_source' => 'Verifikasi Lapangan',
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
        'reporter_name' => 'Warga Pontianak Rahasia',
        'reporter_phone' => '081234567890',
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/home')
        ->has('stats')
        ->where('stats.verified_reports', 1)
        ->has('recentReports', 1)
    );
});

test('public map endpoint returns reports and satellite observations', function () {
    $category = ReportCategory::create([
        'name' => 'Lahan Pertanian Terbakar',
        'slug' => 'lahan-pertanian',
        'is_active' => true,
    ]);

    Report::create([
        'category_id' => $category->id,
        'title' => 'Titik Asap Lahan Kubu Raya',
        'description' => 'Asap pekat membubung tinggi di sekitar kebun warga.',
        'latitude' => -0.1000,
        'longitude' => 109.4000,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'location_description' => 'Sungai Raya Dalam',
        'report_status' => ReportStatus::VERIFIED,
        'fire_condition' => FireCondition::REPORTED_ACTIVE,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
    ]);

    $dataSource = DataSource::create([
        'name' => 'Satelit SNPP VIIRS (Dataset Simulasi)',
        'code' => 'NASA_FIRMS_VIIRS',
        'source_type' => 'SATELLITE_HOTSPOT',
        'attribution_text' => 'NASA FIRMS / BRIN Karhutla (Data Simulasi Uji Coba)',
        'integration_status' => 'SIMULATED',
    ]);

    ExternalObservation::create([
        'data_source_id' => $dataSource->id,
        'external_record_id' => 'HOTSPOT-TEST-001',
        'satellite_instrument' => 'VIIRS SNPP',
        'confidence_level' => 'HIGH',
        'brightness_kelvin' => 362.5,
        'frp_mw' => 45.2,
        'latitude' => -0.1500,
        'longitude' => 109.4500,
        'province' => 'Kalimantan Barat',
        'regency_city' => 'Kabupaten Kubu Raya',
        'observed_at' => now(),
        'ingested_at' => now(),
        'is_simulated' => true,
    ]);

    $response = $this->get(route('public.map'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/map')
        ->has('reports', 1)
        ->has('observations', 1)
        ->where('observations.0.is_simulated', true)
    );
});

test('public report detail endpoint redacts reporter private information', function () {
    $category = ReportCategory::create([
        'name' => 'Kebakaran Lahan Terbuka',
        'slug' => 'lahan-terbuka',
        'is_active' => true,
    ]);

    $report = Report::create([
        'category_id' => $category->id,
        'title' => 'Lahan Gambut Kering Terbakar',
        'description' => 'Titik api terlihat di dekat batas konsesi.',
        'latitude' => -2.2100,
        'longitude' => 113.9200,
        'province' => 'Kalimantan Tengah',
        'regency_city' => 'Kota Palangka Raya',
        'location_description' => 'Jekan Raya',
        'report_status' => ReportStatus::VERIFIED,
        'fire_condition' => FireCondition::REPORTED_ACTIVE,
        'visibility' => 'PUBLIC',
        'is_simulated' => false,
        'reporter_name' => 'Budi Santoso Pribadi',
        'reporter_phone' => '081299998888',
    ]);

    $response = $this->get(route('public.reports.show', ['tracking_code' => $report->tracking_code]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('public/report-detail')
        ->has('report')
        ->where('report.title', 'Lahan Gambut Kering Terbakar')
    );
    // Verify PII is NOT in the public response
    $response->assertDontSee('Budi Santoso Pribadi');
    $response->assertDontSee('081299998888');
});

<?php

namespace Database\Seeders;

use App\Enums\AssignmentStatus;
use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Enums\UserRole;
use App\Models\Agency;
use App\Models\AgencyMembership;
use App\Models\Assignment;
use App\Models\AssignmentHistory;
use App\Models\DataSource;
use App\Models\ExternalObservation;
use App\Models\OperationalUpdate;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Users for all 3 roles
        $admin = User::firstOrCreate(
            ['email' => 'admin@jagain.id'],
            [
                'name' => 'Admin Pengendali Karhutla',
                'password' => Hash::make('password'),
                'role' => UserRole::ADMIN,
                'phone' => '08110000001',
                'email_verified_at' => now(),
            ]
        );

        $opdKalbarUser = User::firstOrCreate(
            ['email' => 'opd.kalbar@jagain.id'],
            [
                'name' => 'Petugas Pusdalops BPBD Kalbar',
                'password' => Hash::make('password'),
                'role' => UserRole::AGENCY,
                'phone' => '08120000002',
                'email_verified_at' => now(),
            ]
        );

        $opdKaltengUser = User::firstOrCreate(
            ['email' => 'opd.kalteng@jagain.id'],
            [
                'name' => 'Petugas Manggala Agni Kalteng',
                'password' => Hash::make('password'),
                'role' => UserRole::AGENCY,
                'phone' => '08130000003',
                'email_verified_at' => now(),
            ]
        );

        $citizen = User::firstOrCreate(
            ['email' => 'warga@jagain.id'],
            [
                'name' => 'Budi Santoso (Masyarakat)',
                'password' => Hash::make('password'),
                'role' => UserRole::COMMUNITY,
                'phone' => '08190000004',
                'email_verified_at' => now(),
            ]
        );

        // 2. Seed Agencies
        $bpbdKalbar = Agency::firstOrCreate(
            ['code' => 'BPBD-KALBAR'],
            [
                'name' => 'BPBD Provinsi Kalimantan Barat',
                'agency_type' => 'BPBD',
                'jurisdiction' => 'Kalimantan Barat',
                'contact_email' => 'pusdalops@bpbd.kalbarprov.go.id',
                'contact_phone' => '0561-732001',
                'is_active' => true,
            ]
        );

        $manggalaKalteng = Agency::firstOrCreate(
            ['code' => 'MANGGALA-KALTENG'],
            [
                'name' => 'Manggala Agni Daops Palangka Raya',
                'agency_type' => 'MANGGALA_AGNI',
                'jurisdiction' => 'Kalimantan Tengah',
                'contact_email' => 'daops.palangkaraya@menlhk.go.id',
                'contact_phone' => '0536-322100',
                'is_active' => true,
            ]
        );

        $bpbdKalsel = Agency::firstOrCreate(
            ['code' => 'BPBD-KALSEL'],
            [
                'name' => 'BPBD Provinsi Kalimantan Selatan',
                'agency_type' => 'BPBD',
                'jurisdiction' => 'Kalimantan Selatan',
                'contact_email' => 'pusdalops@kalselprov.go.id',
                'contact_phone' => '0511-477000',
                'is_active' => true,
            ]
        );

        $disdamkarPontianak = Agency::firstOrCreate(
            ['code' => 'DISDAMKAR-PONTIANAK'],
            [
                'name' => 'Dinas Kebakaran & Penyelamatan Kota Pontianak',
                'agency_type' => 'DISDAMKAR',
                'jurisdiction' => 'Kalimantan Barat',
                'contact_email' => 'damkar@pontianakkota.go.id',
                'contact_phone' => '0561-113',
                'is_active' => true,
            ]
        );

        // 3. Link Agency Memberships
        AgencyMembership::firstOrCreate(
            ['user_id' => $opdKalbarUser->id, 'agency_id' => $bpbdKalbar->id],
            ['membership_status' => 'ACTIVE', 'role_in_agency' => 'OFFICER']
        );

        AgencyMembership::firstOrCreate(
            ['user_id' => $opdKaltengUser->id, 'agency_id' => $manggalaKalteng->id],
            ['membership_status' => 'ACTIVE', 'role_in_agency' => 'OFFICER']
        );

        // 4. Seed Categories
        $catGambut = ReportCategory::firstOrCreate(
            ['slug' => 'lahan-gambut'],
            [
                'name' => 'Kebakaran Lahan Gambut',
                'description' => 'Kebakaran pada lapisan gambut yang berpotensi menyala di bawah permukaan dan menghasilkan kabut asap pekat.',
                'is_active' => true,
            ]
        );

        $catHutan = ReportCategory::firstOrCreate(
            ['slug' => 'hutan-lindung'],
            [
                'name' => 'Kebakaran Hutan Lindung/Konservasi',
                'description' => 'Titik api di dalam atau berbatasan langsung dengan area kawasan hutan tutupan negara.',
                'is_active' => true,
            ]
        );

        $catSemak = ReportCategory::firstOrCreate(
            ['slug' => 'semak-belukar'],
            [
                'name' => 'Kebakaran Lahan Terbuka / Semak Belukar',
                'description' => 'Api pada lahan tidur, semak belukar, atau perkebunan terbuka.',
                'is_active' => true,
            ]
        );

        $catPemukiman = ReportCategory::firstOrCreate(
            ['slug' => 'dekat-pemukiman'],
            [
                'name' => 'Kebakaran Dekat Fasilitas / Pemukiman',
                'description' => 'Titik kebakaran yang berjarak dekat (< 500m) dari rumah tinggal, jalan poros, atau fasilitas publik.',
                'is_active' => true,
            ]
        );

        $catAsap = ReportCategory::firstOrCreate(
            ['slug' => 'asap-pekat'],
            [
                'name' => 'Dampak Asap Pekat & Penurunan Visibilitas',
                'description' => 'Laporan kepulan asap tebal tanpa terlihat kobaran langsung yang mengganggu pernapasan atau lalu lintas.',
                'is_active' => true,
            ]
        );

        // 5. Seed Data Sources
        $dsCommunity = DataSource::firstOrCreate(
            ['code' => 'COMMUNITY_JAGAIN'],
            [
                'name' => 'Laporan Masyarakat JAGAIN',
                'source_type' => 'COMMUNITY',
                'attribution_text' => 'Pelaporan langsung oleh warga terverifikasi melalui aplikasi JAGAIN',
                'integration_status' => 'ACTIVE',
            ]
        );

        $dsNasa = DataSource::firstOrCreate(
            ['code' => 'NASA_FIRMS_SIM'],
            [
                'name' => 'NASA FIRMS VIIRS/MODIS (Data Simulasi)',
                'source_type' => 'SATELLITE_HOTSPOT',
                'attribution_text' => 'Dataset simulasi titik panas satelit format NASA FIRMS (bukan koneksi API produksi langsung)',
                'integration_status' => 'SIMULATION_ONLY',
                'last_successful_sync_at' => now()->subHours(2),
            ]
        );

        $dsSipongi = DataSource::firstOrCreate(
            ['code' => 'SIPONGI_KLHK_SIM'],
            [
                'name' => 'Sipongi+ KLHK (Data Simulasi)',
                'source_type' => 'SATELLITE_HOTSPOT',
                'attribution_text' => 'Dataset simulasi sistem monitoring kebakaran hutan KLHK',
                'integration_status' => 'SIMULATION_ONLY',
                'last_successful_sync_at' => now()->subHours(4),
            ]
        );

        // 6. Seed Realistic Reports across Kalimantan
        // Report 1: Dispatched to BPBD Kalbar (Active)
        $report1 = Report::create([
            'tracking_code' => 'JGN-202610-KB01',
            'created_by_user_id' => $citizen->id,
            'category_id' => $catGambut->id,
            'title' => 'Asap Tebal dan Api di Lahan Gambut Rasau Jaya',
            'description' => 'Terlihat kobaran api di parit sekunder lahan gambut sekitar 300 meter dari jalan poros. Asap putih tebal terbawa angin ke arah barat.',
            'latitude' => -0.1832000,
            'longitude' => 109.3871000,
            'province' => 'Kalimantan Barat',
            'regency_city' => 'Kabupaten Kubu Raya',
            'location_description' => 'Kecamatan Rasau Jaya Tiga, dekat saluran irigasi sekunder blok D',
            'reported_occurrence_at' => now()->subHours(5),
            'report_status' => ReportStatus::DISPATCHED,
            'fire_condition' => FireCondition::REPORTED_ACTIVE,
            'fire_condition_source' => 'Laporan masyarakat terverifikasi',
            'fire_condition_observed_at' => now()->subHours(4),
            'visibility' => 'PUBLIC',
            'is_simulated' => false,
            'reporter_name' => 'Budi Santoso',
            'reporter_phone' => '08190000004',
        ]);

        ReportStatusHistory::create([
            'report_id' => $report1->id,
            'from_status' => null,
            'to_status' => ReportStatus::SUBMITTED->value,
            'actor_user_id' => $citizen->id,
            'note' => 'Laporan dikirim masyarakat',
            'created_at' => now()->subHours(5),
        ]);

        ReportStatusHistory::create([
            'report_id' => $report1->id,
            'from_status' => ReportStatus::SUBMITTED->value,
            'to_status' => ReportStatus::VERIFIED->value,
            'actor_user_id' => $admin->id,
            'note' => 'Lokasi dan laporan telah diperiksa silang via citra sebaran asap',
            'created_at' => now()->subHours(4),
        ]);

        ReportStatusHistory::create([
            'report_id' => $report1->id,
            'from_status' => ReportStatus::VERIFIED->value,
            'to_status' => ReportStatus::DISPATCHED->value,
            'actor_user_id' => $admin->id,
            'note' => 'Ditugaskan ke BPBD Kalimantan Barat untuk pemadaman darat',
            'created_at' => now()->subHours(3),
        ]);

        $assignment1 = Assignment::create([
            'report_id' => $report1->id,
            'agency_id' => $bpbdKalbar->id,
            'assigned_by_user_id' => $admin->id,
            'assignment_status' => AssignmentStatus::IN_PROGRESS,
            'assigned_at' => now()->subHours(3),
            'notes' => 'Prioritas pemadaman awal agar tidak merembet ke kebun sawit warga',
        ]);

        AssignmentHistory::create([
            'assignment_id' => $assignment1->id,
            'from_status' => null,
            'to_status' => AssignmentStatus::ASSIGNED->value,
            'actor_user_id' => $admin->id,
            'note' => 'Penugasan dibuat oleh admin',
            'created_at' => now()->subHours(3),
        ]);

        AssignmentHistory::create([
            'assignment_id' => $assignment1->id,
            'from_status' => AssignmentStatus::ASSIGNED->value,
            'to_status' => AssignmentStatus::RECEIVED_BY_AGENCY->value,
            'actor_user_id' => $opdKalbarUser->id,
            'note' => 'Diterima oleh Pusdalops BPBD Kalbar, regu 2 meluncur',
            'created_at' => now()->subHours(2)->subMinutes(30),
        ]);

        AssignmentHistory::create([
            'assignment_id' => $assignment1->id,
            'from_status' => AssignmentStatus::RECEIVED_BY_AGENCY->value,
            'to_status' => AssignmentStatus::IN_PROGRESS->value,
            'actor_user_id' => $opdKalbarUser->id,
            'note' => 'Tim sudah di lokasi bersama 2 unit pompa portabel dan selang 300 meter',
            'created_at' => now()->subHours(2),
        ]);

        OperationalUpdate::create([
            'assignment_id' => $assignment1->id,
            'created_by_user_id' => $opdKalbarUser->id,
            'update_type' => 'CONTAINMENT',
            'note' => 'Sedang dilakukan penyekatan dan pembasahan (mopping up) area batas lahan gambut. Sumber air dari parit primer mencukupi.',
            'fire_condition_observed' => FireCondition::OBSERVED_ACTIVE->value,
            'created_at' => now()->subHours(1),
        ]);

        // Report 2: Needs information in Palangka Raya
        $report2 = Report::create([
            'tracking_code' => 'JGN-202610-KT02',
            'created_by_user_id' => $citizen->id,
            'category_id' => $catSemak->id,
            'title' => 'Asap Pekat di Jalan Tjilik Riwut Km 14',
            'description' => 'Tercium bau sangit dan kabut asap mulai masuk jalan raya utama. Titik api persis di dalam semak belum jelas.',
            'latitude' => -2.1554000,
            'longitude' => 113.8242000,
            'province' => 'Kalimantan Tengah',
            'regency_city' => 'Kota Palangka Raya',
            'location_description' => 'Jalan Tjilik Riwut Km 14, seberang SPBU',
            'reported_occurrence_at' => now()->subHours(8),
            'report_status' => ReportStatus::NEEDS_INFORMATION,
            'fire_condition' => FireCondition::UNKNOWN,
            'visibility' => 'PUBLIC',
            'is_simulated' => false,
            'information_requested' => 'Mohon tambahkan perkiraan jarak titik api dari tepi jalan aspal dan apakah ada patok penanda terdekat untuk mempermudah navigasi regu darat.',
            'reporter_name' => 'Budi Santoso',
            'reporter_phone' => '08190000004',
        ]);

        ReportStatusHistory::create([
            'report_id' => $report2->id,
            'from_status' => null,
            'to_status' => ReportStatus::SUBMITTED->value,
            'actor_user_id' => $citizen->id,
            'note' => 'Laporan awal warga',
            'created_at' => now()->subHours(8),
        ]);

        ReportStatusHistory::create([
            'report_id' => $report2->id,
            'from_status' => ReportStatus::SUBMITTED->value,
            'to_status' => ReportStatus::NEEDS_INFORMATION->value,
            'actor_user_id' => $admin->id,
            'note' => 'Meminta kejelasan posisi masuk titik api dari jalan besar',
            'created_at' => now()->subHours(6),
        ]);

        // Report 3: Resolved & Verified in Banjarbaru
        $report3 = Report::create([
            'tracking_code' => 'JGN-202610-KS03',
            'created_by_user_id' => $citizen->id,
            'category_id' => $catPemukiman->id,
            'title' => 'Kebakaran Semak Belukar Dekat Kompleks Perumahan Guntung Manggis',
            'description' => 'Api sempat membesar dan mendekati pagar belakang rumah warga. Angin kencang.',
            'latitude' => -3.4561000,
            'longitude' => 114.8123000,
            'province' => 'Kalimantan Selatan',
            'regency_city' => 'Kota Banjarbaru',
            'location_description' => 'Belakang Kompleks Griya Utama blok B, Kelurahan Guntung Manggis',
            'reported_occurrence_at' => now()->subDays(1),
            'report_status' => ReportStatus::RESOLVED_VERIFIED,
            'fire_condition' => FireCondition::OBSERVED_EXTINGUISHED,
            'fire_condition_source' => 'Pemeriksaan lapangan dan laporan akhir BPBD Kalsel',
            'fire_condition_observed_at' => now()->subHours(10),
            'visibility' => 'PUBLIC',
            'is_simulated' => false,
            'reporter_name' => 'Budi Santoso',
            'reporter_phone' => '08190000004',
        ]);

        ReportStatusHistory::create([
            'report_id' => $report3->id,
            'from_status' => null,
            'to_status' => ReportStatus::SUBMITTED->value,
            'actor_user_id' => $citizen->id,
            'created_at' => now()->subDays(1),
        ]);

        ReportStatusHistory::create([
            'report_id' => $report3->id,
            'from_status' => ReportStatus::SUBMITTED->value,
            'to_status' => ReportStatus::DISPATCHED->value,
            'actor_user_id' => $admin->id,
            'created_at' => now()->subHours(20),
        ]);

        ReportStatusHistory::create([
            'report_id' => $report3->id,
            'from_status' => ReportStatus::DISPATCHED->value,
            'to_status' => ReportStatus::RESOLUTION_REVIEW->value,
            'actor_user_id' => $admin->id,
            'created_at' => now()->subHours(12),
        ]);

        ReportStatusHistory::create([
            'report_id' => $report3->id,
            'from_status' => ReportStatus::RESOLUTION_REVIEW->value,
            'to_status' => ReportStatus::RESOLVED_VERIFIED->value,
            'actor_user_id' => $admin->id,
            'note' => 'Penanganan tuntas. Dilakukan pendinginan menyeluruh dan ground check memastikan tidak ada bara aktif tersisa.',
            'created_at' => now()->subHours(10),
        ]);

        $assignment3 = Assignment::create([
            'report_id' => $report3->id,
            'agency_id' => $bpbdKalsel->id,
            'assigned_by_user_id' => $admin->id,
            'assignment_status' => AssignmentStatus::COMPLETED,
            'assigned_at' => now()->subHours(20),
            'notes' => 'Telah dipadamkan dan disekat bersama relawan pemadam kebakaran',
        ]);

        // Report 4: Newly Submitted (Queue)
        $report4 = Report::create([
            'tracking_code' => 'JGN-202610-KB04',
            'created_by_user_id' => $citizen->id,
            'category_id' => $catHutan->id,
            'title' => 'Dugaan Titik Api di Perbatasan Hutan Lindung Gunung Palung',
            'description' => 'Terlihat kolom asap membubung tinggi dari arah bukit timur. Lokasi terpencil belum terjangkau jalan mobil.',
            'latitude' => -1.2185000,
            'longitude' => 110.1450000,
            'province' => 'Kalimantan Barat',
            'regency_city' => 'Kabupaten Kayong Utara',
            'location_description' => 'Lereng timur laut kawasan penyangga, dekat Desa Sedahan Jaya',
            'reported_occurrence_at' => now()->subMinutes(45),
            'report_status' => ReportStatus::SUBMITTED,
            'fire_condition' => FireCondition::UNKNOWN,
            'visibility' => 'PUBLIC',
            'is_simulated' => false,
            'reporter_name' => 'Budi Santoso',
            'reporter_phone' => '08190000004',
        ]);

        ReportStatusHistory::create([
            'report_id' => $report4->id,
            'from_status' => null,
            'to_status' => ReportStatus::SUBMITTED->value,
            'actor_user_id' => $citizen->id,
            'note' => 'Laporan masuk dari aplikasi warga',
            'created_at' => now()->subMinutes(45),
        ]);

        // 7. Seed Simulated External Observations (Hotspots) - explicitly labeled IS_SIMULATED = true
        ExternalObservation::create([
            'data_source_id' => $dsNasa->id,
            'external_record_id' => 'MODIS-20261020-001-SIM',
            'satellite_instrument' => 'MODIS (Aqua)',
            'confidence_level' => 'high',
            'brightness_kelvin' => 348.5,
            'frp_mw' => 42.8,
            'latitude' => -2.3120000,
            'longitude' => 113.1250000,
            'province' => 'Kalimantan Tengah',
            'regency_city' => 'Kabupaten Kotawaringin Timur',
            'observed_at' => now()->subHours(3),
            'ingested_at' => now()->subHours(2),
            'is_simulated' => true,
            'raw_metadata' => [
                'daynight' => 'D',
                'satellite' => 'A',
                'version' => '6.1N',
                'dataset_label' => 'DATASET SIMULASI KALIMANTAN',
            ],
        ]);

        ExternalObservation::create([
            'data_source_id' => $dsNasa->id,
            'external_record_id' => 'VIIRS-20261020-002-SIM',
            'satellite_instrument' => 'VIIRS (Suomi NPP)',
            'confidence_level' => 'nominal',
            'brightness_kelvin' => 328.2,
            'frp_mw' => 18.4,
            'latitude' => -0.0540000,
            'longitude' => 109.1120000,
            'province' => 'Kalimantan Barat',
            'regency_city' => 'Kabupaten Mempawah',
            'observed_at' => now()->subHours(4),
            'ingested_at' => now()->subHours(2),
            'is_simulated' => true,
            'raw_metadata' => [
                'daynight' => 'D',
                'satellite' => 'NPP',
                'dataset_label' => 'DATASET SIMULASI KALIMANTAN',
            ],
        ]);

        ExternalObservation::create([
            'data_source_id' => $dsSipongi->id,
            'external_record_id' => 'SIPONGI-20261020-003-SIM',
            'satellite_instrument' => 'Sipongi+ Thermal Ingest',
            'confidence_level' => 'nominal',
            'brightness_kelvin' => 335.0,
            'frp_mw' => 25.0,
            'latitude' => -3.2100000,
            'longitude' => 114.9200000,
            'province' => 'Kalimantan Selatan',
            'regency_city' => 'Kabupaten Tanah Laut',
            'observed_at' => now()->subHours(5),
            'ingested_at' => now()->subHours(4),
            'is_simulated' => true,
            'raw_metadata' => [
                'system' => 'Sipongi+ Web Hook Simulation',
                'dataset_label' => 'DATASET SIMULASI KALIMANTAN',
            ],
        ]);
    }
}

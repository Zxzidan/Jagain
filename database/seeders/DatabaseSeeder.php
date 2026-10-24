<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Agency;
use App\Models\AgencyMembership;
use App\Models\Assignment;
use App\Models\AssignmentHistory;
use App\Models\AuditLog;
use App\Models\Category;
use App\Models\DataSource;
use App\Models\Evidence;
use App\Models\ExternalObservation;
use App\Models\Report;
use App\Models\ReportCategory;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Users
        $admin = User::firstOrCreate(
            ['email' => 'admin@jagain.id'],
            [
                'name' => 'Administrator JAGAIN',
                'password' => Hash::make('password'),
                'role' => UserRole::ADMIN,
                'phone' => '08110000001',
                'account_status' => 'active',
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
                'account_status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        $agencyUser = User::firstOrCreate(
            ['email' => 'petugas@bpbd.go.id'],
            [
                'name' => 'Budi Santoso (BPBD Kalbar)',
                'password' => Hash::make('password'),
                'role' => UserRole::AGENCY,
                'phone' => '08120000005',
                'account_status' => 'active',
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
                'account_status' => 'active',
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
                'account_status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        $communityUser = User::firstOrCreate(
            ['email' => 'warga@gmail.com'],
            [
                'name' => 'Ahmad Rinaldi',
                'password' => Hash::make('password'),
                'role' => UserRole::COMMUNITY,
                'phone' => '08190000006',
                'account_status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // 2. Categories
        $categoriesData = [
            ['name' => 'Kebakaran Lahan Gambut', 'slug' => 'lahan-gambut', 'description' => 'Kebakaran di area bertanah gambut dengan kepulan asap tebal.', 'is_active' => true],
            ['name' => 'Kebakaran Hutan Lindung & Konservasi', 'slug' => 'hutan-lindung', 'description' => 'Kawasan hutan lindung, taman nasional, dan suaka alam.', 'is_active' => true],
            ['name' => 'Kebakaran Perkebunan & Pertanian', 'slug' => 'perkebunan-pertanian', 'description' => 'Area perkebunan kelapa sawit, karet, atau ladang pertanian.', 'is_active' => true],
            ['name' => 'Kebakaran Semak Belukar & Padang Ilalang', 'slug' => 'semak-belukar', 'description' => 'Lahan terbuka vegetasi kering mudah terbakar.', 'is_active' => true],
            ['name' => 'Kebakaran Sekitar Pemukiman Warga', 'slug' => 'area-pemukiman', 'description' => 'Titik kebakaran yang mendekati batas pemukiman dan infrastruktur desa.', 'is_active' => true],
        ];

        $categories = [];
        foreach ($categoriesData as $data) {
            $cat = Category::firstOrCreate(['slug' => $data['slug']], $data);
            $categories[$data['slug']] = $cat;

            // Also seed ReportCategory if table exists
            try {
                ReportCategory::firstOrCreate(['slug' => $data['slug']], $data);
            } catch (\Throwable) {
                // Table might not exist or be same
            }
        }

        // 3. Agencies
        $bpbdKalbar = Agency::firstOrCreate(
            ['name' => 'BPBD Provinsi Kalimantan Barat'],
            [
                'code' => 'BPBD-KALBAR',
                'agency_type' => 'BPBD',
                'jurisdiction' => 'Kalimantan Barat',
                'contact_email' => 'pusdalops@bpbd.kalbarprov.go.id',
                'contact_phone' => '0561-732001',
                'is_active' => true,
            ]
        );

        $manggalaKalteng = Agency::firstOrCreate(
            ['name' => 'Manggala Agni Daops Palangka Raya'],
            [
                'code' => 'MANGGALA-KALTENG',
                'agency_type' => 'MANGGALA_AGNI',
                'jurisdiction' => 'Kalimantan Tengah',
                'contact_email' => 'daops.palangkaraya@menlhk.go.id',
                'contact_phone' => '0536-322100',
                'is_active' => true,
            ]
        );

        $bpbdKalsel = Agency::firstOrCreate(
            ['name' => 'BPBD Provinsi Kalimantan Selatan'],
            [
                'code' => 'BPBD-KALSEL',
                'agency_type' => 'BPBD',
                'jurisdiction' => 'Kalimantan Selatan',
                'contact_email' => 'pusdalops@kalselprov.go.id',
                'contact_phone' => '0511-477000',
                'is_active' => true,
            ]
        );

        $disdamkarPontianak = Agency::firstOrCreate(
            ['name' => 'Dinas Kebakaran & Penyelamatan Kota Pontianak'],
            [
                'code' => 'DISDAMKAR-PONTIANAK',
                'agency_type' => 'DISDAMKAR',
                'jurisdiction' => 'Kota Pontianak',
                'contact_email' => 'damkar@pontianakkota.go.id',
                'contact_phone' => '0561-113',
                'is_active' => true,
            ]
        );

        // Agency Memberships
        AgencyMembership::firstOrCreate(
            ['user_id' => $opdKalbarUser->id, 'agency_id' => $bpbdKalbar->id],
            ['membership_status' => 'ACTIVE', 'role_in_agency' => 'OFFICER']
        );

        AgencyMembership::firstOrCreate(
            ['user_id' => $agencyUser->id, 'agency_id' => $bpbdKalbar->id],
            ['membership_status' => 'ACTIVE', 'role_in_agency' => 'OFFICER']
        );

        AgencyMembership::firstOrCreate(
            ['user_id' => $opdKaltengUser->id, 'agency_id' => $manggalaKalteng->id],
            ['membership_status' => 'ACTIVE', 'role_in_agency' => 'OFFICER']
        );

        // 4. Data Sources
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
                'name' => 'NASA FIRMS Hotspots Ingest (Simulasi)',
                'source_type' => 'SATELLITE',
                'attribution_text' => 'Dataset Hotspot Satelit MODIS & VIIRS (Simulasi Kalbar/Kalteng)',
                'integration_status' => 'ACTIVE',
            ]
        );

        if (ExternalObservation::count() === 0) {
            $hotspots = [
                [
                    'data_source_id' => $dsNasa->id,
                    'external_record_id' => 'HOTSPOT-SIM-KB01',
                    'satellite_instrument' => 'VIIRS SNPP',
                    'confidence_level' => 'high',
                    'brightness_kelvin' => 365.20,
                    'frp_mw' => 48.50,
                    'latitude' => -0.1620000,
                    'longitude' => 109.3950000,
                    'province' => 'Kalimantan Barat',
                    'regency_city' => 'Kabupaten Kubu Raya',
                    'observed_at' => now()->subHours(2),
                    'is_simulated' => true,
                ],
                [
                    'data_source_id' => $dsNasa->id,
                    'external_record_id' => 'HOTSPOT-SIM-KB02',
                    'satellite_instrument' => 'MODIS Aqua',
                    'confidence_level' => 'nominal',
                    'brightness_kelvin' => 342.10,
                    'frp_mw' => 22.30,
                    'latitude' => -0.0910000,
                    'longitude' => 109.4450000,
                    'province' => 'Kalimantan Barat',
                    'regency_city' => 'Kabupaten Kubu Raya',
                    'observed_at' => now()->subHours(4),
                    'is_simulated' => true,
                ],
                [
                    'data_source_id' => $dsNasa->id,
                    'external_record_id' => 'HOTSPOT-SIM-KT01',
                    'satellite_instrument' => 'VIIRS NOAA-20',
                    'confidence_level' => 'high',
                    'brightness_kelvin' => 378.00,
                    'frp_mw' => 65.10,
                    'latitude' => -2.2350000,
                    'longitude' => 113.8900000,
                    'province' => 'Kalimantan Tengah',
                    'regency_city' => 'Kota Palangka Raya',
                    'observed_at' => now()->subHours(1),
                    'is_simulated' => true,
                ],
            ];

            foreach ($hotspots as $hotspot) {
                ExternalObservation::create($hotspot);
            }
        }

        // 5. Sample Reports
        $gambutCat = $categories['lahan-gambut'];
        $hutanCat = $categories['hutan-lindung'];
        $semakCat = $categories['semak-belukar'];
        $pemukimanCat = $categories['area-pemukiman'];

        if (Report::where('tracking_code', 'JGN-202610-KB01')->doesntExist()) {
            $report1 = Report::create([
                'tracking_code' => 'JGN-202610-KB01',
                'report_number' => 'JGN-202610-KB01',
                'created_by_user_id' => $citizen->id,
                'category_id' => $gambutCat->id,
                'category' => $gambutCat->slug,
                'title' => 'Asap Pekat di Area Gambut Rasau Jaya Km 14',
                'description' => 'Kepulan asap putih pekat merayap dari lantai gambut bekas ladang. Terlihat titik bara api membakar semak pakis di parit sekunder.',
                'latitude' => -0.1558230,
                'longitude' => 109.3872340,
                'province' => 'Kalimantan Barat',
                'regency_city' => 'Kabupaten Kubu Raya',
                'location_description' => 'Parit H. Ali, Dusun Mekar Sari, Desa Rasau Jaya Tiga, sekitar 400m dari jalan poros',
                'reported_occurrence_at' => now()->subHours(8),
                'report_status' => 'VERIFIED',
                'fire_condition' => 'OBSERVED_ACTIVE',
                'fire_condition_source' => 'Petugas BPBD Kalbar (Verifikasi Lapangan)',
                'fire_condition_observed_at' => now()->subHours(6),
                'visibility' => 'PUBLIC',
                'is_simulated' => false,
                'lock_version' => 2,
                'reporter_name' => 'Budi Santoso',
                'reporter_phone' => '08190000004',
            ]);

            ReportStatusHistory::create([
                'report_id' => $report1->id,
                'from_status' => null,
                'to_status' => 'SUBMITTED',
                'actor_user_id' => $citizen->id,
                'note' => 'Laporan masuk dari aplikasi warga',
                'created_at' => now()->subHours(8),
            ]);

            ReportStatusHistory::create([
                'report_id' => $report1->id,
                'from_status' => 'SUBMITTED',
                'to_status' => 'UNDER_REVIEW',
                'actor_user_id' => $admin->id,
                'note' => 'Admin memulai proses telaah dokumen dan koordinat laporan.',
                'created_at' => now()->subHours(7),
            ]);

            ReportStatusHistory::create([
                'report_id' => $report1->id,
                'from_status' => 'UNDER_REVIEW',
                'to_status' => 'VERIFIED',
                'actor_user_id' => $admin->id,
                'note' => 'Laporan telah diverifikasi memenuhi kriteria validitas dan lokasi.',
                'created_at' => now()->subHours(6),
            ]);

            Evidence::create([
                'report_id' => $report1->id,
                'uploaded_by_user_id' => $citizen->id,
                'file_path' => 'evidence/sample_karhutla_1.jpg',
                'storage_key' => 'evidence/sample_karhutla_1.jpg',
                'original_filename' => 'foto_lapangan_gambut.jpg',
                'media_type' => 'image/jpeg',
                'size_bytes' => 1024 * 450,
                'caption' => 'Kondisi asap tebal merambat di atas lahan gambut',
                'visibility' => 'PUBLIC',
                'captured_at' => now()->subHours(8),
            ]);

            $assignment1 = Assignment::create([
                'report_id' => $report1->id,
                'agency_id' => $bpbdKalbar->id,
                'assigned_by_user_id' => $admin->id,
                'assignment_status' => 'IN_PROGRESS',
                'assigned_at' => now()->subHours(5),
                'notes' => 'Harap segera lakukan ground check dan sekat basah di parit perbatasan',
            ]);

            AssignmentHistory::create([
                'assignment_id' => $assignment1->id,
                'from_status' => null,
                'to_status' => 'ASSIGNED',
                'actor_user_id' => $admin->id,
                'note' => 'Penugasan diteruskan ke BPBD Kalbar.',
                'created_at' => now()->subHours(5),
            ]);

            AuditLog::create([
                'actor_user_id' => $admin->id,
                'action' => 'REPORT_STATUS_TRANSITION',
                'entity_type' => 'Report',
                'entity_id' => $report1->id,
                'reason' => 'Verifikasi administratif dan validasi lapangan',
                'request_id' => (string) Str::uuid(),
                'created_at' => now()->subHours(6),
            ]);

            // Report 2: Needs Information
            $report2 = Report::create([
                'tracking_code' => 'JGN-202610-KB02',
                'report_number' => 'JGN-202610-KB02',
                'created_by_user_id' => $communityUser->id,
                'category_id' => $semakCat->id,
                'category' => $semakCat->slug,
                'title' => 'Titik Asap Mencurigakan di Ambawang Km 18',
                'description' => 'Api membakar semak belukar pinggir jalan, jarak pandang mulai berkurang hingga kurang dari 100 meter.',
                'latitude' => -0.0821450,
                'longitude' => 109.4321900,
                'province' => 'Kalimantan Barat',
                'regency_city' => 'Kabupaten Kubu Raya',
                'location_description' => 'Jl. Trans Kalimantan Km 18, Ambawang',
                'reported_occurrence_at' => now()->subHours(6),
                'report_status' => 'NEEDS_INFORMATION',
                'fire_condition' => 'REPORTED_ACTIVE',
                'visibility' => 'PUBLIC',
                'is_simulated' => false,
                'lock_version' => 1,
                'information_requested' => 'Mohon berikan patok kilometer atau nama bangunan penanda di sekitar lokasi.',
            ]);

            ReportStatusHistory::create([
                'report_id' => $report2->id,
                'from_status' => 'UNDER_REVIEW',
                'to_status' => 'NEEDS_INFORMATION',
                'actor_user_id' => $admin->id,
                'note' => 'Meminta kejelasan titik koordinat detail dari patok terdekat.',
                'public_note' => 'Mohon berikan patok kilometer atau nama bangunan penanda di sekitar lokasi.',
                'created_at' => now()->subHours(4),
            ]);

            // Report 3: Resolved
            $report3 = Report::create([
                'tracking_code' => 'JGN-202610-KB03',
                'report_number' => 'JGN-202610-KB03',
                'created_by_user_id' => $citizen->id,
                'category_id' => $pemukimanCat->id,
                'category' => $pemukimanCat->slug,
                'title' => 'Penanganan Karhutla Selesai di Wajok Hilir',
                'description' => 'Operasi pembasahan total selesai dengan bukti foto drone dan catatan pemadaman.',
                'latitude' => 0.0345600,
                'longitude' => 109.2845600,
                'province' => 'Kalimantan Barat',
                'regency_city' => 'Kabupaten Mempawah',
                'location_description' => 'Desa Wajok Hilir, Kec. Jongkat, Kab. Mempawah',
                'reported_occurrence_at' => now()->subDays(2),
                'report_status' => 'RESOLVED_VERIFIED',
                'fire_condition' => 'OBSERVED_EXTINGUISHED',
                'visibility' => 'PUBLIC',
                'is_simulated' => false,
                'lock_version' => 4,
            ]);

            ReportStatusHistory::create([
                'report_id' => $report3->id,
                'from_status' => 'RESOLUTION_REVIEW',
                'to_status' => 'RESOLVED_VERIFIED',
                'actor_user_id' => $admin->id,
                'note' => 'Penanganan tuntas. Pemadaman selesai dan observasi memastikan tidak ada bara aktif tersisa.',
                'created_at' => now()->subDays(1),
            ]);

            // Report 4: Newly Submitted
            $report4 = Report::create([
                'tracking_code' => 'JGN-202610-KB04',
                'report_number' => 'JGN-202610-KB04',
                'created_by_user_id' => $citizen->id,
                'category_id' => $hutanCat->id,
                'category' => $hutanCat->slug,
                'title' => 'Dugaan Titik Api di Perbatasan Hutan Lindung Gunung Palung',
                'description' => 'Terlihat kolom asap membubung tinggi dari arah bukit timur. Lokasi terpencil belum terjangkau jalan mobil.',
                'latitude' => -1.2185000,
                'longitude' => 110.1450000,
                'province' => 'Kalimantan Barat',
                'regency_city' => 'Kabupaten Kayong Utara',
                'location_description' => 'Lereng timur laut kawasan penyangga, dekat Desa Sedahan Jaya',
                'reported_occurrence_at' => now()->subMinutes(45),
                'report_status' => 'SUBMITTED',
                'fire_condition' => 'UNKNOWN',
                'visibility' => 'PUBLIC',
                'is_simulated' => false,
                'lock_version' => 1,
                'reporter_name' => 'Budi Santoso',
                'reporter_phone' => '08190000004',
            ]);

            ReportStatusHistory::create([
                'report_id' => $report4->id,
                'from_status' => null,
                'to_status' => 'SUBMITTED',
                'actor_user_id' => $citizen->id,
                'note' => 'Laporan masuk dari aplikasi warga',
                'created_at' => now()->subMinutes(45),
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\AgencyMembership;
use App\Models\Assignment;
use App\Models\AssignmentHistory;
use App\Models\AuditLog;
use App\Models\Category;
use App\Models\Evidence;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Users
        $admin = User::firstOrCreate(
            ['email' => 'admin@jagain.id'],
            [
                'name' => 'Administrator JAGAIN',
                'password' => Hash::make('password'),
                'role' => 'ADMIN',
                'account_status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        $agencyUser = User::firstOrCreate(
            ['email' => 'petugas@bpbd.go.id'],
            [
                'name' => 'Budi Santoso (BPBD Kalbar)',
                'password' => Hash::make('password'),
                'role' => 'AGENCY',
                'account_status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        $communityUser = User::firstOrCreate(
            ['email' => 'warga@gmail.com'],
            [
                'name' => 'Ahmad Rinaldi',
                'password' => Hash::make('password'),
                'role' => 'COMMUNITY',
                'account_status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // 2. Categories
        $categoriesData = [
            ['name' => 'Lahan Gambut', 'slug' => 'lahan-gambut', 'description' => 'Kebakaran di area bertanah gambut dengan kepulan asap tebal.'],
            ['name' => 'Hutan Lindung & Konservasi', 'slug' => 'hutan-lindung', 'description' => 'Kawasan hutan lindung, taman nasional, dan suaka alam.'],
            ['name' => 'Perkebunan & Pertanian', 'slug' => 'perkebunan-pertanian', 'description' => 'Area perkebunan kelapa sawit, karet, atau ladang pertanian.'],
            ['name' => 'Semak Belukar & Padang Ilalang', 'slug' => 'semak-belukar', 'description' => 'Lahan terbuka vegetasi kering mudah terbakar.'],
            ['name' => 'Sekitar Pemukiman Warga', 'slug' => 'area-pemukiman', 'description' => 'Titik kebakaran yang mendekati batas pemukiman dan infrastruktur desa.'],
        ];

        $categories = [];
        foreach ($categoriesData as $data) {
            $categories[$data['slug']] = Category::firstOrCreate(['slug' => $data['slug']], $data);
        }

        // 3. Agencies
        $agenciesData = [
            [
                'name' => 'BPBD Provinsi Kalimantan Barat',
                'agency_type' => 'BPBD',
                'jurisdiction' => 'Kalimantan Barat',
                'is_active' => true,
            ],
            [
                'name' => 'BPBD Provinsi Kalimantan Tengah',
                'agency_type' => 'BPBD',
                'jurisdiction' => 'Kalimantan Tengah',
                'is_active' => true,
            ],
            [
                'name' => 'Manggala Agni Daops Pontianak',
                'agency_type' => 'MANGGALA_AGNI',
                'jurisdiction' => 'Kalimantan Barat',
                'is_active' => true,
            ],
            [
                'name' => 'Dinas Pemadam Kebakaran & Penyelamatan Kota Pontianak',
                'agency_type' => 'DAMKAR',
                'jurisdiction' => 'Kota Pontianak',
                'is_active' => true,
            ],
            [
                'name' => 'BPBD Kabupaten Kubu Raya',
                'agency_type' => 'BPBD',
                'jurisdiction' => 'Kabupaten Kubu Raya',
                'is_active' => true,
            ],
        ];

        $agencies = [];
        foreach ($agenciesData as $data) {
            $agencies[] = Agency::firstOrCreate(['name' => $data['name']], $data);
        }

        // Link Agency Membership
        AgencyMembership::firstOrCreate(
            ['user_id' => $agencyUser->id, 'agency_id' => $agencies[0]->id],
            ['membership_status' => 'active']
        );

        // 4. Sample Reports in different stages
        $sampleReports = [
            [
                'title' => 'Asap Tebal Terlihat di Lahan Gambut Rasau Jaya',
                'description' => 'Kepulan asap putih pekat membubung tinggi sejak pukul 11 siang di dekat parit perbatasan kebun warga. Api merambat di bawah permukaan gambut.',
                'category_id' => $categories['lahan-gambut']->id,
                'latitude' => -0.1558230,
                'longitude' => 109.3872340,
                'location_description' => 'Desa Rasau Jaya Tiga, Kec. Rasau Jaya, Kab. Kubu Raya',
                'reported_occurrence_at' => now()->subHours(3),
                'report_status' => 'SUBMITTED',
                'is_simulated' => false,
            ],
            [
                'title' => 'Kebakaran Semak Belukar Dekat Jalan Trans Kalimantan',
                'description' => 'Api membakar semak belukar pinggir jalan, jarak pandang mulai berkurang hingga kurang dari 100 meter bagi pengendara motor.',
                'category_id' => $categories['semak-belukar']->id,
                'latitude' => -0.0821450,
                'longitude' => 109.4321900,
                'location_description' => 'Jl. Trans Kalimantan Km 18, Ambawang, Kubu Raya',
                'reported_occurrence_at' => now()->subHours(6),
                'report_status' => 'UNDER_REVIEW',
                'is_simulated' => false,
            ],
            [
                'title' => 'Titik Asap Mencurigakan di Perbatasan Hutan Lindung Palangka Raya',
                'description' => 'Warga melihat titik asap dari arah kawasan hutan lindung sebelah utara desa. Belum dapat dipastikan luas area yang terbakar.',
                'category_id' => $categories['hutan-lindung']->id,
                'latitude' => -2.1894210,
                'longitude' => 113.8821400,
                'location_description' => 'Kel. Sebangau Mulya, Palangka Raya, Kalimantan Tengah',
                'reported_occurrence_at' => now()->subHours(12),
                'report_status' => 'NEEDS_INFORMATION',
                'is_simulated' => false,
            ],
            [
                'title' => 'Pembakaran Lahan Perkebunan Meluas di Kubu Raya',
                'description' => 'Lahan bekas tebasan dibakar dan api merembet ke parit pembatas. Angin kencang mengarah ke barat laut.',
                'category_id' => $categories['perkebunan-pertanian']->id,
                'latitude' => -0.1245900,
                'longitude' => 109.3512300,
                'location_description' => 'Desa Limbung, Kec. Sungai Raya, Kab. Kubu Raya',
                'reported_occurrence_at' => now()->subDay(),
                'report_status' => 'VERIFIED',
                'is_simulated' => false,
            ],
            [
                'title' => 'Kebakaran Gambut Aktif di Sebangau',
                'description' => 'Regu patroli desa melaporkan api permukaan dan api bawah tanah di pinggir kanal sekunder.',
                'category_id' => $categories['lahan-gambut']->id,
                'latitude' => -2.2567800,
                'longitude' => 113.9145600,
                'location_description' => 'Kawasan Penyangga TN Sebangau, Pulang Pisau',
                'reported_occurrence_at' => now()->subDays(2),
                'report_status' => 'DISPATCHED',
                'is_simulated' => false,
            ],
            [
                'title' => 'Titik Api Dekat Kawasan Pemukiman Siantan Hilir',
                'description' => 'Telah dilakukan pendinginan oleh regu damkar gabungan. Menunggu verifikasi akhir dari tim pengawas.',
                'category_id' => $categories['area-pemukiman']->id,
                'latitude' => -0.0156700,
                'longitude' => 109.3245600,
                'location_description' => 'Kec. Pontianak Utara, Kota Pontianak',
                'reported_occurrence_at' => now()->subDays(3),
                'report_status' => 'RESOLUTION_REVIEW',
                'is_simulated' => false,
            ],
            [
                'title' => 'Penanganan Karhutla Selesai di Wajok Hilir',
                'description' => 'Operasi pembasahan total selesai dengan bukti foto drone dan catatan pemadaman.',
                'category_id' => $categories['semak-belukar']->id,
                'latitude' => 0.0345600,
                'longitude' => 109.2845600,
                'location_description' => 'Desa Wajok Hilir, Kec. Jongkat, Kab. Mempawah',
                'reported_occurrence_at' => now()->subDays(5),
                'report_status' => 'RESOLVED_VERIFIED',
                'is_simulated' => false,
            ],
            [
                'title' => 'Laporan Duplikat Kebakaran Pasar',
                'description' => 'Laporan kebakaran ruko bukan merupakan kebakaran hutan atau lahan.',
                'category_id' => $categories['area-pemukiman']->id,
                'latitude' => -0.0245600,
                'longitude' => 109.3345600,
                'location_description' => 'Pasar Mawar, Kota Pontianak',
                'reported_occurrence_at' => now()->subDays(6),
                'report_status' => 'CLOSED_WITH_REASON',
                'is_simulated' => false,
            ],
        ];

        foreach ($sampleReports as $index => $repData) {
            $report = Report::create([
                'created_by_user_id' => $communityUser->id,
                'category_id' => $repData['category_id'],
                'title' => $repData['title'],
                'description' => $repData['description'],
                'latitude' => $repData['latitude'],
                'longitude' => $repData['longitude'],
                'location_description' => $repData['location_description'],
                'reported_occurrence_at' => $repData['reported_occurrence_at'],
                'report_status' => $repData['report_status'],
                'visibility' => 'PUBLIC',
                'is_simulated' => $repData['is_simulated'],
                'lock_version' => 1,
                'actual_fire_condition' => 'REPORTED_ACTIVE',
                'created_at' => $repData['reported_occurrence_at'],
                'updated_at' => now(),
            ]);

            // Add Initial Status History
            ReportStatusHistory::create([
                'report_id' => $report->id,
                'from_status' => null,
                'to_status' => 'SUBMITTED',
                'actor_user_id' => $communityUser->id,
                'note' => 'Laporan baru dikirimkan oleh pelapor.',
                'created_at' => $repData['reported_occurrence_at'],
            ]);

            // Add sample evidence
            Evidence::create([
                'report_id' => $report->id,
                'uploaded_by_user_id' => $communityUser->id,
                'storage_key' => 'evidence/sample_karhutla_'.($index + 1).'.jpg',
                'original_filename' => 'foto_lapangan_'.($index + 1).'.jpg',
                'media_type' => 'image/jpeg',
                'size_bytes' => 1024 * 450,
                'captured_at' => $repData['reported_occurrence_at'],
                'visibility' => 'PUBLIC',
            ]);

            // If under review
            if (in_array($repData['report_status'], ['UNDER_REVIEW', 'NEEDS_INFORMATION', 'VERIFIED', 'DISPATCHED', 'RESOLUTION_REVIEW', 'RESOLVED_VERIFIED', 'CLOSED_WITH_REASON'], true)) {
                ReportStatusHistory::create([
                    'report_id' => $report->id,
                    'from_status' => 'SUBMITTED',
                    'to_status' => 'UNDER_REVIEW',
                    'actor_user_id' => $admin->id,
                    'note' => 'Admin memulai proses telaah dokumen dan koordinat laporan.',
                    'created_at' => $repData['reported_occurrence_at']->copy()->addMinutes(15),
                ]);
            }

            if ($repData['report_status'] === 'NEEDS_INFORMATION') {
                ReportStatusHistory::create([
                    'report_id' => $report->id,
                    'from_status' => 'UNDER_REVIEW',
                    'to_status' => 'NEEDS_INFORMATION',
                    'actor_user_id' => $admin->id,
                    'note' => 'Meminta kejelasan titik koordinat detail dari patok terdekat.',
                    'public_note' => 'Mohon tambahkan informasi patok kilometer jalan atau patok batas kebun terdekat untuk memudahkan petugas menemukan lokasi.',
                    'created_at' => $repData['reported_occurrence_at']->copy()->addMinutes(30),
                ]);
            }

            if (in_array($repData['report_status'], ['VERIFIED', 'DISPATCHED', 'RESOLUTION_REVIEW', 'RESOLVED_VERIFIED'], true)) {
                ReportStatusHistory::create([
                    'report_id' => $report->id,
                    'from_status' => 'UNDER_REVIEW',
                    'to_status' => 'VERIFIED',
                    'actor_user_id' => $admin->id,
                    'note' => 'Laporan telah diverifikasi memenuhi kriteria validitas dan lokasi.',
                    'created_at' => $repData['reported_occurrence_at']->copy()->addMinutes(45),
                ]);
            }

            if (in_array($repData['report_status'], ['DISPATCHED', 'RESOLUTION_REVIEW', 'RESOLVED_VERIFIED'], true)) {
                $assignment = Assignment::create([
                    'report_id' => $report->id,
                    'agency_id' => $agencies[0]->id,
                    'assigned_by_user_id' => $admin->id,
                    'assignment_status' => 'IN_PROGRESS',
                    'assigned_at' => $repData['reported_occurrence_at']->copy()->addHour(),
                ]);

                AssignmentHistory::create([
                    'assignment_id' => $assignment->id,
                    'from_status' => null,
                    'to_status' => 'ASSIGNED',
                    'actor_user_id' => $admin->id,
                    'note' => 'Penugasan diteruskan ke BPBD Kalbar.',
                    'created_at' => $repData['reported_occurrence_at']->copy()->addHour(),
                ]);

                ReportStatusHistory::create([
                    'report_id' => $report->id,
                    'from_status' => 'VERIFIED',
                    'to_status' => 'DISPATCHED',
                    'actor_user_id' => $admin->id,
                    'note' => 'Ditugaskan ke BPBD Provinsi Kalimantan Barat.',
                    'created_at' => $repData['reported_occurrence_at']->copy()->addHour(),
                ]);
            }

            if ($repData['report_status'] === 'CLOSED_WITH_REASON') {
                ReportStatusHistory::create([
                    'report_id' => $report->id,
                    'from_status' => 'UNDER_REVIEW',
                    'to_status' => 'CLOSED_WITH_REASON',
                    'actor_user_id' => $admin->id,
                    'reason' => 'Bukan Karhutla / Laporan Tidak Sesuai Kategori',
                    'note' => 'Laporan ditutup karena objek adalah kebakaran gedung perkotaan, sudah ditangani pihak damkar kota.',
                    'created_at' => $repData['reported_occurrence_at']->copy()->addMinutes(30),
                ]);
            }

            // Create initial audit log
            AuditLog::create([
                'actor_user_id' => $admin->id,
                'action' => 'REPORT_REVIEW_UPDATED',
                'entity_type' => 'Report',
                'entity_id' => $report->id,
                'reason' => "Proses peninjauan laporan #{$report->id}",
                'request_id' => (string) Str::uuid(),
                'created_at' => now(),
            ]);
        }
    }
}

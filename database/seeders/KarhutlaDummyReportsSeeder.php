<?php

namespace Database\Seeders;

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Models\Category;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Database\Seeder;

class KarhutlaDummyReportsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        if (! $user) {
            $user = User::create([
                'name' => 'Warga Pelapor JAGAIN',
                'email' => 'pelapor@jagain.id',
                'password' => bcrypt('password'),
                'role' => 'COMMUNITY',
                'email_verified_at' => now(),
            ]);
        }

        $categories = Category::all()->keyBy('slug');
        $gambutId = $categories['lahan-gambut']?->id ?? 1;
        $hutanId = $categories['hutan-lindung']?->id ?? 2;
        $perkebunanId = $categories['perkebunan']?->id ?? 3;
        $semakId = $categories['semak-belukar']?->id ?? 4;

        $dummyReports = [
            // ==========================================
            // KATEGORI: BERAT (Api aktif besar / gambut dalam / ancaman permukiman)
            // ==========================================
            [
                'tracking_code' => 'JGN-202611-BRT01',
                'report_number' => 'JGN-202611-BRT01',
                'created_by_user_id' => $user->id,
                'category_id' => $gambutId,
                'category' => 'lahan-gambut',
                'title' => 'Kebakaran Gambut Dalam Parit H. Ali - Asap Pekat Kritis',
                'description' => 'Tingkat keparahan BERAT. Kebakaran lahan gambut dengan kedalaman lebih dari 80cm. Asap sangat pekat membahayakan jarak pandang dan pernapasan warga. Api bawah tanah meluas cepat menuju area permukiman.',
                'latitude' => -0.1558230,
                'longitude' => 109.3872340,
                'province' => 'Kalimantan Barat',
                'regency_city' => 'Kabupaten Kubu Raya',
                'location_description' => 'Parit H. Ali, Dusun Mekar Sari, Desa Rasau Jaya Tiga',
                'reported_occurrence_at' => now()->subHours(2),
                'report_status' => ReportStatus::SUBMITTED->value,
                'fire_condition' => FireCondition::OBSERVED_ACTIVE->value,
            ],
            [
                'tracking_code' => 'JGN-202611-BRT02',
                'report_number' => 'JGN-202611-BRT02',
                'created_by_user_id' => $user->id,
                'category_id' => $hutanId,
                'category' => 'hutan-lindung',
                'title' => 'Titik Api Kritis Merambat ke Zona Penyangga Hutan Lindung Sebangau',
                'description' => 'Tingkat keparahan BERAT. Kobaran api aktif menjalar melintasi kanal batas hutan lindung. Angin kencang mempercepat penyebaran api ke tegakan pohon besar. Diperlukan water bombing dan pemadaman udara.',
                'latitude' => -2.2541000,
                'longitude' => 113.8820000,
                'province' => 'Kalimantan Tengah',
                'regency_city' => 'Kota Palangka Raya',
                'location_description' => 'Kanal Primer Sebangau Km 16, perbatasan Hutan Lindung',
                'reported_occurrence_at' => now()->subHours(3),
                'report_status' => ReportStatus::SUBMITTED->value,
                'fire_condition' => FireCondition::OBSERVED_ACTIVE->value,
            ],
            [
                'tracking_code' => 'JGN-202611-BRT03',
                'report_number' => 'JGN-202611-BRT03',
                'created_by_user_id' => $user->id,
                'category_id' => $gambutId,
                'category' => 'lahan-gambut',
                'title' => 'Kebakaran Lahan Gambut Dekat Pemukiman Ambawang',
                'description' => 'Tingkat keparahan BERAT. Asap tebal dan kobaran api telah mendekati batas luar perumahan warga sekitar 150 meter. Tim gabungan butuh suplai tangki air darurat.',
                'latitude' => -0.0652000,
                'longitude' => 109.4120000,
                'province' => 'Kalimantan Barat',
                'regency_city' => 'Kabupaten Kubu Raya',
                'location_description' => 'Jl. Trans Kalimantan Km 12, Sungai Ambawang',
                'reported_occurrence_at' => now()->subHours(5),
                'report_status' => ReportStatus::SUBMITTED->value,
                'fire_condition' => FireCondition::OBSERVED_ACTIVE->value,
            ],

            // ==========================================
            // KATEGORI: SEDANG (Api permukaan merambat / semak belukar / perkebunan)
            // ==========================================
            [
                'tracking_code' => 'JGN-202611-SDG01',
                'report_number' => 'JGN-202611-SDG01',
                'created_by_user_id' => $user->id,
                'category_id' => $semakId,
                'category' => 'semak-belukar',
                'title' => 'Api Semak Belukar Merambat Sepanjang Parit Jalan Poros',
                'description' => 'Tingkat keparahan SEDANG. Semak belukar dan ilalang kering terbakar sepanjang pinggir jalan poros perkebunan. Belum menyentuh pohon produktif namun berpotensi meluas jika tidak disekat.',
                'latitude' => -0.0894000,
                'longitude' => 109.4321000,
                'province' => 'Kalimantan Barat',
                'regency_city' => 'Kabupaten Kubu Raya',
                'location_description' => 'Jl. Poros Rasau Jaya - Ambawang Km 8',
                'reported_occurrence_at' => now()->subHours(6),
                'report_status' => ReportStatus::SUBMITTED->value,
                'fire_condition' => FireCondition::REPORTED_ACTIVE->value,
            ],
            [
                'tracking_code' => 'JGN-202611-SDG02',
                'report_number' => 'JGN-202611-SDG02',
                'created_by_user_id' => $user->id,
                'category_id' => $perkebunanId,
                'category' => 'perkebunan',
                'title' => 'Kebakaran Semak Terbuka Dekat Lahan Sawit Sampit',
                'description' => 'Tingkat keparahan SEDANG. Titik api terpantau di batas luar kebun sawit warga. Asap berwarna kelabu membumbung tinggi, tim desa sedang membuat sekat parit basah.',
                'latitude' => -2.5350000,
                'longitude' => 112.9550000,
                'province' => 'Kalimantan Tengah',
                'regency_city' => 'Kabupaten Kotawaringin Timur',
                'location_description' => 'Desa Bagendang Hilir, Sampit',
                'reported_occurrence_at' => now()->subHours(7),
                'report_status' => ReportStatus::SUBMITTED->value,
                'fire_condition' => FireCondition::REPORTED_ACTIVE->value,
            ],
            [
                'tracking_code' => 'JGN-202611-SDG03',
                'report_number' => 'JGN-202611-SDG03',
                'created_by_user_id' => $user->id,
                'category_id' => $perkebunanId,
                'category' => 'perkebunan',
                'title' => 'Titik Panas Merambat di Semak Perkebunan Karet',
                'description' => 'Tingkat keparahan SEDANG. Kebakaran vegetasi semak sekunder berjarak 1 km dari kebun karet. Api sedang ditangani regu pemadam setempat.',
                'latitude' => -3.0125000,
                'longitude' => 114.7654000,
                'province' => 'Kalimantan Selatan',
                'regency_city' => 'Kabupaten Barito Kuala',
                'location_description' => 'Kecamatan Marabahan, dekat sungai',
                'reported_occurrence_at' => now()->subDay(),
                'report_status' => ReportStatus::SUBMITTED->value,
                'fire_condition' => FireCondition::REPORTED_ACTIVE->value,
            ],

            // ==========================================
            // KATEGORI: RINGAN (Asap tipis / sisa bara padam / terkendali)
            // ==========================================
            [
                'tracking_code' => 'JGN-202611-RGN01',
                'report_number' => 'JGN-202611-RGN01',
                'created_by_user_id' => $user->id,
                'category_id' => $semakId,
                'category' => 'semak-belukar',
                'title' => 'Asap Tipis Terkendali di Lahan Terbuka Siantan',
                'description' => 'Tingkat keparahan RINGAN. Sisa pembakaran semak pekarangan telah padam dan disiram air oleh warga. Hanya menyisakan asap tipis yang tidak berpotensi menjalar.',
                'latitude' => -0.0120000,
                'longitude' => 109.3450000,
                'province' => 'Kalimantan Barat',
                'regency_city' => 'Kota Pontianak',
                'location_description' => 'Siantan Tengah, Pontianak Utara',
                'reported_occurrence_at' => now()->subHours(10),
                'report_status' => ReportStatus::SUBMITTED->value,
                'fire_condition' => FireCondition::OBSERVED_EXTINGUISHED->value,
            ],
            [
                'tracking_code' => 'JGN-202611-RGN02',
                'report_number' => 'JGN-202611-RGN02',
                'created_by_user_id' => $user->id,
                'category_id' => $gambutId,
                'category' => 'lahan-gambut',
                'title' => 'Bara Terisolasi Sekat Parit di Sungai Kakap',
                'description' => 'Tingkat keparahan RINGAN. Titik bara kecil terlokalisir di dalam parit basah keliling. Kondisi aman terkendali dan terus dipantau MPA (Masyarakat Peduli Api).',
                'latitude' => -0.0550000,
                'longitude' => 109.1850000,
                'province' => 'Kalimantan Barat',
                'regency_city' => 'Kabupaten Kubu Raya',
                'location_description' => 'Desa Sungai Kakap, parit pemisah lahan',
                'reported_occurrence_at' => now()->subHours(12),
                'report_status' => ReportStatus::SUBMITTED->value,
                'fire_condition' => FireCondition::OBSERVED_CONTAINED->value,
            ],
            [
                'tracking_code' => 'JGN-202611-RGN03',
                'report_number' => 'JGN-202611-RGN03',
                'created_by_user_id' => $user->id,
                'category_id' => $semakId,
                'category' => 'semak-belukar',
                'title' => 'Titik Panas Rendah Vegetasi Kering Banjarbaru',
                'description' => 'Tingkat keparahan RINGAN. Deteksi suhu hangat pada tumpukan vegetasi kering, tidak ditemukan kobaran api terbuka. Situasi kondusif terkontrol.',
                'latitude' => -3.4450000,
                'longitude' => 114.8350000,
                'province' => 'Kalimantan Selatan',
                'regency_city' => 'Kota Banjarbaru',
                'location_description' => 'Kawasan Cempaka, Banjarbaru',
                'reported_occurrence_at' => now()->subHours(14),
                'report_status' => ReportStatus::SUBMITTED->value,
                'fire_condition' => FireCondition::OBSERVED_EXTINGUISHED->value,
            ],
        ];

        foreach ($dummyReports as $data) {
            $report = Report::updateOrCreate(
                ['tracking_code' => $data['tracking_code']],
                array_merge($data, [
                    'visibility' => 'PUBLIC',
                    'is_simulated' => true,
                    'lock_version' => 1,
                ])
            );

            ReportStatusHistory::firstOrCreate(
                [
                    'report_id' => $report->id,
                    'to_status' => $report->report_status,
                ],
                [
                    'from_status' => null,
                    'actor_user_id' => $user->id,
                    'note' => 'Inisialisasi titik pantau karhutla kategori '.(str_contains($report->title, 'BERAT') ? 'Berat' : (str_contains($report->title, 'SEDANG') ? 'Sedang' : 'Ringan')),
                    'created_at' => now(),
                ]
            );
        }
    }
}

<?php

namespace Database\Seeders;

use App\Enums\FireCondition;
use App\Enums\ReportStatus;
use App\Models\Report;
use App\Models\ReportStatusHistory;
use App\Models\User;
use Illuminate\Database\Seeder;

class SampleCommunityReportSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'masyarakat@jagain.id'],
            [
                'name' => 'Budi Warga Peduli',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'role' => 'COMMUNITY',
            ]
        );

        if ($user->reports()->count() === 0) {
            $r1 = Report::create([
                'report_number' => 'JGN-20261020-A101',
                'created_by_user_id' => $user->id,
                'title' => 'Asap Tebal di Lahan Gambut Dekat Desa Sebangau',
                'category' => 'gambut',
                'description' => 'Terpantau kepulan asap tebal dan bau menyengat dari arah lahan gambut. Api terlihat menjalar di bawah permukaan tanah dekat parit primer.',
                'location_description' => 'Jl. Mahir Mahar Km 14, Sebangau, Palangka Raya',
                'latitude' => -2.254100,
                'longitude' => 113.882000,
                'reported_occurrence_at' => now()->subHours(3),
                'report_status' => ReportStatus::SUBMITTED,
                'fire_condition' => FireCondition::REPORTED_ACTIVE,
            ]);

            ReportStatusHistory::create([
                'report_id' => $r1->id,
                'from_status' => null,
                'to_status' => ReportStatus::SUBMITTED,
                'actor_user_id' => $user->id,
                'note' => 'Laporan baru berhasil dikirim dan menunggu verifikasi awal.',
                'created_at' => now()->subHours(3),
            ]);

            $r2 = Report::create([
                'report_number' => 'JGN-20261020-B202',
                'created_by_user_id' => $user->id,
                'title' => 'Kebakaran Semak Belukar Dekat Kebun Karet',
                'category' => 'perkebunan',
                'description' => 'Semak belukar kering terbakar dan api tertiup angin kencang ke arah perkebunan karet warga.',
                'location_description' => 'Kecamatan Marabahan, Barito Kuala, Kalimantan Selatan',
                'latitude' => -3.012500,
                'longitude' => 114.765400,
                'reported_occurrence_at' => now()->subDay(),
                'report_status' => ReportStatus::NEEDS_INFORMATION,
                'information_requested' => 'Mohon klarifikasi apakah kobaran api sudah mendekati rumah warga dan berapa perkiraan luas area yang berasap?',
                'fire_condition' => FireCondition::REPORTED_ACTIVE,
            ]);

            ReportStatusHistory::create([
                'report_id' => $r2->id,
                'from_status' => null,
                'to_status' => ReportStatus::SUBMITTED,
                'actor_user_id' => $user->id,
                'note' => 'Laporan dibuat oleh pelapor.',
                'created_at' => now()->subDay(),
            ]);

            ReportStatusHistory::create([
                'report_id' => $r2->id,
                'from_status' => ReportStatus::SUBMITTED,
                'to_status' => ReportStatus::NEEDS_INFORMATION,
                'actor_user_id' => null,
                'note' => 'Verifikator meminta informasi tambahan mengenai jarak kebakaran ke pemukiman terdekat.',
                'created_at' => now()->subHours(2),
            ]);
        }
    }
}

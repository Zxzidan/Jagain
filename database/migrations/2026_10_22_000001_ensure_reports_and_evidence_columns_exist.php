<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('reports')) {
            Schema::table('reports', function (Blueprint $table) {
                if (! Schema::hasColumn('reports', 'tracking_code')) {
                    $table->string('tracking_code', 32)->nullable()->index()->after('id');
                }
                if (! Schema::hasColumn('reports', 'category_id')) {
                    $table->unsignedBigInteger('category_id')->nullable()->index()->after('created_by_user_id');
                }
                if (! Schema::hasColumn('reports', 'province')) {
                    $table->string('province')->nullable()->after('longitude');
                }
                if (! Schema::hasColumn('reports', 'regency_city')) {
                    $table->string('regency_city')->nullable()->after('province');
                }
                if (! Schema::hasColumn('reports', 'fire_condition_source')) {
                    $table->string('fire_condition_source')->nullable()->after('fire_condition');
                }
                if (! Schema::hasColumn('reports', 'fire_condition_observed_at')) {
                    $table->timestamp('fire_condition_observed_at')->nullable()->after('fire_condition_source');
                }
                if (! Schema::hasColumn('reports', 'actual_fire_condition')) {
                    $table->string('actual_fire_condition')->default('UNKNOWN')->after('fire_condition_observed_at');
                }
                if (! Schema::hasColumn('reports', 'lock_version')) {
                    $table->unsignedInteger('lock_version')->default(1)->after('is_simulated');
                }
                if (! Schema::hasColumn('reports', 'close_reason')) {
                    $table->text('close_reason')->nullable()->after('additional_information');
                }
                if (! Schema::hasColumn('reports', 'reporter_name')) {
                    $table->string('reporter_name')->nullable()->after('close_reason');
                }
                if (! Schema::hasColumn('reports', 'reporter_phone')) {
                    $table->string('reporter_phone')->nullable()->after('reporter_name');
                }
            });

            // Backfill tracking_code if null
            DB::table('reports')->whereNull('tracking_code')->update([
                'tracking_code' => DB::raw('report_number'),
            ]);

            // Backfill lock_version if null
            DB::table('reports')->whereNull('lock_version')->update([
                'lock_version' => 1,
            ]);
        }

        if (Schema::hasTable('evidence')) {
            Schema::table('evidence', function (Blueprint $table) {
                if (! Schema::hasColumn('evidence', 'file_path')) {
                    $table->string('file_path')->nullable()->after('uploaded_by_user_id');
                }
            });
        }

        if (Schema::hasTable('report_status_histories')) {
            Schema::table('report_status_histories', function (Blueprint $table) {
                if (! Schema::hasColumn('report_status_histories', 'actor_name')) {
                    $table->string('actor_name')->nullable()->after('actor_user_id');
                }
                if (! Schema::hasColumn('report_status_histories', 'public_note')) {
                    $table->text('public_note')->nullable()->after('note');
                }
                if (! Schema::hasColumn('report_status_histories', 'updated_at')) {
                    $table->timestamp('updated_at')->nullable()->after('created_at');
                }
            });
        }
    }

    public function down(): void
    {
        // Safe down
    }
};

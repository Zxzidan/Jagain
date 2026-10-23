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
                if (! Schema::hasColumn('reports', 'report_number')) {
                    $table->string('report_number', 50)->nullable()->index()->after('id');
                }
                if (! Schema::hasColumn('reports', 'category_id')) {
                    $table->unsignedBigInteger('category_id')->nullable()->index()->after('created_by_user_id');
                }
                if (! Schema::hasColumn('reports', 'category')) {
                    $table->string('category', 100)->nullable()->after('category_id');
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
                if (! Schema::hasColumn('reports', 'admin_notes')) {
                    $table->text('admin_notes')->nullable()->after('lock_version');
                }
                if (! Schema::hasColumn('reports', 'additional_information')) {
                    $table->text('additional_information')->nullable()->after('information_requested');
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

            // Backfill tracking_code and report_number safely
            if (Schema::hasColumn('reports', 'report_number') && Schema::hasColumn('reports', 'tracking_code')) {
                DB::table('reports')->whereNull('tracking_code')->whereNotNull('report_number')->update([
                    'tracking_code' => DB::raw('report_number'),
                ]);

                DB::table('reports')->whereNull('report_number')->whereNotNull('tracking_code')->update([
                    'report_number' => DB::raw('tracking_code'),
                ]);
            }

            // Ensure any existing reports have tracking codes generated
            $reportsWithoutCode = DB::table('reports')
                ->where(function ($q) {
                    $q->whereNull('tracking_code');
                    if (Schema::hasColumn('reports', 'report_number')) {
                        $q->orWhereNull('report_number');
                    }
                })
                ->get(['id']);

            foreach ($reportsWithoutCode as $rep) {
                $code = 'JGN-'.date('Ym').'-'.strtoupper(\Illuminate\Support\Str::random(5));
                $updates = ['tracking_code' => $code];
                if (Schema::hasColumn('reports', 'report_number')) {
                    $updates['report_number'] = $code;
                }
                DB::table('reports')->where('id', $rep->id)->update($updates);
            }

            // Backfill lock_version if null
            if (Schema::hasColumn('reports', 'lock_version')) {
                DB::table('reports')->whereNull('lock_version')->update([
                    'lock_version' => 1,
                ]);
            }
        }

        if (Schema::hasTable('evidence')) {
            Schema::table('evidence', function (Blueprint $table) {
                if (! Schema::hasColumn('evidence', 'file_path')) {
                    $table->string('file_path')->nullable()->after('uploaded_by_user_id');
                }
                if (! Schema::hasColumn('evidence', 'storage_key')) {
                    $table->string('storage_key')->nullable()->after('file_path');
                }
            });

            if (Schema::hasColumn('evidence', 'file_path') && Schema::hasColumn('evidence', 'storage_key')) {
                DB::table('evidence')->whereNull('file_path')->whereNotNull('storage_key')->update([
                    'file_path' => DB::raw('storage_key'),
                ]);
                DB::table('evidence')->whereNull('storage_key')->whereNotNull('file_path')->update([
                    'storage_key' => DB::raw('file_path'),
                ]);
            }
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

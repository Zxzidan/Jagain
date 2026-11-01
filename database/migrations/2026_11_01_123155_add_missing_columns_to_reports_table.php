<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('reports')) {
            Schema::table('reports', function (Blueprint $table) {
                if (! Schema::hasColumn('reports', 'fire_condition')) {
                    $table->string('fire_condition')->default('UNKNOWN')->after('report_status');
                }
                if (! Schema::hasColumn('reports', 'information_requested')) {
                    $table->text('information_requested')->nullable()->after('admin_notes');
                }
            });

            if (Schema::hasColumn('reports', 'actual_fire_condition')) {
                DB::table('reports')
                    ->whereNotNull('actual_fire_condition')
                    ->update([
                        'fire_condition' => DB::raw('actual_fire_condition'),
                    ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('reports')) {
            Schema::table('reports', function (Blueprint $table) {
                if (Schema::hasColumn('reports', 'fire_condition')) {
                    $table->dropColumn('fire_condition');
                }
                if (Schema::hasColumn('reports', 'information_requested')) {
                    $table->dropColumn('information_requested');
                }
            });
        }
    }
};

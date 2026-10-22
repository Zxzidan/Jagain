<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('report_categories')) {
            Schema::create('report_categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->text('description')->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('categories')) {
            Schema::create('categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->text('description')->nullable();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('data_sources')) {
            Schema::create('data_sources', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('code')->unique();
                $table->string('source_type'); // COMMUNITY, SATELLITE_HOTSPOT, AGENCY_GROUND_CHECK, SIMULATION
                $table->string('attribution_text');
                $table->string('documentation_url')->nullable();
                $table->string('integration_status')->default('ACTIVE'); // ACTIVE, VERIFIED_ADAPTER, PLANNED, SIMULATION_ONLY
                $table->timestamp('last_successful_sync_at')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('data_sources');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('report_categories');
    }
};

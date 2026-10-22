<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('external_observations')) {
            Schema::create('external_observations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('data_source_id')->constrained('data_sources')->cascadeOnDelete();
                $table->string('external_record_id')->nullable();
                $table->string('satellite_instrument'); // VIIRS, MODIS, SATELLITE
                $table->string('confidence_level')->default('nominal'); // low, nominal, high
                $table->decimal('brightness_kelvin', 6, 2)->nullable();
                $table->decimal('frp_mw', 8, 2)->nullable(); // Fire Radiative Power (MW)
                $table->decimal('latitude', 10, 7);
                $table->decimal('longitude', 10, 7);
                $table->string('province')->nullable();
                $table->string('regency_city')->nullable();
                $table->timestamp('observed_at');
                $table->timestamp('ingested_at')->useCurrent();
                $table->boolean('is_simulated')->default(true)->index();
                $table->json('raw_metadata')->nullable();
                $table->timestamps();

                $table->index(['latitude', 'longitude']);
                $table->index(['observed_at', 'is_simulated']);
            });
        }

        if (! Schema::hasTable('audit_logs')) {
            Schema::create('audit_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('actor_user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('action'); // REPORT_SUBMITTED, STATUS_CHANGED, ASSIGNMENT_CREATED, etc.
                $table->string('entity_type');
                $table->unsignedBigInteger('entity_id');
                $table->json('before_snapshot')->nullable();
                $table->json('after_snapshot')->nullable();
                $table->text('reason')->nullable();
                $table->string('request_id')->nullable();
                $table->string('ip_address')->nullable();
                $table->timestamp('created_at')->useCurrent();
                $table->timestamp('updated_at')->nullable();

                $table->index(['entity_type', 'entity_id']);
                $table->index(['actor_user_id', 'created_at']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('external_observations');
    }
};

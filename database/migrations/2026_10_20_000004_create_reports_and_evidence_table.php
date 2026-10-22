<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_code', 32)->unique()->index();
            $table->foreignId('created_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('category_id')->constrained('report_categories');
            $table->string('title');
            $table->text('description');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->string('province');
            $table->string('regency_city');
            $table->text('location_description');
            $table->timestamp('reported_occurrence_at')->nullable();

            // Status model strictly compliant with prd.md & TECHNICAL.md
            $table->string('report_status')->default('SUBMITTED')->index();

            // Fire condition is strictly separated from report status
            $table->string('fire_condition')->default('UNKNOWN');
            $table->string('fire_condition_source')->nullable();
            $table->timestamp('fire_condition_observed_at')->nullable();

            $table->string('visibility')->default('PUBLIC'); // PUBLIC, RESTRICTED, PRIVATE
            $table->boolean('is_simulated')->default(false)->index();

            $table->text('information_requested')->nullable();
            $table->text('close_reason')->nullable();

            // PII strictly private (never exposed on public endpoints)
            $table->string('reporter_name')->nullable();
            $table->string('reporter_phone')->nullable();

            $table->timestamps();

            $table->index(['province', 'report_status']);
            $table->index(['latitude', 'longitude']);
        });

        Schema::create('evidence', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained('reports')->cascadeOnDelete();
            $table->foreignId('uploaded_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('file_path');
            $table->string('original_filename');
            $table->string('media_type');
            $table->unsignedBigInteger('size_bytes');
            $table->string('caption')->nullable();
            $table->string('visibility')->default('PUBLIC');
            $table->timestamp('captured_at')->nullable();
            $table->timestamps();
        });

        Schema::create('report_status_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained('reports')->cascadeOnDelete();
            $table->string('from_status')->nullable();
            $table->string('to_status');
            $table->foreignId('actor_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('reason')->nullable();
            $table->text('note')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index(['report_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('report_status_histories');
        Schema::dropIfExists('evidence');
        Schema::dropIfExists('reports');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('report_number', 50)->unique();
            $table->foreignId('created_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->string('title', 255);
            $table->text('description');
            $table->string('category', 100);
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->text('location_description');
            $table->dateTime('reported_occurrence_at')->nullable();
            $table->string('report_status', 50)->default('SUBMITTED')->index();
            $table->string('visibility', 20)->default('PRIVATE');
            $table->boolean('is_simulated')->default(false);
            $table->string('fire_condition', 50)->default('UNKNOWN');
            $table->text('admin_notes')->nullable();
            $table->text('information_requested')->nullable();
            $table->text('additional_information')->nullable();
            $table->timestamps();

            $table->index(['created_by_user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};

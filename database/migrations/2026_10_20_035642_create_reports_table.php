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
            $table->foreignId('created_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('category_id')->constrained('categories')->restrictOnDelete();
            $table->string('title');
            $table->text('description');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->text('location_description')->nullable();
            $table->timestamp('reported_occurrence_at')->nullable();
            $table->string('report_status')->default('SUBMITTED')->index();
            $table->string('visibility')->default('PUBLIC')->index();
            $table->boolean('is_simulated')->default(false)->index();
            $table->unsignedInteger('lock_version')->default(1);
            $table->string('actual_fire_condition')->default('UNKNOWN');
            $table->timestamps();

            $table->index(['report_status', 'created_at']);
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

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
        if (! Schema::hasTable('assignments')) {
            Schema::create('assignments', function (Blueprint $table) {
                $table->id();
                $table->foreignId('report_id')->constrained('reports')->cascadeOnDelete();
                $table->foreignId('agency_id')->constrained('agencies')->cascadeOnDelete();
                $table->foreignId('assigned_by_user_id')->constrained('users')->cascadeOnDelete();
                $table->string('assignment_status')->default('ASSIGNED')->index();
                $table->text('decline_reason')->nullable();
                $table->timestamp('assigned_at')->useCurrent();
                $table->timestamp('updated_at')->useCurrent();

                $table->index(['report_id', 'assignment_status']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};

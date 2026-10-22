<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('assignments')) {
            Schema::create('assignments', function (Blueprint $table) {
                $table->id();
                $table->foreignId('report_id')->constrained('reports')->cascadeOnDelete();
                $table->foreignId('agency_id')->constrained('agencies')->cascadeOnDelete();
                $table->foreignId('assigned_by_user_id')->constrained('users');
                $table->string('assignment_status')->default('ASSIGNED')->index();
                $table->text('decline_reason')->nullable();
                $table->timestamp('assigned_at')->useCurrent();
                $table->timestamp('acknowledged_at')->nullable();
                $table->timestamp('declined_at')->nullable();
                $table->timestamp('resolved_at')->nullable();
                $table->timestamp('closed_at')->nullable();
                $table->text('notes')->nullable();
                $table->timestamps();

                $table->index(['agency_id', 'assignment_status']);
            });
        }

        if (! Schema::hasTable('assignment_histories')) {
            Schema::create('assignment_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('assignment_id')->constrained('assignments')->cascadeOnDelete();
                $table->string('from_status')->nullable();
                $table->string('to_status');
                $table->foreignId('actor_user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->text('reason')->nullable();
                $table->text('note')->nullable();
                $table->timestamp('created_at')->useCurrent();
            });
        }

        if (! Schema::hasTable('operational_updates')) {
            Schema::create('operational_updates', function (Blueprint $table) {
                $table->id();
                $table->foreignId('assignment_id')->constrained('assignments')->cascadeOnDelete();
                $table->foreignId('created_by_user_id')->constrained('users');
                $table->string('update_type'); // PATROL, CONTAINMENT, EXTINGUISHING, STATUS_CHECK, GENERAL_UPDATE
                $table->text('note');
                $table->foreignId('evidence_id')->nullable()->constrained('evidence')->nullOnDelete();
                $table->string('fire_condition_observed')->nullable();
                $table->string('evidence_path')->nullable();
                $table->json('metadata')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('operational_updates');
        Schema::dropIfExists('assignment_histories');
        Schema::dropIfExists('assignments');
    }
};

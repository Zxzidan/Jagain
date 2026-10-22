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
        if (! Schema::hasTable('report_status_histories')) {
            Schema::create('report_status_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('report_id')->constrained('reports')->cascadeOnDelete();
                $table->string('from_status')->nullable();
                $table->string('to_status');
                $table->foreignId('actor_user_id')->constrained('users')->cascadeOnDelete();
                $table->string('reason')->nullable();
                $table->text('note')->nullable();
                $table->text('public_note')->nullable();
                $table->timestamp('created_at')->useCurrent();

                $table->index(['report_id', 'created_at']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_status_histories');
    }
};

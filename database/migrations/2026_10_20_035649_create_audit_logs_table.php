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
        if (! Schema::hasTable('audit_logs')) {
            Schema::create('audit_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('actor_user_id')->nullable()->constrained('users')->nullOnDelete();
                $table->string('action')->index();
                $table->string('entity_type')->index();
                $table->unsignedBigInteger('entity_id')->index();
                $table->json('before_snapshot')->nullable();
                $table->json('after_snapshot')->nullable();
                $table->text('reason')->nullable();
                $table->string('request_id')->nullable();
                $table->timestamp('created_at')->useCurrent();

                $table->index(['entity_type', 'entity_id']);
                $table->index(['actor_user_id', 'created_at']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};

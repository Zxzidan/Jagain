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
        if (! Schema::hasTable('agency_memberships')) {
            Schema::create('agency_memberships', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->foreignId('agency_id')->constrained()->cascadeOnDelete();
                $table->string('membership_status')->default('active')->index();
                $table->json('permissions')->nullable();
                $table->timestamps();

                $table->unique(['user_id', 'agency_id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agency_memberships');
    }
};

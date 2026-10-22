<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agencies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('agency_type'); // BPBD, MANGGALA_AGNI, DISDAMKAR, DINAS_KEHUTANAN, OTHER
            $table->string('jurisdiction'); // e.g. Kalimantan Barat, Kalimantan Tengah, etc.
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('agency_memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('agency_id')->constrained()->cascadeOnDelete();
            $table->string('membership_status')->default('ACTIVE');
            $table->string('role_in_agency')->default('OFFICER'); // OFFICER, COORDINATOR, ADMIN
            $table->timestamps();

            $table->unique(['user_id', 'agency_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agency_memberships');
        Schema::dropIfExists('agencies');
    }
};

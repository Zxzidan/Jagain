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
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('COMMUNITY')->index()->after('email');
            }
            if (! Schema::hasColumn('users', 'account_status')) {
                $table->string('account_status')->default('active')->after('role');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $cols = array_filter(['role', 'account_status'], fn ($col) => Schema::hasColumn('users', $col));
            if (! empty($cols)) {
                $table->dropColumn($cols);
            }
        });
    }
};

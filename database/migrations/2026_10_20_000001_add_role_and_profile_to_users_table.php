<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('COMMUNITY')->after('email');
            }
            if (! Schema::hasColumn('users', 'phone')) {
                $table->string('phone')->nullable()->after('role');
            }
            if (! Schema::hasColumn('users', 'account_status')) {
                $table->string('account_status')->default('ACTIVE')->after('phone');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $cols = array_filter(['role', 'phone', 'account_status'], fn ($col) => Schema::hasColumn('users', $col));
            if (! empty($cols)) {
                $table->dropColumn($cols);
            }
        });
    }
};


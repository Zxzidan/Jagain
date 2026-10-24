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
        if (Schema::hasTable('agency_memberships')) {
            Schema::table('agency_memberships', function (Blueprint $table) {
                if (! Schema::hasColumn('agency_memberships', 'role')) {
                    $table->string('role')->default('MEMBER')->after('membership_status');
                }
                if (! Schema::hasColumn('agency_memberships', 'role_in_agency')) {
                    $table->string('role_in_agency')->default('OFFICER')->after('membership_status');
                }
            });
        }

        if (Schema::hasTable('agencies')) {
            Schema::table('agencies', function (Blueprint $table) {
                if (! Schema::hasColumn('agencies', 'code')) {
                    $table->string('code')->nullable()->after('name');
                }
                if (! Schema::hasColumn('agencies', 'contact_email')) {
                    $table->string('contact_email')->nullable()->after('jurisdiction');
                }
                if (! Schema::hasColumn('agencies', 'contact_phone')) {
                    $table->string('contact_phone')->nullable()->after('contact_email');
                }
            });
        }

        if (Schema::hasTable('assignments')) {
            Schema::table('assignments', function (Blueprint $table) {
                if (! Schema::hasColumn('assignments', 'acknowledged_at')) {
                    $table->timestamp('acknowledged_at')->nullable()->after('assigned_at');
                }
                if (! Schema::hasColumn('assignments', 'declined_at')) {
                    $table->timestamp('declined_at')->nullable()->after('acknowledged_at');
                }
                if (! Schema::hasColumn('assignments', 'resolved_at')) {
                    $table->timestamp('resolved_at')->nullable()->after('declined_at');
                }
                if (! Schema::hasColumn('assignments', 'closed_at')) {
                    $table->timestamp('closed_at')->nullable()->after('resolved_at');
                }
                if (! Schema::hasColumn('assignments', 'notes')) {
                    $table->text('notes')->nullable()->after('closed_at');
                }
                if (! Schema::hasColumn('assignments', 'created_at')) {
                    $table->timestamp('created_at')->nullable()->after('notes');
                }
            });
        }

        if (Schema::hasTable('operational_updates')) {
            Schema::table('operational_updates', function (Blueprint $table) {
                if (! Schema::hasColumn('operational_updates', 'fire_condition_observed')) {
                    $table->string('fire_condition_observed')->nullable()->after('note');
                }
                if (! Schema::hasColumn('operational_updates', 'evidence_path')) {
                    $table->string('evidence_path')->nullable()->after('fire_condition_observed');
                }
                if (! Schema::hasColumn('operational_updates', 'metadata')) {
                    $table->json('metadata')->nullable()->after('evidence_path');
                }
                if (! Schema::hasColumn('operational_updates', 'updated_at')) {
                    $table->timestamp('updated_at')->nullable()->after('created_at');
                }
            });
        }

        if (Schema::hasTable('audit_logs')) {
            Schema::table('audit_logs', function (Blueprint $table) {
                if (! Schema::hasColumn('audit_logs', 'ip_address')) {
                    $table->string('ip_address')->nullable()->after('request_id');
                }
                if (! Schema::hasColumn('audit_logs', 'updated_at')) {
                    $table->timestamp('updated_at')->nullable()->after('created_at');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Safe down
    }
};

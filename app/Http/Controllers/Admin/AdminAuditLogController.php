<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuditLogController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $action = $request->string('action')->toString();
        $entityType = $request->string('entity_type')->toString();
        $search = $request->string('search')->toString();

        $query = AuditLog::query()
            ->with('actor');

        if (! empty($action)) {
            $query->where('action', $action);
        }

        if (! empty($entityType)) {
            $query->where('entity_type', $entityType);
        }

        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('reason', 'like', "%{$search}%")
                    ->orWhere('action', 'like', "%{$search}%")
                    ->orWhere('entity_type', 'like', "%{$search}%")
                    ->orWhere('entity_id', $search);
            });
        }

        $auditLogs = $query->orderByDesc('created_at')
            ->paginate(20)
            ->withQueryString();

        $actions = AuditLog::query()
            ->distinct()
            ->orderBy('action')
            ->pluck('action');

        $entityTypes = AuditLog::query()
            ->distinct()
            ->orderBy('entity_type')
            ->pluck('entity_type');

        return Inertia::render('admin/audit-logs/index', [
            'auditLogs' => $auditLogs,
            'actions' => $actions,
            'entityTypes' => $entityTypes,
            'filters' => [
                'action' => $action,
                'entity_type' => $entityType,
                'search' => $search,
            ],
        ]);
    }
}

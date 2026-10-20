<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuditLogController extends Controller
{
    public function index(Request $request): Response
    {
        $action = $request->query('action');
        $search = $request->query('search');

        $query = AuditLog::with('actorUser')->latest('created_at');

        if ($action) {
            $query->where('action', $action);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('reason', 'like', "%{$search}%")
                    ->orWhere('action', 'like', "%{$search}%")
                    ->orWhere('entity_type', 'like', "%{$search}%");
            });
        }

        $logs = $query->paginate(20)->withQueryString();

        $actions = AuditLog::select('action')->distinct()->pluck('action');

        return Inertia::render('admin/audit-logs-index', [
            'logs' => $logs,
            'actions' => $actions,
            'filters' => [
                'action' => $action,
                'search' => $search,
            ],
        ]);
    }
}

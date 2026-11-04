<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\AuditLog;
use App\Models\Category;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuditLogController extends Controller
{
    public const ACTION_METADATA = [
        'REPORT_STATUS_TRANSITION' => [
            'label' => 'Perubahan Status Laporan',
            'category' => 'REPORT',
            'badge_class' => 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
            'icon' => 'Flame',
        ],
        'REPORT_REVIEW_UPDATED' => [
            'label' => 'Penelaahan & Validasi Laporan',
            'category' => 'REPORT',
            'badge_class' => 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
            'icon' => 'FileCheck2',
        ],
        'REPORT_ASSIGNED_TO_AGENCY' => [
            'label' => 'Disposisi Penugasan ke OPD',
            'category' => 'DISPATCH',
            'badge_class' => 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
            'icon' => 'Building2',
        ],
        'REPORTS_EXPORTED_CSV' => [
            'label' => 'Ekspor Rekap Laporan (CSV)',
            'category' => 'EXPORT',
            'badge_class' => 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
            'icon' => 'Download',
        ],
        'CITIZEN_REPORT_SUBMITTED' => [
            'label' => 'Laporan Masuk dari Masyarakat',
            'category' => 'REPORT',
            'badge_class' => 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
            'icon' => 'PlusCircle',
        ],
        'CITIZEN_ADDITIONAL_INFO' => [
            'label' => 'Klarifikasi Tambahan Pelapor',
            'category' => 'REPORT',
            'badge_class' => 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800',
            'icon' => 'Info',
        ],
        'AGENCY_CREATED' => [
            'label' => 'Pendaftaran Instansi OPD Baru',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'Building2',
        ],
        'AGENCY_UPDATED' => [
            'label' => 'Pembaruan Data Instansi OPD',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'Building2',
        ],
        'AGENCY_STATUS_TOGGLED' => [
            'label' => 'Perubahan Status Aktif Instansi',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'ToggleRight',
        ],
        'CATEGORY_CREATED' => [
            'label' => 'Penambahan Kategori Karhutla',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'Tags',
        ],
        'CATEGORY_UPDATED' => [
            'label' => 'Pembaruan Kategori Karhutla',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'Tags',
        ],
        'CATEGORY_STATUS_TOGGLED' => [
            'label' => 'Perubahan Status Kategori',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'ToggleRight',
        ],
    ];

    public function __invoke(Request $request): Response
    {
        $action = $request->string('action')->toString();
        $entityType = $request->string('entity_type')->toString();
        $search = $request->string('search')->toString();
        $datePreset = $request->string('date_preset')->toString();
        $fromDate = $request->string('from_date')->toString();
        $toDate = $request->string('to_date')->toString();

        $query = AuditLog::query()
            ->with(['actor', 'actorUser']);

        if (! empty($action)) {
            $query->where('action', $action);
        }

        if (! empty($entityType)) {
            $query->where('entity_type', $entityType);
        }

        // Date Range Filtering
        if ($datePreset === 'today') {
            $query->whereDate('created_at', now()->today());
        } elseif ($datePreset === 'last_7_days') {
            $query->where('created_at', '>=', now()->subDays(7));
        } elseif ($datePreset === 'this_month') {
            $query->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year);
        } elseif (! empty($fromDate) && ! empty($toDate)) {
            $query->whereBetween('created_at', [
                Carbon::parse($fromDate)->startOfDay(),
                Carbon::parse($toDate)->endOfDay(),
            ]);
        } elseif (! empty($fromDate)) {
            $query->where('created_at', '>=', Carbon::parse($fromDate)->startOfDay());
        } elseif (! empty($toDate)) {
            $query->where('created_at', '<=', Carbon::parse($toDate)->endOfDay());
        }

        // Comprehensive search
        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('reason', 'like', "%{$search}%")
                    ->orWhere('action', 'like', "%{$search}%")
                    ->orWhere('entity_type', 'like', "%{$search}%")
                    ->orWhere('entity_id', $search)
                    ->orWhere('request_id', 'like', "%{$search}%")
                    ->orWhere('ip_address', 'like', "%{$search}%")
                    ->orWhereHas('actor', fn ($userQ) => $userQ->where('name', 'like', "%{$search}%"));
            });
        }

        $auditLogsPaginated = $query->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        // Preload associated entities for the current paginated page
        $reportIds = $auditLogsPaginated->getCollection()
            ->where('entity_type', 'Report')
            ->pluck('entity_id')
            ->filter(fn ($id) => (int) $id > 0)
            ->unique();
        $reportsMap = Report::whereIn('id', $reportIds)
            ->get(['id', 'tracking_code', 'title', 'report_status'])
            ->keyBy('id');

        $agencyIds = $auditLogsPaginated->getCollection()
            ->where('entity_type', 'Agency')
            ->pluck('entity_id')
            ->filter(fn ($id) => (int) $id > 0)
            ->unique();
        $agenciesMap = Agency::whereIn('id', $agencyIds)
            ->get(['id', 'name', 'jurisdiction'])
            ->keyBy('id');

        $categoryIds = $auditLogsPaginated->getCollection()
            ->where('entity_type', 'Category')
            ->pluck('entity_id')
            ->filter(fn ($id) => (int) $id > 0)
            ->unique();
        $categoriesMap = Category::whereIn('id', $categoryIds)
            ->get(['id', 'name', 'slug'])
            ->keyBy('id');

        // Transform collection with rich contextual metadata
        $auditLogsPaginated->setCollection(
            $auditLogsPaginated->getCollection()->map(function (AuditLog $log) use ($reportsMap, $agenciesMap, $categoriesMap) {
                $meta = self::ACTION_METADATA[$log->action] ?? null;
                $actionLabel = $meta['label'] ?? ucwords(strtolower(str_replace('_', ' ', $log->action)));
                $badgeClass = $meta['badge_class'] ?? 'bg-neutral-100 text-neutral-800 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300';
                $actionIcon = $meta['icon'] ?? 'Shield';

                // Resolve Entity Summary
                $entitySummary = null;
                if ($log->entity_type === 'Report') {
                    if ((int) $log->entity_id > 0 && ($report = $reportsMap->get($log->entity_id))) {
                        $entitySummary = [
                            'name' => "Laporan #{$report->id}",
                            'subtext' => $report->tracking_code.' • '.$report->title,
                            'url' => route('admin.reports.show', $report->id),
                            'badge' => $report->report_status?->label() ?? (string) $report->report_status,
                        ];
                    } else {
                        $entitySummary = [
                            'name' => "Laporan #{$log->entity_id}",
                            'subtext' => 'Rekam Laporan Sistem',
                            'url' => (int) $log->entity_id > 0 ? route('admin.reports.show', $log->entity_id) : null,
                            'badge' => 'SISTEM',
                        ];
                    }
                } elseif ($log->entity_type === 'Agency') {
                    $agency = $agenciesMap->get($log->entity_id);
                    $entitySummary = [
                        'name' => $agency?->name ?? "Instansi OPD #{$log->entity_id}",
                        'subtext' => $agency?->jurisdiction ?? 'Yurisdiksi Daerah',
                        'url' => route('admin.agencies.index'),
                        'badge' => 'OPD',
                    ];
                } elseif ($log->entity_type === 'Category') {
                    $category = $categoriesMap->get($log->entity_id);
                    $entitySummary = [
                        'name' => $category?->name ?? "Kategori Karhutla #{$log->entity_id}",
                        'subtext' => $category?->slug ?? 'Tipe Kawasan',
                        'url' => route('admin.categories.index'),
                        'badge' => 'KATEGORI',
                    ];
                } elseif ($log->entity_type === 'System') {
                    $entitySummary = [
                        'name' => 'Sistem & Utilitas JAGAIN',
                        'subtext' => $log->action === 'REPORTS_EXPORTED_CSV' ? 'Unduhan Ekspor CSV Laporan' : 'Konfigurasi Sistem',
                        'url' => null,
                        'badge' => 'SISTEM',
                    ];
                } else {
                    $entitySummary = [
                        'name' => "{$log->entity_type} #{$log->entity_id}",
                        'subtext' => 'Objek Sistem',
                        'url' => null,
                        'badge' => 'DATA',
                    ];
                }

                $hasSnapshot = ! empty($log->before_snapshot) || ! empty($log->after_snapshot);

                return [
                    'id' => $log->id,
                    'action' => $log->action,
                    'action_label' => $actionLabel,
                    'action_category' => $meta['category'] ?? 'GENERAL',
                    'action_badge_class' => $badgeClass,
                    'action_icon' => $actionIcon,
                    'entity_type' => $log->entity_type,
                    'entity_type_label' => match ($log->entity_type) {
                        'Report' => 'Laporan Karhutla',
                        'Assignment' => 'Penugasan OPD',
                        'Agency' => 'Instansi OPD',
                        'Category' => 'Kategori Karhutla',
                        'System' => 'Sistem & Utilitas',
                        default => $log->entity_type,
                    },
                    'entity_id' => $log->entity_id,
                    'entity_summary' => $entitySummary,
                    'actor_name' => $log->actor?->name ?? 'Sistem Otomatis',
                    'actor_role' => $log->actor?->role ?? 'SYSTEM',
                    'actor_email' => $log->actor?->email,
                    'reason' => $log->reason,
                    'request_id' => $log->request_id,
                    'ip_address' => $log->ip_address,
                    'before_snapshot' => $log->before_snapshot,
                    'after_snapshot' => $log->after_snapshot,
                    'has_snapshot' => $hasSnapshot,
                    'created_at' => $log->created_at?->toIso8601String(),
                    'created_at_formatted' => $log->created_at?->translatedFormat('d M Y, H.i.s').' WIB',
                    'created_at_human' => $log->created_at?->diffForHumans(),
                ];
            })
        );

        // Fetch distinct actions with formatted labels
        $rawActions = AuditLog::query()
            ->distinct()
            ->orderBy('action')
            ->pluck('action');

        $actionOptions = $rawActions->map(fn ($act) => [
            'value' => $act,
            'label' => self::ACTION_METADATA[$act]['label'] ?? ucwords(strtolower(str_replace('_', ' ', $act))),
        ])->values()->all();

        // Fetch distinct entity types with clean labels
        $rawEntityTypes = AuditLog::query()
            ->distinct()
            ->orderBy('entity_type')
            ->pluck('entity_type');

        $entityTypeOptions = $rawEntityTypes->map(fn ($type) => [
            'value' => $type,
            'label' => match ($type) {
                'Report' => 'Laporan Karhutla',
                'Assignment' => 'Penugasan OPD',
                'Agency' => 'Instansi OPD',
                'Category' => 'Kategori Karhutla',
                'System' => 'Sistem & Utilitas',
                default => $type,
            },
        ])->values()->all();

        // High-level audit statistics
        $stats = [
            'total_logs' => AuditLog::count(),
            'report_actions' => AuditLog::whereIn('action', [
                'REPORT_STATUS_TRANSITION',
                'REPORT_REVIEW_UPDATED',
                'CITIZEN_REPORT_SUBMITTED',
                'CITIZEN_ADDITIONAL_INFO',
            ])->count(),
            'dispatch_actions' => AuditLog::where('action', 'like', '%ASSIGN%')->count(),
            'system_actions' => AuditLog::where('action', 'like', '%EXPORT%')
                ->orWhere('action', 'like', '%CATEGORY%')
                ->orWhere('action', 'like', '%AGENCY%')
                ->orWhere('entity_type', 'System')
                ->count(),
        ];

        return Inertia::render('admin/audit-logs/index', [
            'auditLogs' => $auditLogsPaginated,
            'actionOptions' => $actionOptions,
            'entityTypeOptions' => $entityTypeOptions,
            'actions' => $rawActions,
            'entityTypes' => $rawEntityTypes,
            'stats' => $stats,
            'filters' => [
                'action' => $action,
                'entity_type' => $entityType,
                'search' => $search,
                'date_preset' => $datePreset,
                'from_date' => $fromDate,
                'to_date' => $toDate,
            ],
        ]);
    }

    public function index(Request $request): Response
    {
        return $this->__invoke($request);
    }
}

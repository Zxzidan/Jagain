<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use App\Models\Assignment;
use App\Models\AuditLog;
use App\Models\Category;
use App\Models\OperationalUpdate;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuditLogController extends Controller
{
    public const ACTION_METADATA = [
        'REPORT_STATUS_TRANSITION' => [
            'label' => 'Ubah Status',
            'category' => 'REPORT',
            'badge_class' => 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
            'icon' => 'Flame',
        ],
        'REPORT_REVIEW_UPDATED' => [
            'label' => 'Validasi Laporan',
            'category' => 'REPORT',
            'badge_class' => 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
            'icon' => 'FileCheck2',
        ],
        'REPORT_ASSIGNED_TO_AGENCY' => [
            'label' => 'Disposisi OPD',
            'category' => 'DISPATCH',
            'badge_class' => 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
            'icon' => 'Building2',
        ],
        'ASSIGNMENT_STATUS_TRANSITION' => [
            'label' => 'Respon OPD',
            'category' => 'DISPATCH',
            'badge_class' => 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
            'icon' => 'Building2',
        ],
        'ASSIGNMENT_SUBMITTED_FOR_REVIEW' => [
            'label' => 'Pengajuan Review',
            'category' => 'DISPATCH',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'CheckCircle2',
        ],
        'ASSIGNMENT_COMPLETED' => [
            'label' => 'Tugas Selesai',
            'category' => 'DISPATCH',
            'badge_class' => 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
            'icon' => 'CheckCircle2',
        ],
        'OPERATIONAL_UPDATE_ADDED' => [
            'label' => 'Giat Lapangan',
            'category' => 'DISPATCH',
            'badge_class' => 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
            'icon' => 'Clock',
        ],
        'REPORTS_EXPORTED_CSV' => [
            'label' => 'Ekspor CSV',
            'category' => 'EXPORT',
            'badge_class' => 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
            'icon' => 'Download',
        ],
        'REPORT_SUBMITTED' => [
            'label' => 'Laporan Masuk',
            'category' => 'REPORT',
            'badge_class' => 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
            'icon' => 'PlusCircle',
        ],
        'CITIZEN_REPORT_SUBMITTED' => [
            'label' => 'Laporan Masuk',
            'category' => 'REPORT',
            'badge_class' => 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
            'icon' => 'PlusCircle',
        ],
        'REPORT_INFORMATION_PROVIDED' => [
            'label' => 'Klarifikasi Data',
            'category' => 'REPORT',
            'badge_class' => 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800',
            'icon' => 'Info',
        ],
        'CITIZEN_ADDITIONAL_INFO' => [
            'label' => 'Klarifikasi Data',
            'category' => 'REPORT',
            'badge_class' => 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800',
            'icon' => 'Info',
        ],
        'AGENCY_USER_CREATED' => [
            'label' => 'Akun Petugas',
            'category' => 'SETTING',
            'badge_class' => 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
            'icon' => 'UserCheck',
        ],
        'AGENCY_CREATED' => [
            'label' => 'Tambah OPD',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'Building2',
        ],
        'AGENCY_UPDATED' => [
            'label' => 'Ubah Data OPD',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'Building2',
        ],
        'AGENCY_STATUS_TOGGLED' => [
            'label' => 'Status OPD',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'ToggleRight',
        ],
        'CATEGORY_CREATED' => [
            'label' => 'Tambah Kategori',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'Tags',
        ],
        'CATEGORY_UPDATED' => [
            'label' => 'Ubah Kategori',
            'category' => 'SETTING',
            'badge_class' => 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
            'icon' => 'Tags',
        ],
        'CATEGORY_STATUS_TOGGLED' => [
            'label' => 'Status Kategori',
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

        $assignmentIds = $auditLogsPaginated->getCollection()
            ->where('entity_type', 'Assignment')
            ->pluck('entity_id')
            ->filter(fn ($id) => (int) $id > 0)
            ->unique();
        $assignmentsMap = Assignment::with(['agency:id,name', 'report:id,tracking_code,title'])
            ->whereIn('id', $assignmentIds)
            ->get(['id', 'report_id', 'agency_id', 'assignment_status'])
            ->keyBy('id');

        $operationalUpdateIds = $auditLogsPaginated->getCollection()
            ->where('entity_type', 'OperationalUpdate')
            ->pluck('entity_id')
            ->filter(fn ($id) => (int) $id > 0)
            ->unique();
        $operationalUpdatesMap = OperationalUpdate::with(['assignment.agency:id,name', 'assignment.report:id,tracking_code,title'])
            ->whereIn('id', $operationalUpdateIds)
            ->get(['id', 'assignment_id', 'update_type', 'note'])
            ->keyBy('id');

        $userIds = $auditLogsPaginated->getCollection()
            ->where('entity_type', 'User')
            ->pluck('entity_id')
            ->filter(fn ($id) => (int) $id > 0)
            ->unique();
        $usersMap = User::with(['agencyMemberships.agency:id,name'])
            ->whereIn('id', $userIds)
            ->get(['id', 'name', 'email', 'role'])
            ->keyBy('id');

        // Transform collection with rich contextual metadata
        $auditLogsPaginated->setCollection(
            $auditLogsPaginated->getCollection()->map(function (AuditLog $log) use (
                $reportsMap,
                $agenciesMap,
                $categoriesMap,
                $assignmentsMap,
                $operationalUpdatesMap,
                $usersMap
            ) {
                $meta = self::ACTION_METADATA[$log->action] ?? null;
                $actionLabel = $meta['label'] ?? ucwords(strtolower(str_replace('_', ' ', $log->action)));
                $badgeClass = $meta['badge_class'] ?? 'bg-neutral-100 text-neutral-800 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300';
                $actionIcon = $meta['icon'] ?? 'Shield';

                // Resolve Entity Summary with user-centric descriptions
                $entitySummary = null;
                if ($log->entity_type === 'Report') {
                    if ((int) $log->entity_id > 0 && ($report = $reportsMap->get($log->entity_id))) {
                        $entitySummary = [
                            'name' => "Laporan: {$report->tracking_code}",
                            'subtext' => $report->title,
                            'url' => route('admin.reports.show', $report->id),
                            'badge' => $report->report_status?->label() ?? (string) $report->report_status,
                        ];
                    } else {
                        $entitySummary = [
                            'name' => 'Laporan Karhutla',
                            'subtext' => 'Rekam Data Laporan',
                            'url' => (int) $log->entity_id > 0 ? route('admin.reports.show', $log->entity_id) : null,
                            'badge' => 'LAPORAN',
                        ];
                    }
                } elseif ($log->entity_type === 'Assignment') {
                    $assignment = $assignmentsMap->get($log->entity_id);
                    if ($assignment) {
                        $agencyName = $assignment->agency?->name ?? 'Instansi OPD';
                        $reportCode = $assignment->report?->tracking_code ?? "Laporan #{$assignment->report_id}";
                        $reportTitle = $assignment->report?->title ?? '';
                        $entitySummary = [
                            'name' => "Penugasan: {$agencyName}",
                            'subtext' => $reportTitle ? "{$reportCode} • {$reportTitle}" : $reportCode,
                            'url' => $assignment->report_id ? route('admin.reports.show', $assignment->report_id) : null,
                            'badge' => 'PENUGASAN',
                        ];
                    } else {
                        $agencyName = $log->after_snapshot['agency_name'] ?? 'Instansi Terkait';
                        $entitySummary = [
                            'name' => "Penugasan: {$agencyName}",
                            'subtext' => 'Disposisi Penanganan Lapangan',
                            'url' => null,
                            'badge' => 'PENUGASAN',
                        ];
                    }
                } elseif ($log->entity_type === 'OperationalUpdate') {
                    $opUpdate = $operationalUpdatesMap->get($log->entity_id);
                    if ($opUpdate && $opUpdate->assignment) {
                        $agencyName = $opUpdate->assignment->agency?->name ?? 'Petugas Lapangan';
                        $reportCode = $opUpdate->assignment->report?->tracking_code ?? "Laporan #{$opUpdate->assignment->report_id}";
                        $reportTitle = $opUpdate->assignment->report?->title ?? '';
                        $entitySummary = [
                            'name' => "Giat Lapangan: {$agencyName}",
                            'subtext' => $reportTitle ? "{$reportCode} • {$reportTitle}" : $reportCode,
                            'url' => $opUpdate->assignment->report_id ? route('admin.reports.show', $opUpdate->assignment->report_id) : null,
                            'badge' => 'GIAT OPD',
                        ];
                    } else {
                        $entitySummary = [
                            'name' => 'Pembaruan Giat Lapangan',
                            'subtext' => 'Laporan Tindakan Operasional',
                            'url' => null,
                            'badge' => 'GIAT OPD',
                        ];
                    }
                } elseif ($log->entity_type === 'User') {
                    $userObj = $usersMap->get($log->entity_id);
                    $agencyName = $userObj?->agencyMemberships?->first()?->agency?->name
                        ?? $log->after_snapshot['agency_name']
                        ?? null;
                    $userName = $userObj?->name ?? $log->after_snapshot['name'] ?? 'Petugas';
                    $entitySummary = [
                        'name' => "Akun: {$userName}",
                        'subtext' => $agencyName ? "Petugas {$agencyName}" : ($userObj?->email ?? $log->after_snapshot['email'] ?? 'Pengguna Sistem'),
                        'url' => route('admin.agencies.index'),
                        'badge' => 'AKUN OPD',
                    ];
                } elseif ($log->entity_type === 'Agency') {
                    $agency = $agenciesMap->get($log->entity_id);
                    $entitySummary = [
                        'name' => $agency?->name ?? 'Instansi OPD',
                        'subtext' => $agency?->jurisdiction ?? 'Yurisdiksi Daerah',
                        'url' => route('admin.agencies.index'),
                        'badge' => 'OPD',
                    ];
                } elseif ($log->entity_type === 'Category') {
                    $category = $categoriesMap->get($log->entity_id);
                    $entitySummary = [
                        'name' => $category?->name ?? 'Kategori Karhutla',
                        'subtext' => $category?->slug ?? 'Tipe Kawasan',
                        'url' => route('admin.categories.index'),
                        'badge' => 'KATEGORI',
                    ];
                } elseif ($log->entity_type === 'System') {
                    $entitySummary = [
                        'name' => 'Sistem & Utilitas JAGAIN',
                        'subtext' => $log->action === 'REPORTS_EXPORTED_CSV' ? 'Unduhan Berkas Rekap CSV' : 'Konfigurasi Sistem',
                        'url' => null,
                        'badge' => 'SISTEM',
                    ];
                } else {
                    $entitySummary = [
                        'name' => "Data {$log->entity_type}",
                        'subtext' => 'Aktivitas Operasional',
                        'url' => null,
                        'badge' => 'DATA',
                    ];
                }

                $hasSnapshot = ! empty($log->before_snapshot) || ! empty($log->after_snapshot);
                $humanReason = $this->resolveHumanReason($log);

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
                        'OperationalUpdate' => 'Pembaruan Lapangan (Giat)',
                        'User' => 'Akun Petugas OPD',
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
                    'reason' => $humanReason,
                    'raw_reason' => $log->reason,
                    'before_snapshot' => $this->humanizeSnapshot($log->before_snapshot),
                    'after_snapshot' => $this->humanizeSnapshot($log->after_snapshot),
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
                'OperationalUpdate' => 'Pembaruan Lapangan (Giat)',
                'User' => 'Akun Petugas OPD',
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
                'REPORT_SUBMITTED',
                'CITIZEN_ADDITIONAL_INFO',
                'REPORT_INFORMATION_PROVIDED',
            ])->count(),
            'dispatch_actions' => AuditLog::where('action', 'like', '%ASSIGN%')
                ->orWhere('action', 'like', '%OPERATIONAL%')
                ->count(),
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

    /**
     * Resolve a clear, user-friendly explanation when log reason is null or generic.
     */
    private function resolveHumanReason(AuditLog $log): ?string
    {
        if (! empty($log->reason)) {
            return $log->reason;
        }

        return match ($log->action) {
            'REPORT_ASSIGNED_TO_AGENCY' => isset($log->after_snapshot['agency_name'])
                ? "Laporan didisposisikan ke {$log->after_snapshot['agency_name']} untuk ditangani di lapangan."
                : 'Laporan didisposisikan ke instansi OPD terkait.',
            'ASSIGNMENT_STATUS_TRANSITION' => match ($log->after_snapshot['assignment_status'] ?? null) {
                'RECEIVED_BY_AGENCY' => 'Instansi OPD telah menerima lembar tugas dan bersiap melakukan tindakan lapangan.',
                'DECLINED_BY_AGENCY' => 'Instansi OPD menolak lembar penugasan'.(isset($log->after_snapshot['decline_reason']) ? ": {$log->after_snapshot['decline_reason']}" : '.'),
                'IN_PROGRESS' => 'Petugas OPD memulai giat penanganan fisik di titik lokasi.',
                default => 'Perubahan status lembar penugasan instansi dinas.',
            },
            'ASSIGNMENT_SUBMITTED_FOR_REVIEW' => isset($log->after_snapshot['summary'])
                ? "Petugas OPD mengajukan peninjauan hasil: {$log->after_snapshot['summary']}"
                : 'Petugas OPD mengajukan peninjauan hasil penanganan kepada admin.',
            'OPERATIONAL_UPDATE_ADDED' => 'Petugas lapangan menambahkan catatan perkembangan giat penanganan karhutla.',
            'AGENCY_USER_CREATED' => isset($log->after_snapshot['name'])
                ? "Pendaftaran akun petugas resmi atas nama {$log->after_snapshot['name']} (".($log->after_snapshot['agency_name'] ?? 'OPD').')'
                : 'Pendaftaran akun login petugas instansi OPD baru.',
            'AGENCY_STATUS_TOGGLED' => ($log->after_snapshot['is_active'] ?? null)
                ? 'Status instansi OPD diaktifkan kembali untuk menerima penugasan.'
                : 'Status instansi OPD dinonaktifkan sementara dari penugasan baru.',
            'CATEGORY_STATUS_TOGGLED' => ($log->after_snapshot['is_active'] ?? null)
                ? 'Status kategori karhutla diaktifkan.'
                : 'Status kategori karhutla dinonaktifkan.',
            'REPORTS_EXPORTED_CSV' => 'Pengunduhan berkas rekap data laporan karhutla dalam format CSV.',
            'REPORT_SUBMITTED', 'CITIZEN_REPORT_SUBMITTED' => 'Laporan kejadian karhutla baru dikirimkan oleh pelapor.',
            default => null,
        };
    }

    /**
     * Transform raw database snapshots into clean, human-readable Indonesian key-values.
     * Strips away unnecessary developer metadata (IDs, lock versions, tokens).
     */
    private function humanizeSnapshot(?array $snapshot): ?array
    {
        if (empty($snapshot)) {
            return null;
        }

        // Filter out internal developer IDs and concurrency tokens that regular users do not need
        $excludedKeys = [
            'lock_version',
            'assignment_id',
            'agency_id',
            'user_id',
            'report_id',
            'evidence_id',
            'created_at',
            'updated_at',
            'password',
            'password_hash',
            'remember_token',
            'two_factor_secret',
            'two_factor_recovery_codes',
        ];

        $labelMap = [
            'report_status' => 'Status Laporan',
            'assignment_status' => 'Status Penugasan OPD',
            'fire_condition' => 'Kondisi Titik Api',
            'fire_condition_observed' => 'Kondisi Api Terpantau',
            'agency_name' => 'Nama Instansi OPD',
            'update_type' => 'Jenis Giat Lapangan',
            'note' => 'Catatan Lapangan',
            'summary' => 'Ringkasan Penyelesaian',
            'decline_reason' => 'Alasan Penolakan',
            'is_active' => 'Status Keaktifan',
            'name' => 'Nama',
            'email' => 'Email Akun',
            'role' => 'Peran Sistem',
            'role_in_agency' => 'Peran di Instansi',
            'jurisdiction' => 'Wilayah Yurisdiksi',
            'title' => 'Judul Laporan',
            'tracking_code' => 'Nomor Lacak',
        ];

        $valueMap = [
            // Report Statuses
            'SUBMITTED' => 'Laporan Masuk (Terkirim)',
            'UNDER_REVIEW' => 'Dalam Telaah & Verifikasi',
            'NEEDS_INFORMATION' => 'Butuh Klarifikasi Pelapor',
            'VERIFIED' => 'Terverifikasi Valid',
            'DISPATCHED' => 'Ditugaskan ke OPD',
            'RESOLUTION_REVIEW' => 'Ditinjau Hasil Penanganan',
            'RESOLVED_VERIFIED' => 'Tuntas Selesai',
            'CLOSED_WITH_REASON' => 'Ditutup dengan Alasan',
            'REJECTED' => 'Laporan Ditolak',

            // Assignment Statuses
            'ASSIGNED' => 'Tugas Baru Diterbitkan',
            'RECEIVED_BY_AGENCY' => 'Diterima oleh OPD',
            'DECLINED_BY_AGENCY' => 'Ditolak oleh OPD',
            'IN_PROGRESS' => 'Sedang Ditangani di Lapangan',
            'SUBMITTED_FOR_REVIEW' => 'Diajukan untuk Ditinjau',
            'COMPLETED' => 'Penanganan Selesai',
            'CLOSED' => 'Tugas Ditutup',

            // Fire Conditions
            'OBSERVED_ACTIVE' => 'Api Aktif Terpantau',
            'OBSERVED_CONTAINED' => 'Terkendali / Api Tersekat',
            'OBSERVED_EXTINGUISHED' => 'Api Berhasil Dipadamkan',
            'NO_FIRE_DETECTED' => 'Tidak Ditemukan Api',
            'UNKNOWN' => 'Belum Terpantau',

            // Update Types
            'PATROL' => 'Patroli & Groundcheck',
            'FIREFIGHTING' => 'Pemadaman Api Langsung',
            'COOLING_DOWN' => 'Pendinginan Area Gambut',
            'LOGISTICS' => 'Dukungan Logistik & Armada',
            'INVESTIGATION' => 'Investigasi Sumber Api',
            'OTHER' => 'Lainnya',

            // Roles
            'OFFICER' => 'Petugas Lapangan',
            'LEADER' => 'Pimpinan OPD',
            'OPERATOR' => 'Operator Sistem',
            'AGENCY' => 'Petugas Instansi OPD',
            'ADMIN' => 'Administrator Sistem',
            'COMMUNITY' => 'Masyarakat Pelapor',
        ];

        $cleaned = [];
        foreach ($snapshot as $key => $val) {
            if (in_array($key, $excludedKeys, true)) {
                continue;
            }

            $friendlyKey = $labelMap[$key] ?? ucwords(str_replace('_', ' ', $key));

            if (is_bool($val)) {
                $friendlyVal = $val ? 'Aktif (Ya)' : 'Nonaktif (Tidak)';
            } elseif (is_string($val) && isset($valueMap[$val])) {
                $friendlyVal = $valueMap[$val];
            } elseif ($val === null) {
                $friendlyVal = '—';
            } else {
                $friendlyVal = $val;
            }

            $cleaned[$friendlyKey] = $friendlyVal;
        }

        return empty($cleaned) ? null : $cleaned;
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\AuditLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminCategoryController extends Controller
{
    public function __construct(
        private readonly AuditLogService $auditLogService,
    ) {}

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $query = Category::query()
            ->withCount('reports');

        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $categories = $query->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'is_active' => ['boolean'],
        ]);

        $category = Category::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        $this->auditLogService->log(
            actor: $request->user(),
            action: 'CATEGORY_CREATED',
            entityType: 'Category',
            entityId: $category->id,
            after: $category->toArray(),
        );

        return back()->with('success', "Kategori {$category->name} berhasil ditambahkan.");
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'is_active' => ['boolean'],
        ]);

        $before = $category->toArray();
        $category->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        $this->auditLogService->log(
            actor: $request->user(),
            action: 'CATEGORY_UPDATED',
            entityType: 'Category',
            entityId: $category->id,
            before: $before,
            after: $category->toArray(),
        );

        return back()->with('success', "Kategori {$category->name} berhasil diperbarui.");
    }

    public function toggleStatus(Request $request, Category $category): RedirectResponse
    {
        $before = ['is_active' => $category->is_active];
        $category->is_active = ! $category->is_active;
        $category->save();

        $this->auditLogService->log(
            actor: $request->user(),
            action: 'CATEGORY_STATUS_TOGGLED',
            entityType: 'Category',
            entityId: $category->id,
            before: $before,
            after: ['is_active' => $category->is_active],
        );

        $statusLabel = $category->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Status kategori {$category->name} berhasil {$statusLabel}.");
    }
}

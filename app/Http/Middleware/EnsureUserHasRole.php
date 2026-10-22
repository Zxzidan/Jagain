<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(401, 'Silakan masuk terlebih dahulu untuk mengakses halaman ini.');
        }

        if (! in_array($user->role->value, $roles, true)) {
            abort(403, 'Akses ditolak. Peran Anda tidak memiliki izin untuk halaman ini.');
        }

        return $next($request);
    }
}

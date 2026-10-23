<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class DevelopmentAutoLogin
{
    /**
     * Handle an incoming request.
     *
     * Automatically log in as the admin user during local development
     * so that login screens do not disrupt rapid feature development.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (app()->environment('local') && config('auth.dev_auto_login', true)) {
            if (! Auth::check()) {
                $user = User::firstWhere('role', 'ADMIN') ?? User::first();

                if ($user) {
                    Auth::login($user);
                }
            }
        }

        return $next($request);
    }
}

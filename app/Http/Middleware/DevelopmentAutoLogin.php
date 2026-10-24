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
        // If requesting logout, remember that user intentionally logged out
        if ($request->is('logout')) {
            $request->session()->put('manual_logout', true);
            return $next($request);
        }

        // If user manually logged out, do not force auto login
        if ($request->session()->get('manual_logout', false)) {
            // Clear manual_logout flag if submitting login
            if ($request->is('login') && $request->isMethod('post')) {
                $request->session()->forget('manual_logout');
            }
            return $next($request);
        }

        if (app()->environment('local') && config('auth.dev_auto_login', false)) {
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

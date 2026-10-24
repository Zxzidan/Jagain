<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('auto logs in as admin and redirects to admin dashboard in local environment', function () {
    app()->detectEnvironment(fn () => 'local');
    config(['auth.dev_auto_login' => true]);

    $admin = User::factory()->create([
        'role' => 'ADMIN',
        'email_verified_at' => now(),
    ]);

    $response = $this->get(route('home'));

    $response->assertRedirect(route('admin.dashboard'));
    $this->assertAuthenticatedAs($admin);
});

test('auto login can be disabled via config in local environment', function () {
    app()->detectEnvironment(fn () => 'local');
    config(['auth.dev_auto_login' => false]);

    User::factory()->create([
        'role' => 'ADMIN',
    ]);

    $response = $this->get(route('admin.dashboard'));

    $response->assertRedirect(route('login'));
    $this->assertGuest();
});

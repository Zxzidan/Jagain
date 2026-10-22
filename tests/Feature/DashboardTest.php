<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('admin users are redirected to admin dashboard', function () {
    $admin = User::factory()->create(['role' => 'ADMIN']);
    $response = $this->actingAs($admin)->get(route('dashboard'));
    $response->assertRedirect(route('admin.dashboard'));
});

test('agency users are redirected to agency dashboard', function () {
    $agency = User::factory()->create(['role' => 'AGENCY']);
    $response = $this->actingAs($agency)->get(route('dashboard'));
    $response->assertRedirect(route('agency.dashboard'));
});

test('community members can access community dashboard', function () {
    $user = User::factory()->create(['role' => 'COMMUNITY']);
    $response = $this->actingAs($user)->get(route('dashboard'));
    $response->assertOk();
});

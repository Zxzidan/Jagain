<?php

use App\Enums\UserRole;
use App\Models\User;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register and are assigned the COMMUNITY role', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::where('email', 'test@example.com')->first();
    expect($user)->not->toBeNull();
    expect($user->role)->toBe(UserRole::COMMUNITY);
});

test('registration strictly assigns COMMUNITY role even if another role is passed', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Malicious Attacker',
        'email' => 'attacker@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'ADMIN',
    ]);

    $this->assertAuthenticated();
    $user = User::where('email', 'attacker@example.com')->first();
    expect($user)->not->toBeNull();
    expect($user->role)->toBe(UserRole::COMMUNITY);
    expect($user->role)->not->toBe(UserRole::ADMIN);
});

<?php

namespace Database\Factories;

use App\Models\Evidence;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Evidence>
 */
class EvidenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'file_path' => 'evidence/sample.jpg',
            'original_filename' => 'sample.jpg',
            'media_type' => 'image/jpeg',
            'size_bytes' => 102400,
            'caption' => 'Bukti foto lapangan',
            'visibility' => 'PUBLIC',
        ];
    }
}

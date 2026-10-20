<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:5', 'max:200'],
            'category' => ['required', 'string', 'in:hutan,gambut,perkebunan,pemukiman,lainnya'],
            'description' => ['required', 'string', 'min:10', 'max:2000'],
            'location_description' => ['required', 'string', 'min:5', 'max:500'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'reported_occurrence_at' => ['nullable', 'date', 'before_or_equal:now'],
            'evidence' => ['nullable', 'file', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ];
    }

    /**
     * Custom messages for validation errors in Indonesian.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul atau ringkasan laporan wajib diisi.',
            'title.min' => 'Judul laporan minimal 5 karakter.',
            'title.max' => 'Judul laporan maksimal 200 karakter.',
            'category.required' => 'Kategori kebakaran wajib dipilih.',
            'category.in' => 'Kategori yang dipilih tidak valid.',
            'description.required' => 'Deskripsi kejadian kebakaran wajib diisi.',
            'description.min' => 'Deskripsi kejadian minimal 10 karakter.',
            'description.max' => 'Deskripsi kejadian maksimal 2000 karakter.',
            'location_description.required' => 'Deskripsi lokasi atau patokan wilayah wajib diisi.',
            'location_description.min' => 'Deskripsi lokasi minimal 5 karakter.',
            'latitude.required' => 'Titik koordinat lintang (latitude) wajib diisi atau dipilih pada peta.',
            'latitude.between' => 'Titik koordinat lintang harus berada di antara -90 dan 90.',
            'longitude.required' => 'Titik koordinat bujur (longitude) wajib diisi atau dipilih pada peta.',
            'longitude.between' => 'Titik koordinat bujur harus berada di antara -180 dan 180.',
            'reported_occurrence_at.before_or_equal' => 'Waktu kejadian tidak boleh mendahului waktu saat ini.',
            'evidence.image' => 'File bukti harus berupa gambar (JPG, JPEG, PNG, WEBP).',
            'evidence.mimes' => 'Format bukti yang didukung hanya JPG, JPEG, PNG, atau WEBP.',
            'evidence.max' => 'Ukuran file bukti maksimal 5 MB.',
        ];
    }
}

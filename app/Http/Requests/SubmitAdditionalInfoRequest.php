<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SubmitAdditionalInfoRequest extends FormRequest
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
            'additional_information' => ['required', 'string', 'min:5', 'max:2000'],
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
            'additional_information.required' => 'Penjelasan informasi tambahan wajib diisi.',
            'additional_information.min' => 'Penjelasan informasi tambahan minimal 5 karakter.',
            'additional_information.max' => 'Penjelasan informasi tambahan maksimal 2000 karakter.',
            'evidence.image' => 'File bukti harus berupa gambar (JPG, JPEG, PNG, WEBP).',
            'evidence.mimes' => 'Format bukti yang didukung hanya JPG, JPEG, PNG, atau WEBP.',
            'evidence.max' => 'Ukuran file bukti maksimal 5 MB.',
        ];
    }
}

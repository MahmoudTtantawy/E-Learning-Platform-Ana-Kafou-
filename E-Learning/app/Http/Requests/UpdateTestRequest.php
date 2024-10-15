<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateTestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required','string','min:5'],
            'description' => ['sometimes', 'required','string',"min:5"],
            'is_free' => ['sometimes','required','boolean'],
        ];
    }
    public function failedValidation(Validator $validator): array
    {
        throw new HttpResponseException(response()->json([

            'success'   => false,
            'validation_errors'      => $validator->errors()

        ],422));

    }
    public function messages(): array
    {
        return [
            'title.required' => 'Title is required',
            'is_free.required' => 'Is free is required',
            'description.required' => 'Description is required',
            'title.min' => 'Title must be at least 5 characters long',
            'description.min' => 'Description must be at least 5 characters long',
            'title.string' => 'Title must be a string',
            'description.string' => 'Description must be a string',
            'is_free.boolean' => 'Is free must be a boolean',
        ];
    }
}

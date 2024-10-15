<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreTestRequest extends FormRequest
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
            'title' => [ 'required','string','min:5'],
            'description' => ['required','string',"min:5"],
            'is_free' => ['required','boolean'],
            "excel_file" =>['required', 'file', 'mimes:csv'],
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
            'description.required' => 'Description is required',
            'is_free.required' => 'Is free is required',
            'is_free.boolean' => 'Is free must be a boolean',
            'title.min' => 'Title must be at least 5 characters long',
            'description.min' => 'Description must be at least 5 characters long',
            'title.string' => 'Title must be a string',
            'description.string' => 'Description must be a string',
            "excel_file.required" => 'Excel file is required',
            "excel_file.mimes" => 'Excel file must be in CSV format'
        ];
    }

}

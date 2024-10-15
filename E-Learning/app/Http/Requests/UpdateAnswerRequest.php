<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAnswerRequest extends FormRequest
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
            'question_id' => ['required','exists:questions,id'],
            'answer_text' => ['required','string'],
            'is_correct' => ['required','boolean'],
        ];
    }
    public function failedValidation(Validator $validator): array
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
        ], 422));
    }
    public function messages(): array
    {
        return [
            'question_id.required' => 'Question id is required',
            'question_id.exists' => 'Question not found',
            'answer_text.required' => 'Answer text is required',
            'answer_text.string' => 'Answer text must be a string',
            'is_correct.required' => 'Is correct field is required',
            'is_correct.boolean' => 'Is correct field must be a boolean',
        ];
    }
}

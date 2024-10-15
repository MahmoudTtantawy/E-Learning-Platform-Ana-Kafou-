<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUserAnswerRequest extends FormRequest
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
            'answer_id' => ['required','exists:answers,id'],
        ];
    }
    public function failedValidation(Validator $validator): array
    {
        throw new HttpResponseException(response()->json([
           'message' => 'Validation Error',
            'errors' => $validator->errors()
        ], 422));

    }
    public function messages(): array
    {
        return [
            'question_id.required' => 'Question id is required',
            'question_id.exists' => 'Question not found',
            'answer_id.required' => 'Answer id is required',
            'answer_id.exists' => 'Answer not found',
        ];
    }
}

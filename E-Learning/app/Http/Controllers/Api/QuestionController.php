<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Http\Resources\QuestionResource;
use App\Imports\ExamImport;
use App\Imports\TestImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Question;

class QuestionController extends Controller
{
    public function index()
    {
        $question= Question::all();
        return QuestionResource::collection($question);
    }

    public function store(StoreQuestionRequest $request)
    {
        $question = Question::create($request->all());
        return response()->json($question, 201);
    }

    public function show($id)
    {
        $question = Question::find($id);
        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }
        return new QuestionResource($question);
    }

    public function update(UpdateQuestionRequest $request, $id)
    {
        $question = Question::find($id);
        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }
        $question->update($request->all());
        return response()->json(new QuestionResource($question), 200);
    }

    public function destroy($id)
    {
        $question = Question::find($id);
        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }else{
            $question->delete();
            return response()->json([
                'message' => 'Deleted  Successfully',
            ],200);
        }
    }
}

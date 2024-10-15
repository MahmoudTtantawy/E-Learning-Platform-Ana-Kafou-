<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnswerRequest;
use App\Http\Resources\AnswerResource;
use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function index()
    {
        $answer = Answer::all();
        return  AnswerResource::collection($answer);
    }

    public function store(StoreAnswerRequest $request)
    {
        $answer = Answer::create($request->all());
        return response()->json($answer, 201);
    }

    public function show($id)
    {
        $answer = Answer::find($id);
        if (!$answer) {
            return response()->json(['message' => 'Answer not found'], 404);
        }
        return new AnswerResource($answer);
    }

    public function update(Request $request, $id)
    {
        $answer = Answer::find($id);
        if (!$answer) {
            return response()->json(['message' => 'Answer not found'], 404);
        }
        $answer->update($request->all());
        return response()->json($answer, 200);
    }

    public function destroy($id)
    {
        $answer = Answer::find($id);
        if (!$answer) {
            return response()->json(['message' => 'Answer not found'], 404);
        }
        $answer->delete();
        return response()->json([
            'message' => 'Deleted  Successfully',
        ],200);    }
}

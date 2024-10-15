<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserAnswerRequest;
use App\Models\Test;
use App\Models\UserAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserAnswerController extends Controller
{
    public function index()
    {
        return UserAnswer::all();
    }

    public function store(StoreUserAnswerRequest $request)
    {
        $data = $request->all();
        $data['user_id'] = Auth::id();
        $userAnswers = [];
        foreach ($data['question_id'] as $key => $questionId) {
            $userAnswer = UserAnswer::create([
                'question_id' => $questionId,
                'answer_id' => $data['answer_id'][$key],
                'user_id' => $data['user_id'],
            ]);

            $userAnswers[] = $userAnswer;
        }

        return response()->json([
        'answer'=>    $userAnswers,
            'status' =>     true,
        ], 201);
    }


    public function show($id)
    {
        $userAnswer = UserAnswer::find($id);
        if (!$userAnswer) {
            return response()->json(['message' => 'User answer not found'], 404);
        }
        return $userAnswer;
    }

    public function update(Request $request, $id)
    {
        $userAnswer = UserAnswer::find($id);
        if (!$userAnswer) {
            return response()->json(['message' => 'User answer not found'], 404);
        }
        $userAnswer->update($request->all());
        return response()->json($userAnswer, 200);
    }

    public function destroy($id)
    {
        $userAnswer = UserAnswer::find($id);
        if (!$userAnswer) {
            return response()->json(['message' => 'User answer not found'], 404);
        }
        $userAnswer->delete();
        return response()->json(['message' => 'User answer deleted'], 204);
    }
}


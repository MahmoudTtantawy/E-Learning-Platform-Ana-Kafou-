<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScoreRequest;
use App\Models\Score;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScoreController extends Controller
{
    public function index()
    {
        return Score::all();
    }

    public function store(StoreScoreRequest $request)
    {
       $data=$request->all();
        $data['user_id']=Auth::id();
        $score = Score::create($data);
        return response()->json([
            $score,
            'status' => true,

        ], 201);
    }

    public function show($id)
    {
        $score = Score::find($id);
        if (!$score) {
            return response()->json(['message' => 'Score not found'], 404);
        }
        return $score;
    }

    public function update(Request $request, $id)
    {
        $score = Score::find($id);
        if (!$score) {
            return response()->json(['message' => 'Score not found'], 404);
        }
        $score->update($request->all());
        return response()->json($score, 200);
    }

    public function destroy($id)
    {
        $score = Score::find($id);
        if (!$score) {
            return response()->json(['message' => 'Score not found'], 404);
        }
        $score->delete(); // Delete score
        return response()->json(['message' => 'Score deleted'], 204);
    }
}

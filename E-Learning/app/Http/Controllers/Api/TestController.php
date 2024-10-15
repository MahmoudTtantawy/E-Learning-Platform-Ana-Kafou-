<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTestRequest;
use App\Http\Requests\UpdateTestRequest;
use App\Http\Resources\TestResource;
use App\Imports\ExamImport;
use App\Imports\TestImport;
use App\Models\Score;
use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class TestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $tests = Test::with('scores')->get();

        return [
            'data' => $tests->map(function ($test) {

                $score = $test->scores->where('user_id', '=', Auth::id())->first();
                return [
                    'test' => new TestResource($test),
                    'score' => $score ? [
                        'score' => $score->score,
                    ] : null,
                ];
            })
        ];

    }

    public function store(StoreTestRequest $request)
    {
        DB::beginTransaction();

        try {
            $file = $request->file("excel_file");

            $test = Test::create($request->except('excel_file'));

            Excel::import(new TestImport, $file, null, \Maatwebsite\Excel\Excel::CSV);
            Excel::import(new ExamImport, $file, null, \Maatwebsite\Excel\Excel::CSV);

            DB::commit();

            return response()->json(new TestResource($test), 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
    public function show($id)
    {
        $test = Test::find($id);
        if (!$test) {
            return response()->json(['message' => 'Test not found'], 404);
        }

        return response()->json([
            'test' => new TestResource($test),
            'questions' => $test->questions->map(function ($question) {
                $answersArray = [];
                $correctAnswer = null;

                foreach ($question->answers as $index => $answer) {
                    $answersArray['answers' . ($index + 1)] = [
                        'id' => $answer->id,
                        'answer_text' => $answer->answer_text,
                        'is_correct' => $answer->is_correct,
                    ];

                    if ($answer->is_correct) {
                        $correctAnswer = $answer->id;
                    }
                }

                return [
                    'question_text' => $question->question_text,
                    'question_id' => $question->id,
                    'correct_answer' => str($correctAnswer),
                ] + $answersArray;
            })
        ]);



    }

    public function update(UpdateTestRequest $request, $id)
    {
        $test = Test::find($id);

        if (!$test) {
            return response()->json(['message' => 'Test not found'], 404);
        }
        $test->update($request->all());
        return response()->json(new TestResource($test), 200);
    }

    public function destroy($id)
    {
        $test = Test::find($id);
        if (!$test) {
            return response()->json(['message' => 'Test not found'], 404);
        }
        $test->delete();
        return response()->json([
            'message' => 'Deleted  Successfully',
        ], 200);
    }
    public function storeExamFile(Request $request)
    {
        $file = $request->file("excel_file");
        Excel::import(new TestImport, $file, null, \Maatwebsite\Excel\Excel::CSV);
        Excel::import(new ExamImport, $file, null, \Maatwebsite\Excel\Excel::CSV);
    }

    public function ShowCorrectTestAnswer($id)
    {
        $test = Test::find($id);
        if (!$test) {
            return response()->json(['message' => 'Test not found'], 404);
        }

        $userId = Auth::id();
        $score=Score::where('user_id',$userId)->where("test_id",$test->id)->first();
        $TestScore =$score->score ;


        return response()->json([
            'test' => new TestResource($test),
            "score"=> $TestScore,
            'questions' => $test->questions->map(function ($question) use ($userId) {
                $answersArray = [];
                $correctAnswer = null;

                foreach ($question->answers as $index => $answer) {
                    if ($answer->is_correct) {
                        $correctAnswer = $answer->answer_text;
                    }

                    $answersArray['answers' . ($index + 1)] = [
                        'id' => $answer->id,
                        'answer_text' => $answer->answer_text,
                        'is_correct' => $answer->is_correct,
                    ];
                }

                $userAnswer = $question->userAnswers->where('user_id', $userId)->first();
                $userAnswerText = $userAnswer ? $userAnswer->answer->id : null;

                return [
                        'question_text' => $question->question_text,
                        'question_id' => $question->id,
                        'correct_answer' => $correctAnswer,
                        'user_answer' => $userAnswerText,
                    ] + $answersArray;
            })
        ]);
    }}

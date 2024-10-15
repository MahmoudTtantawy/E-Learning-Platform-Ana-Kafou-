<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTestRequest;
use App\Http\Requests\UpdateTestRequest;
use App\Http\Resources\TestResource;
use App\Imports\ExamImport;
use App\Imports\TestImport;
use App\Models\Test;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class TestController extends Controller
{
public function __construct()
{
    $this->middleware('auth:sanctum');
    $this->middleware('isAdmin')->only('store', 'update', 'destroy','storeExamFile');
}

    public function index()
    {
        return TestResource::collection(Test::all());
    }

    public function store(StoreTestRequest $request)
    {
        $test = Test::create($request->except('excel_file'));
        $file = $request->file("excel_file");
        Excel::import(new TestImport, $file, null, \Maatwebsite\Excel\Excel::CSV);
        Excel::import(new ExamImport, $file, null, \Maatwebsite\Excel\Excel::CSV);
        return response()->json(new TestResource($test), 201);
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
        ],200);
    }
    public function storeExamFile(Request $request){
        $file = $request->file("excel_file");
         Excel::import(new TestImport, $file, null, \Maatwebsite\Excel\Excel::CSV);
         Excel::import(new ExamImport, $file, null, \Maatwebsite\Excel\Excel::CSV);
    }
}

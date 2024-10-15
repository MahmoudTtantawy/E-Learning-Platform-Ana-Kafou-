<?php

namespace App\Imports;

use App\Models\Question;
use App\Models\Test;
use Maatwebsite\Excel\Concerns\ToModel;

class TestImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {

        $test = Test::where('deleted_at', null)->latest('created_at')->first();

        if (empty($row[0])) {
            throw new \Exception("The question column is empty in the CSV file.");
        }

        if ($test) {
            return new Question([
                'test_id' => $test->id,
                'question_text' => $row[0],
            ]);
        }

        return null;
    }
}

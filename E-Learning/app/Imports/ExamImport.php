<?php

namespace App\Imports;

use App\Models\Answer;
use App\Models\Test;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Collection;

class ExamImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        $test = Test::where('deleted_at', null)->latest('created_at')->first();

        foreach ($rows as $index => $row) {
            $i = $index + 1;
            $ii = $index + 1;
            if (empty($row[1])) {
                throw new \Exception("Answer Number 1 is empty for question {$ii}  in the CSV file.");
            }
            if (!isset($row[2])) {
                throw new \Exception("is correct column is empty for question {$ii} in Answer number 1 in the CSV file.");
            }

            Answer::create([
                'question_id' => $test->questions[$index]->id,
                'answer_text' => $row[1],
                'is_correct' => $row[2] === true ? 1 : ($row[2] === false ? 0 :
                    throw new \Exception("The is correct value for question {$ii} in Answer Number 1 is invalid ")
                ),
            ]);


            if (!empty($row[3])) {
                if (!isset($row[4])) {
                    throw new \Exception("is correct column is empty for question {$ii} in Answer number 2 in the CSV file.");
                }
                Answer::create([
                    'question_id' => $test->questions[$index]->id,
                    'answer_text' => $row[3],
                    'is_correct' => $row[4] === true ? 1 : ($row[4] === false ? 0 :
                        throw new \Exception("The is correct value for question {$ii} in Answer number 2 is invalid ")
                    ),]);
            } else {
                $i++;
                throw new \Exception("Answer Number 2 is empty for question {$ii}  in the CSV file.");

            }
            if (!empty($row[5])) {

                if (!isset($row[6])) {
                    throw new \Exception("is correct column is empty for question {$ii} in Answer number 3 in the CSV file.");
                }
                Answer::create([
                    'question_id' => $test->questions[$index]->id,
                    'answer_text' => $row[5],
                    'is_correct' => $row[6] === true ? 1 : ($row[6] === false ? 0 :
                        throw new \Exception("The is correct value for question {$ii} in Answer number 3 is invalid ")
                    ),]);
            } else {
                $i++;
                throw new \Exception("Answer Number 3 is empty for question {$ii}  in the CSV file.");

            }
            if (!empty($row[7])) {
                $i++;

                if (!isset($row[8])) {
                    throw new \Exception("is correct column is empty for question {$ii} in Answer number 4 in the CSV file.");
                }
                Answer::create([
                    'question_id' => $test->questions[$index]->id,
                    'answer_text' => $row[7],
                    'is_correct' => $row[8] === true ? 1 : ($row[8] === false ? 0 :
                        throw new \Exception("The is correct value for question {$ii} in Answer number 4 is invalid ")
                    ),]);
            } else {
                $i++;
                throw new \Exception("Answer Number 4 is empty for question {$ii}  in the CSV file.");

            }
        }
    }
}

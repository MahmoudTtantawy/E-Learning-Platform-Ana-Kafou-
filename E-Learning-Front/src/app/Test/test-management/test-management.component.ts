import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.css']
})
export class TestManagementComponent {
  data: any;
  name!: string;
  image!: string;
  role_id!: any;
  id!: any;
  isloggedIn: boolean = false;
  title!: string;


  test: any[] = [];
  questions: any[] = [];
  questionsAnswers: { question_id: string; answer_id: number }[] = [];

  score: number = 0;
  testForm: FormGroup;

  testId!: any;
  http = inject(HttpClient);
  toaster = inject(ToastrService);

  constructor(private route: ActivatedRoute, private tf: FormBuilder, private router: Router) {
    this.testForm = this.tf.group({
      question_id: ['', Validators.required],
      answer_id: ['', Validators.required],
    });
  }

  get formControls() {
    return this.testForm.controls;
  }

  testService = inject(TestService);

  ngOnInit() {
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.name = this.data.name;
      this.image = this.data.image;
      this.role_id = this.data.role_id;
      this.id = this.data.id;
    }

    this.testId = this.route.snapshot.paramMap.get('id');
    this.testService.getTest(this.testId).subscribe((res: any) => {
      this.test = res.test;
      this.title = res.test.title;

      this.questions = res.questions;
    });
  }

  getAnswer(event: any) {
    const value = event.target.value;
    const questionIndex = event.target.name;

    this.questions[questionIndex].studentAnswer = value;

    const questionId = this.questions[questionIndex].question_id;
    this.updateQuestionsAnswers(questionId, value);
  }

  updateQuestionsAnswers(questionId: string, answerId: number) {
    const existingAnswer = this.questionsAnswers.find(answer => answer.question_id === questionId);

    if (existingAnswer) {
      existingAnswer.answer_id = answerId;
    } else {
      this.questionsAnswers.push({ question_id: questionId, answer_id: answerId });
    }

    console.log(this.questionsAnswers);
  }

  getResults() {
    this.score = 0;
    for (const question of this.questions) {
      if (question.studentAnswer === question.correct_answer) {
        this.score++;
      }
    }



  }

  onSubmit() {
    const unansweredQuestions = this.questions.filter(question => !question.studentAnswer);

    if (unansweredQuestions.length > 0) {
      this.toaster.error('من فضلك جاوب علي كل الاسئله');

      return;
    }

    if (this.questionsAnswers.length > 0) {
      const questionIds = this.questionsAnswers.map(qa => qa.question_id);
      const answerIds = this.questionsAnswers.map(qa => qa.answer_id);

      const payload = {
        question_id: questionIds,
        answer_id: answerIds
      };

      this.testService.CreateuserAnswer(payload).subscribe((res: any) => {
        if (res.status) {
        }
      });
    }

    const testScore = {
      test_id: this.testId,
      score: this.score,
    };

    this.testService.storeTestScore(testScore).subscribe((res: any) => {
      if (res.status) {
        this.toaster.success("تم الانتهاء من الامتحان و تسجيل النتيجه بنجاح")
        this.router.navigateByUrl("test-answer/" + this.testId);
      }
    });
  }

}

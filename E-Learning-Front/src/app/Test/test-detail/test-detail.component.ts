import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-test-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './test-detail.component.html',
  styleUrl: './test-detail.component.css'
})
export class TestDetailComponent {
  data: any;
  name!: string;
  image!: string;
  role_id!: any;
  id!: any;
  isloggedIn: boolean = false;
  title!: string;
  score!: number ;
  test: any[] = [];
  questions: any[] = [];
  questionsAnswers: { question_id: string; answer_id: number }[] = [];

  testId!: any;
  http = inject(HttpClient);
  toaster = inject(ToastrService);

  constructor(private route: ActivatedRoute, private router: Router) {
  
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
    this.testService.ShowCorrectTestAnswer(this.testId).subscribe((res: any) => {
      console.log(res);
      this.test = res.test;
      this.title = res.test.title;
      this.score = res.score;
      this.questions = res.questions;
    });
  }




  
}

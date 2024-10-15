import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './test-update.component.html',
  styleUrl: './test-update.component.css'
})
export class TestUpdateComponent {
  test!: any;
  testId!: any;
  updateForm: FormGroup;
  constructor(private fb: FormBuilder, private testService: TestService, private router: Router, private route: ActivatedRoute) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_free: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('id'); 
    this.testService.getTest((this.testId)).subscribe((res: any) => {
      this.test = res.data;
      this.updateForm.patchValue(this.test);
    })
  }
  onSubmit() {
    if (this.updateForm.valid) {
      this.testService.updateTest(this.testId,this.updateForm.value).subscribe(
        (response) => {
          console.log('Update successful', response);
          this.router.navigateByUrl('/tests');
        },
        (error) => {
          console.error('Update failed', error);
        }
      );
    } else {
      this.updateForm.markAllAsTouched();
    }

  }

  get f() {
    return this.updateForm.controls;
  }
}

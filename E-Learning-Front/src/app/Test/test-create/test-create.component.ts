import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './test-create.component.html',
  styleUrl: './test-create.component.css'
})
export class TestCreateComponent {
  CreateForm!: FormGroup;
  toaster = inject(ToastrService);

  constructor(private fb: FormBuilder, private testService: TestService, private router: Router) {
    this.CreateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_free: ['', Validators.required],
      excel_file: ['', Validators.required]


    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.CreateForm.patchValue({
        excel_file: file
      });
    }
  }

  onSubmit() {
    if (this.CreateForm.valid) {
      const formData = new FormData();
      formData.append('title', this.CreateForm.get('title')?.value);
      formData.append('description', this.CreateForm.get('description')?.value);
      formData.append('is_free', this.CreateForm.get('is_free')?.value);

      const csvFile = this.CreateForm.get('excel_file')?.value as File;
      if (csvFile) {
        formData.append('excel_file', csvFile);
      }


      this.testService.createTest(formData).subscribe({
        next: (response) => {
          // console.log('Test created successfully', response);
          this.toaster.success('Test created successfully');
          this.router.navigateByUrl('tests');
        },
        error: (error) => {
          // console.log('Error creating test', error);
          if (error.error.success == false) {
            if (error.error.validation_errors.title) {
              this.toaster.error(error.error.validation_errors.title);
            } else if (error.error.validation_errors.description) {
              this.toaster.error(error.error.validation_errors.description);
            } else if (error.error.validation_errors.excel_file) {
              this.toaster.error(error.error.validation_errors.excel_file);
            }
          }else if (error.ok == false) {
            this.toaster.error( error.error.error);
          }
        }
      }
      );
    } else {
      this.CreateForm.markAllAsTouched();
    }

  }

  get f() {
    return this.CreateForm.controls;
  }

}

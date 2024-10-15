import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../Shared/header/header.component';
import { AuthService } from '../../../services/Auth/auth.service';

@Component({
  selector: 'app-student-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink ,HeaderComponent],
  templateUrl: './student-sign-up.component.html',
  styleUrls: ['./student-sign-up.component.css']
})
export class StudentSignUPComponent implements OnInit {
  registerForm: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  eyeIcon: string = 'fas fa-eye';
  confirmEyeIcon: string = 'fas fa-eye';

  constructor(private fb: FormBuilder ,private authservices: AuthService,private router:Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zأ-ي\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*')
      ]],
      password_confirmation: ['', Validators.required],
      national_id: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      image: ['', Validators.required]
        //  Validators.pattern( "^[^\s]+\.(jpg|jpeg|png|gif|bmp)$")],

    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('password_confirmation')?.value
      ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.eyeIcon = this.eyeIcon === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    this.confirmEyeIcon = this.confirmEyeIcon === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({
        image: file
      });
    }
  }

onSubmit() {
  if (this.registerForm.valid) {
    const formData = new FormData();

    formData.append('name', this.registerForm.get('name')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    formData.append('password_confirmation', this.registerForm.get('password_confirmation')?.value);
    formData.append('national_id', this.registerForm.get('national_id')?.value);
    formData.append('gender', this.registerForm.get('gender')?.value);
    formData.append('address', this.registerForm.get('address')?.value);
    formData.append('phone', this.registerForm.get('phone')?.value);

    const imageFile = this.registerForm.get('image')?.value as File;
    if (imageFile) {
      formData.append('image', imageFile);
    }

    console.log("Form Submitted", this.registerForm.value);

    this.authservices.onRegister(formData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.registerForm.reset();
        this.router.navigate(['/signin']);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  } else {
    this.registerForm.markAllAsTouched();
  }
}


  get f() {
    return this.registerForm.controls;
  }


}

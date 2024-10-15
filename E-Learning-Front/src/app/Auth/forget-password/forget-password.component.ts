import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  signInForm: FormGroup;
  error = '';
  success = '';
  constructor(private fb: FormBuilder,private authService: AuthService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      national_id: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
    });
  }
  onSubmit() {
    this.error='';
    this.success='';
    if (this.signInForm.valid) {
      this.authService.forrgetPassword(this.signInForm.value).subscribe(
        (response: any) => {
          this.success = response.message;
        },
        (error) => {
          this.error = error.error.message;
        }
      );
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  get formControls() {
    return this.signInForm.controls;
  }
}

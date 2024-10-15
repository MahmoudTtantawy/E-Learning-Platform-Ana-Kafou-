import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/Auth/auth.service';
import { HeaderComponent } from '../../Shared/header/header.component';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, HeaderComponent],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  message!: string;
  passwordFieldType: string = 'password';
  eyeIcon: string = 'fas fa-eye';
  toaster = inject(ToastrService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.eyeIcon = this.eyeIcon === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }

  onSubmit() {
    if (this.signInForm.valid) {
    } else {
      this.signInForm.markAllAsTouched();
    }
  }


  get formControls() {
    return this.signInForm.controls;
  }

  loginObj: any = {
    'email': '',
    'password': ''
  }

  authServices = inject(AuthService)

  Login() {
    this.authServices.onLogin(this.loginObj).subscribe({
      next: (res: any) => {
        console.log(res)
        this.toaster.success("Login Success")
        localStorage.setItem('Token', res.token);
        localStorage.setItem('data', JSON.stringify(res.data));
        localStorage.setItem('notifications', JSON.stringify(res.notifications));     
           this.authServices.setLoggedIn(true);

        if (res.data.role_id == 1 || res.data.role_id == 4) {
          this.router.navigateByUrl("admin");
        } else {
          this.router.navigateByUrl("");
        }
      },
      error: (err: any) => {
        console.log(err)
        if (err.error.message == "Login Failed") {
          this.toaster.error("Invalid Email Address or Password")
        } else {
          this.message = err.error.message;
          this.toaster.error(this.message)

        }
      }

    })
  }

}
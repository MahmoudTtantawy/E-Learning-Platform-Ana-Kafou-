import { CreateOrganizerService } from './../../../services/create-organizer.service';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent  implements OnInit {
  createForm: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  eyeIcon: string = 'fas fa-eye';
  confirmEyeIcon: string = 'fas fa-eye';
  submitted :boolean = false;


  constructor(private fb: FormBuilder ,private router :Router ,
     private CreateOrganizer : CreateOrganizerService,
    public toaster :ToastrService) {
    
      this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*')
      ]],
      password_confirmation: ['', Validators.required],
      national_id: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      gender: ['', Validators.required],
      role_id: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      image: ['', Validators.required ],

      title: [''],
      description: [''] 

    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.createForm.get('role_id')?.valueChanges.subscribe(role => {
      if (role === 'Teacher') {
        this.createForm.get('title')?.setValidators([Validators.required]);
        this.createForm.get('description')?.setValidators([Validators.required]);
      } else {
        this.createForm.get('title')?.clearValidators();
        this.createForm.get('description')?.clearValidators();
      }
      this.createForm.get('title')?.updateValueAndValidity();
      this.createForm.get('description')?.updateValueAndValidity();
    });
  
  }

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
    // console.log(file.name);
    if (file) {
      this.createForm.patchValue({
        image: file
        
      });
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.createForm.valid) {
      // console.log(this.createForm, "rrrrrrrrrrrrrrrrrrrrrrrr");
      const formData = new FormData();
      
      formData.append('name', this.createForm.get('name')?.value);
      formData.append('email', this.createForm.get('email')?.value);
      formData.append('password', this.createForm.get('password')?.value);
      formData.append('password_confirmation', this.createForm.get('password_confirmation')?.value);
      formData.append('national_id', this.createForm.get('national_id')?.value);
      formData.append('gender', this.createForm.get('gender')?.value);
      formData.append('role_id', this.createForm.get('role_id')?.value);
      formData.append('address', this.createForm.get('address')?.value);
      formData.append('phone', this.createForm.get('phone')?.value);
      formData.append('title', this.createForm.get('title')?.value);
      formData.append('description', this.createForm.get('description')?.value);
      
      const imageFile = this.createForm.get('image')?.value as File;
      // console.log(imageFile ,"imageFile");
      if (imageFile) {
        formData.append('image', imageFile);
        
      }
      // console.log(formData); 
      this.CreateOrganizer.createorganizer(formData).subscribe((response) => {
        // alert("response")
        this.router.navigateByUrl('/allorganizer');
        

      }, (error) => {
        if(error.error.validation_errors.email){
          this.toaster.error(error.error.validation_errors.email);
        }else if (error.error.validation_errors.national_id){
          this.toaster.error(error.error.validation_errors.national_id);
        }
      });

    } else {
      this.createForm.markAllAsTouched();
    }
  }

  get f() {
    return this.createForm.controls;
  }

}

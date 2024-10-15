import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CreateOrganizerService } from '../../../services/create-organizer.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './student-profile-edit.component.html',
  styleUrls: ['./student-profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  updateForm: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  eyeIcon: string = 'fas fa-eye';
  confirmEyeIcon: string = 'fas fa-eye';

  userData = {
    name: '',
    email: '',
    national_id: '',
    gender: '',
    address: '',
    phone: '',
    image: '',
  };

  id: any;
  selectedFile: File | null = null;
  currentImageUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zأ-يs]+$')]],
      email: ['', [Validators.required, Validators.email]],
      national_id: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{14}$/)],
      ],
      gender: [''],
      address: [''],
      phone: [''],
    });

  }
  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('data')!).id;
    this.userService.getUser(Number(this.id)).subscribe(
      (data: any) => {
        this.updateForm.patchValue({
          name: data.data.name,
          email: data.data.email,
          national_id: data.data.national_id,
          gender: data.data.gender,
          address: data.data.address,
          phone: data.data.phone,
        });

        this.currentImageUrl = data.data.image;
        console.log(this.updateForm.value);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      this.updateForm.patchValue({
        image: file,
      });
    }
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    this.userService.updateUser(
      this.id,
      this.updateForm.value
    ).subscribe(
      (response: any) => {
        console.log('Profile updated successfully', response);
        alert('Profile updated successfully!');
        this.router.navigateByUrl('/profile');
      },
      (error: any) => {
        console.error('Error updating profile', error);
        alert('Error updating profile.');
      }
    );
  }

  get f() {
    return this.updateForm.controls;
  }
}

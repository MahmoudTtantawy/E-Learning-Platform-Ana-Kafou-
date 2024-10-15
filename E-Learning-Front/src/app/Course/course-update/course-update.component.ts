import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-course-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css'
})
export class CourseUpdateComponent {
  courseForm!: FormGroup;
  id: number = 0;
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.coursesService.getCourse(this.id).subscribe(
      (response) => {
        this.courseForm.patchValue(response);
      },
      (error) => {
        console.error('Error fetching course details', error);
      }
    );

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [{ value: '', disabled: false }, [Validators.required, Validators.min(0)]],
      is_free: [false],
      instructor_id: ['', Validators.required],
      playlist_id: ['', Validators.required]
    });

    // Toggle price field based on whether the course is free
    this.courseForm.get('is_free')?.valueChanges.subscribe((isFree) => {
      if (isFree) {
        this.courseForm.get('price')?.disable(); // Disable price input if free
        this.courseForm.get('price')?.setValue(0);
      } else {
        this.courseForm.get('price')?.enable(); // Enable price input if not free
      }
    });
  }

  // Method to submit the form data
  updateCourse() {
    if (this.courseForm.valid) {
      this.coursesService.updateCourse(this.id,this.courseForm.value).subscribe(
        (response) => {
          this.router.navigate(['/courses']);
          alert('Course updated successfully');


        },
        (error) => {
          alert('Error updating course');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

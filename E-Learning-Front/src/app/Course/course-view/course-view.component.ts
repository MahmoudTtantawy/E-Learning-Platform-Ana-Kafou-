import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent {
  courses: any;
constructor(private courseService: CoursesService) {}
ngOnInit(): void {
  this.courseService.getAllCourses().subscribe(
    (response) => {
      console.log(response , "from course");

      this.courses = response;
    },
    (error) => {
      console.error('Error fetching courses', error);
    }
  );
}
removeCourse(id: number) {
  const issure =confirm('Are you sure you want to delete this course?');
  if (!issure) {
    return;
  }
  this.courseService.deleteCourse(id).subscribe(
    (response) => {
      
      this.courses = this.courses.filter((course: any) => course.id !== id);
    },
    (error) => {
      alert('Error deleting course');
    }
  );
}
}
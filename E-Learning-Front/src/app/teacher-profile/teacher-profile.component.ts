import { Component } from '@angular/core';
import { GetTeacherService } from '../services/get-teacher.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TruncatePipe } from '../Pipes/truncate.pipe';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent {
  id:any;
  teacher: any;
  api: any;
  teacherName: any;
  teacherImage: any;
  teacherDescription: any;
  teacherTitle: any;
  teacherEmail: any;
  teacherPhone: any;
  teacherCourses: any;
  coursesCount: any;
  courseStudentCount: number=0;
  truncate = new TruncatePipe();


constructor( private getteacher :GetTeacherService , public router: Router, private activatedRoute: ActivatedRoute){
  this.id = this.activatedRoute.snapshot.params['id'];
  this.getteacher.getTeacher(this.id).subscribe((data) => {
      this.api = data,

      this.teacher=this.api.teacher,
    this.teacherName = this.teacher.name;
    this.teacherImage = this.teacher.image;
    this.teacherDescription = this.teacher.description;
    this.teacherTitle = this.teacher.title;
    this.teacherEmail = this.teacher.email;
    this.teacherPhone = this.teacher.phone;
    this.coursesCount = this.api.courses_count;

      this.teacherCourses = this.api.courses;
      console.log(this.teacherCourses);

      for(let course of this.teacherCourses){
        this.courseStudentCount += Number(course.Student_count);
        console.log( this.courseStudentCount, "dddddddddddddddd");
        }



  });
}
}

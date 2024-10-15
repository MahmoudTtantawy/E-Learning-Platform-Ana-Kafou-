import { Component } from '@angular/core';
import { GetTeacherService } from '../services/get-teacher.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  teachers :any;

  constructor(private teacher : GetTeacherService){
    this.teacher.getAllTeachers().subscribe(data => {
      // console.log((data as any).data);
      this.teachers = (data as any).data;
      // console.log(this.teachers);
    });
  }

}

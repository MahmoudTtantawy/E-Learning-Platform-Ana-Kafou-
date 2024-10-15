import { Component } from '@angular/core';
import { GetTeacherService } from '../../services/get-teacher.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-teacher',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './our-teacher.component.html',
  styleUrl: './our-teacher.component.css'
})
export class OurTeacherComponent {
  teachers :any;

  constructor(private teacher : GetTeacherService){
    this.teacher.getAllTeachers().subscribe(data => {
      this.teachers = (data as any).data.slice(0, 4);
    }); 
  }

}

import { TestService } from './../../../services/test.service';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { GetTeacherService } from '../../../services/get-teacher.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [RouterLink],
  providers: [UserService],
  templateUrl: './student-profile-view.component.html',
  styleUrls: ['./student-profile-view.component.css']
})
export class ProfileViewComponent {
  user: any;
  user_courses:any;
  user_teacher:any;
  user_data=JSON.parse(localStorage.getItem('data')!)
  constructor(private userService: UserService,private testService:TestService,private router: Router,private paymentService: PaymentService,private getAllTeachers:GetTeacherService) {
    this.user = {};
  }
  ngOnInit(): void {
    this.userService.getUser(Number(this.user_data.id)).subscribe(
      (data: any) => {
        this.user = data.data;
      }
    );
    this.userService.getUserScore(Number(this.user_data.id)).subscribe(
      (data: any) => {
        console.log(data,'ddddddddddddddd');
        this.user.score = data[0].score;
        this.user.test_id = data[0].test_id;
      this.testService.getTest(this.user.test_id).subscribe((test:any)=>{
        console.log(test.test.title,"kfndjnfjd");
        this.user.test_name = test.test.title;
      });
    });
    this.paymentService.getPayment().subscribe(
      (data: any) => {
        console.log(data);
        this.user_courses = data.courses;
        console.log(this.user_courses);
      }
    );
    this.getAllTeachers.getAllTeachers().subscribe(
      (data: any) => {
        console.log(data);
        this.user_teacher = data.data;
      }
    );
  }
}

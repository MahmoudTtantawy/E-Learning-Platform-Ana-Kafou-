import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SignInComponent } from "./Auth/sign-in/sign-in.component";
import { StudentSignUPComponent } from "./Auth/Registeration/student-sign-up/student-sign-up.component";
import { TeacherSignUPComponent } from "./Auth/Registeration/teacher-sign-up/teacher-sign-up.component";
import { HeroSectionComponent } from './LandingPage/hero-section/hero-section.component';
import { OurTeacherComponent } from './LandingPage/our-teacher/our-teacher.component';
import { AboutUsComponent } from './LandingPage/about-us/about-us.component';
import { MostResentCoursesComponent } from './LandingPage/most-resent-courses/most-resent-courses.component';
import { HeaderComponent } from "./Shared/header/header.component";
import { FooterComponent } from "./Shared/footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { ForgetPasswordComponent } from "./Auth/forget-password/forget-password.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminComponent } from "./Dashboard/admin/admin.component";
import { CourseCreateComponent } from "./Course/course-create/course-create.component";
import { ScrollToTopComponent } from "./Shared/scroll-to-top/scroll-to-top.component";
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, RouterLink, CommonModule, ReactiveFormsModule, SignInComponent, StudentSignUPComponent, TeacherSignUPComponent, ForgetPasswordComponent, OurTeacherComponent, AboutUsComponent, MostResentCoursesComponent, HeroSectionComponent, HeaderComponent, FooterComponent, HomeComponent, AdminComponent, CourseCreateComponent, ScrollToTopComponent],


  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ana-kafou';
  data: any;
  name!: string;
  image!: string;
  role_id!: any;
  ngOnInit() {
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.name = this.data.name;
      this.image = this.data.image;
      this.role_id = this.data.role_id
    }
  }


}
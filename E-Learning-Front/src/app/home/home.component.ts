import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../Shared/header/header.component';
import { HeroSectionComponent } from '../LandingPage/hero-section/hero-section.component';
import { MostResentCoursesComponent } from '../LandingPage/most-resent-courses/most-resent-courses.component';
import { OurTeacherComponent } from '../LandingPage/our-teacher/our-teacher.component';
import { AboutUsComponent } from '../LandingPage/about-us/about-us.component';
import { FooterComponent } from '../Shared/footer/footer.component';
import { QuoteSectionComponent } from "../LandingPage/quote-section/quote-section.component";
import { ContactUsComponent } from "../LandingPage/contact-us/contact-us.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent, QuoteSectionComponent, HeroSectionComponent, MostResentCoursesComponent, OurTeacherComponent, AboutUsComponent, FooterComponent, QuoteSectionComponent, ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

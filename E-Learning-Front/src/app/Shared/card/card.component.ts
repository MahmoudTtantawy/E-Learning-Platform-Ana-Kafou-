import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetTeacherService } from '../../services/get-teacher.service';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  data: any;
  name!: string;
  image!: string;
  role_id!: any;
  id!: any;
  notifications: any[] = []; 
  isloggedIn: boolean = false;
  count!: number;
  Id: any;


  @Input() course!: any;
  teacher!: any;
  teacherName!: any;
  teacherImage: any;

  constructor(private teacherService:GetTeacherService , private authservices :AuthService) { }


  ngOnInit(){
    // console.log(this.course.instructor_id);
    
  this.teacherService.getTeacher(this.course.instructor_id).subscribe((data: any) => {
         this.teacher = data.teacher[0];
         console.log(data.Teacher);

         this.teacherName=this.teacher.name[0];
        this.teacherImage = this.teacher.image[0];

        //  console.log(this.course[0] = data);

        //  console.log(this.teacherName , "teacher name ");
       });
       this.authservices.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isloggedIn = isLoggedIn;
        this.data = JSON.parse(localStorage.getItem('data')!);
        if (this.data) {
          this.name = this.data.name;
          this.id = this.data.id;
          this.image = this.data.image;
          this.role_id = this.data.role_id;
        }
      });
      }
  handleMouseMove(event: MouseEvent) {
    const card = (event.target as HTMLElement).closest('.example-card') as HTMLElement;
    if (card) {
      const cardRect = card.getBoundingClientRect();
      const mouseX = event.clientX - cardRect.left;
      const mouseY = event.clientY - cardRect.top;
      const shadowX = (mouseX - cardRect.width / 2) / 10;
      const shadowY = (mouseY - cardRect.height / 2) / 10;
      card.style.transform = `rotateX(${-shadowY}deg) rotateY(${shadowX}deg)`;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 10px 5px var(--border), var(--border) 0px 0px 0px 1px`;
    }
  }

  handleMouseLeave(event: MouseEvent) {
    const card = (event.target as HTMLElement).closest('.example-card') as HTMLElement;
    if (card) {
      card.style.transform = '';
      card.style.boxShadow = ''
    }
  }

}



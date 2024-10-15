import { Component, Input } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router , RouterLink} from '@angular/router';
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { GetTeacherService } from '../../services/get-teacher.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { TruncatePipe } from '../../Pipes/truncate.pipe';
import { CustomDatePipe } from '../../Pipes/custom-date.pipe';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink, TruncatePipe, CustomDatePipe , ReactiveFormsModule , CommonModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  data: any;
  name!: string;
  image!: string;
  role_id!: any;
  id!:any;
  isloggedIn: boolean = false;

  @Input() courseId!: number;
  comments: any[] = [];
  body:any ='';
  course: any;
  courseID:any;
  courseTitle: string="Course";
  courseImage: string="Course Image";
  courseDescription: string="Descriptions of the Course";
  coursePrice:any;
  courseCreation: string="Creation of the Course";
  courseVideos: any;
  courseVideosNum: any;

  form = new FormGroup({
    inputName: new FormControl(''),
  });

  teacher: any;
  courseInstructor: string = "Instructor";
  instructorTitle: string = "title";
  instructorDescription: string = "description";
  instructorImage: string="";
  instructourEmail: string="email";
  truncate= new TruncatePipe();
  enrollment:boolean=false;
  constructor(private playList:CoursePlaylistService,
    private courseService: CoursesService,
     public router: Router,
      private activatedRoute: ActivatedRoute,
      private teacherService: GetTeacherService,
      private enrollmentService:EnrollmentService,
      private fb: FormBuilder,
      private commentService: CommentsService
    ) {

  }
  ngOnInit() {
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.name = this.data.name;
      this.image = this.data.image;
      this.role_id = this.data.role_id;
      this.id = this.data.id;
    }

    this.id = this.activatedRoute.snapshot.params['id'];
    this.courseService.getCourse(this.id).subscribe((data: any) => {

    this.course = data
    this.courseID=data.id;
    this.courseCreation = new CustomDatePipe().transform(this.course.created_at);
    this.courseTitle = this.course.title;
    this.courseImage = this.course.thumbnail;
    this.courseDescription = new TruncatePipe().transform(this.course.description,750) ;
    this.coursePrice = this.course.price;

    this.teacherService.getTeacher(this.course.instructor_id).subscribe((data: any) => {
    this.teacher = data.teacher
    this.courseInstructor = this.teacher.name;
    this.instructorTitle = this.teacher.title;
    this.instructorDescription = this.teacher.description;
    this.instructorImage = this.teacher.image;
    this.instructourEmail = this.teacher.email;
    })
    this.playList.getpPlayList(this.course.playlist_id).subscribe((data: any) =>(
      this.courseVideos=data[0].videos,
      this.courseVideosNum = data[0].videos.length
    ));
    this.enrollmentService.getEnrollmentById(this.id).subscribe((data: any) => {
      this.enrollment = data.enrolled;
      console.log(this.enrollment,'eeeee');
      console.log(this.enrollment ,'fdmfmdfnde');
      });
    });

  this.commentService.getComments(this.id).subscribe(
    (data) => {
      this.comments = data;
      console.log(data, 'Comments');

    },
    (error) => {
      console.error('Error fetching comments:', error);
    }
  );
  }
    click(): void {
      const control = this.form.get('inputName');
      const CommentData:any={
         body:control?.value
      }
      this.commentService.addComment(this.id,CommentData).subscribe(
        (CommentData) => {
          console.log('Comment posted successfully:', CommentData);
          this.comments.push(CommentData);
          this.form.reset();
          this.commentService.getComments(this.id).subscribe(
            (data) => {
              this.comments = data;
              console.log(data, 'Comments');

            },
            (error) => {
              console.error('Error fetching comments:', error);
            }
          );

        },
        (error) => {
          console.error('Error posting comment:', error);
        }
      );
    }

    deleteComment(commentId: number) {
      this.commentService.deleteComment(commentId).subscribe({
        next: (response) => {
          this.comments = this.comments.filter(comment => comment.id !== commentId);
        },
        error: (error) => {
          console.error('Error deleting comment:', error);
        }
      });
    }

}

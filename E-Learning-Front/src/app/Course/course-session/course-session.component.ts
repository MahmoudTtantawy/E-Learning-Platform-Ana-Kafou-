import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { CoursesService } from '../../services/courses.service';
import { GetTeacherService } from '../../services/get-teacher.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { TruncatePipe } from '../../Pipes/truncate.pipe';
import { CustomDatePipe } from '../../Pipes/custom-date.pipe';

@Component({
  selector: 'app-course-session',
  standalone: true,
  templateUrl: './course-session.component.html',
  styleUrls: ['./course-session.component.css'],
  imports: [TruncatePipe, CustomDatePipe, RouterLink]
})
export class CourseSessionComponent implements OnInit {
  
  id: any;
  videoId!: string;
  videoTitle!: string;
  videoDescription!: string;
  sessionId!: string;
  course: any;
  courseID: any;
  courseTitle: string = "Course";
  courseImage: string = "Course Image";
  courseDescription: string = "Descriptions of the Course";
  coursePrice: any;
  courseCreation: string = "Creation of the Course";
  courseVideos: any;
  courseVideosNum: any;
  sanitizedUrl!: SafeResourceUrl;

  teacher: any;
  courseInstructor: string = "Instructor";
  instructorTitle: string = "title";
  instructorDescription: string = "description";
  instructorImage: string = "";
  instructourEmail: string = "email";
  truncate = new TruncatePipe();
  enrollment: boolean = false;

  constructor(
    private playList: CoursePlaylistService,
    private courseService: CoursesService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private teacherService: GetTeacherService,
    private enrollmentService: EnrollmentService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.videoId = this.activatedRoute.snapshot.params['videoId'];

    this.courseService.getCourse(this.id).subscribe((data: any) => {
      this.course = data;
      this.courseID = data.id;
      this.courseCreation = new CustomDatePipe().transform(this.course.created_at);
      this.courseTitle = this.course.title;
      this.courseImage = this.course.thumbnail;
      this.courseDescription = new TruncatePipe().transform(this.course.description, 500);
      this.coursePrice = this.course.price;

      this.teacherService.getTeacher(this.course.instructor_id).subscribe((data: any) => {
        this.teacher = data.teacher[0];
        this.courseInstructor = this.teacher.name;
        this.instructorTitle = this.teacher.title;
        this.instructorDescription = this.teacher.description;
        this.instructorImage = this.teacher.image;
        this.instructourEmail = this.teacher.email;
      });

      this.playList.getpPlayList(this.course.playlist_id).subscribe((data: any) => {
        this.courseVideos = data[0].videos;
        this.courseVideosNum = this.courseVideos.length;

        this.courseVideos.forEach((video: any) => {
          if (video.id == this.videoId) {
            this.changeVideo(video.video_id);
          }
        });
      });

      this.enrollmentService.getEnrollmentById(this.id).subscribe((data: any) => {
        this.enrollment = data.enrolled;
      });
    });
  }

  changeVideo(videoId: string) {
    this.sessionId = videoId;
    this.videoTitle = this.courseVideos.find((video: any) => video.video_id === videoId)?.title;
    this.videoDescription = this.courseVideos.find((video: any) => video.video_id === videoId)?.description;
    const videoUrl = 'https://www.youtube.com/embed/' + videoId;
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}

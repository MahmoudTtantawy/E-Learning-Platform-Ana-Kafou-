import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:8000/api/enrollments';
  data: any;
  constructor(private http: HttpClient) { }
  getEnrollments() {
    return this.http.get(this.apiUrl);
  }
  getEnrollmentById(id: number) {
    this.data={
      "course_id": Number(id),
      "user_id": JSON.parse(localStorage.getItem('data')!).id
    }
    console.log(this.data);
    return this.http.get(`${this.apiUrl}`, {params: this.data});
  }
}

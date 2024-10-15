import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url = 'http://localhost:8000/api/courses';
  constructor(private http: HttpClient) { }
  getAllCourses() {
    return this.http.get(this.url);
  }
  getCourse(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  createCourse(data: any) {
    return this.http.post(this.url, data);
  }
  updateCourse(id:number, data:any) {
    return this.http.put(`${this.url}/${id}`, data);
  }
  deleteCourse(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}

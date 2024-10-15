import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTeacherService {
  url = 'http://127.0.0.1:8000/api/teacher'
  constructor(private http: HttpClient) {

   }
   getAllTeachers() {
    return this.http.get(this.url);
   }
   getTeacher(id: any) {
    // console.log(id);
    return this.http.get(`${this.url}/${id}`);
   }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private apiUrl = 'http://127.0.0.1:8000/api/course';

  constructor(private http: HttpClient) {}


  getComments(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/comments`);
  }

  addComment(course_id:any,body: any): Observable<any> {
    console.log(course_id ,"commentservice");
    console.log(body ,"commentservice");


    return this.http.post(`${this.apiUrl}/${course_id}`, body);
  }
  deleteComment(id:any){
    return this.http.delete(`http://127.0.0.1:8000/api/comment/${id}`);
  }
}

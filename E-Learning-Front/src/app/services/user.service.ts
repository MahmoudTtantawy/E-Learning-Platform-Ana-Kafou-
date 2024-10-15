import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8000/api/students';  
  URL = 'http://localhost:8000/api/user-score';  
  constructor(private http: HttpClient) { }

  getAllStudent() {
    return this.http.get(this.url);
  }

  getUser(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  updateUser(id: number, data: any) {
    return this.http.put(this.url + '/' + id, data);
  }

  removeStudent(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getAllTrashedStudent() {
    return this.http.get(`${this.url}-trashed`);
  }
  restoreStudent(id: number) {
    return this.http.post(`http://localhost:8000/api/student/${id}/restore`, {});  
  }
  getUserScore(id: number) {
    return this.http.get(`${this.URL}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {


  url = 'http://localhost:8000/api/tests';
  Url = 'http://localhost:8000/api/user-answers';
  urlScore = 'http://localhost:8000/api/scores';
  urlCorrectAnswer = 'http://localhost:8000/api/tests-answer';
  constructor(private http: HttpClient) { }
  allTests() {
    return this.http.get(this.url);
  }
  createTest(data: any) {
    return this.http.post(this.url, data);
  }
  getTest(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  updateTest(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }
  deleteTest(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  CreateuserAnswer(data: any) {
    return this.http.post(this.Url, data);
  }
  storeTestScore(data: any) {
    return this.http.post(this.urlScore, data);
  }
  ShowCorrectTestAnswer(id: number) {
    return this.http.get(`${this.urlCorrectAnswer}/${id}`);
  }
}

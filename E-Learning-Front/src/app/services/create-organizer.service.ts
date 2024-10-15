import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateOrganizerService {

    url='http://127.0.0.1:8000/api/organizar';

    HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
    constructor(private http: HttpClient) { }
  getAllorganizer() {
    return this.http.get(this.url);
  }
  getorganizer(id: any) {
    return this.http.get(`${this.url}/${id}`);
  }
  createorganizer(data: any) {
    return this.http.post(this.url, data);
  }
  updateorganizer(id: number, data: FormData) {
    // console.log(data);
    return this.http.put(`${this.url}/${id}`, data , { headers:this.HttpHeaders });
    
  }
  deleteorganizer(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  restoreorganizer(id:number) {
    return this.http.post(`${this.url}/${id}/restore`, {}); 
  }
  getAllTrashedOrganizer(){
    return this.http.get(`http://127.0.0.1:8000/api/organizartrashed`);
  }
}


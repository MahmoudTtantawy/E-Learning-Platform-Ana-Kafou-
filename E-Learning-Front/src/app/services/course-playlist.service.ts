import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursePlaylistService {

  url = 'http://localhost:8000/api/playlists';
  constructor(private http: HttpClient) { }
  getAllPlayLists() {
    return this.http.get(this.url);
  }
  getpPlayList(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

}

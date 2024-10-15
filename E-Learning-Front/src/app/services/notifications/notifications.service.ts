import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private url = 'http://127.0.0.1:8000/api/user-notifications';
  private readUrl = 'http://127.0.0.1:8000/api/read-notifications';
  private notification = new BehaviorSubject<any[]>([]);
  userNotifications = this.notification.asObservable();
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    // interval(30000)
    //   .pipe(switchMap(() => this.getUserNotifications()))
    //   .subscribe((notifications: any) => {
    //     this.notification.next(notifications.Notifications);
    //   });
    this.getUserNotifications().subscribe((notifications: any) => {
      this.notification.next(notifications.Notifications);
    });
  }

  getUserNotifications() {
    return this.http.get<any>(this.url);
  }
  refresh(){
    this.getUserNotifications().subscribe((notifications: any) => {
      this.notification.next(notifications.Notifications);
    });
  }

  markNotificationAsRead(id: any) {
    return this.http.post(this.readUrl, id, { headers: this.httpHeaders });
  }
}
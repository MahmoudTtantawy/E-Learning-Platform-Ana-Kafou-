import { Component,OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { NotificationsService } from '../../services/notifications/notifications.service';

import {DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,DatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any;
  name!: string;
  image!: string;
  role_id!: any;
  id!: any;
  notifications: any[] = []; 
  isloggedIn: boolean = false;
  count!: number;
  Id: any;

  constructor(
    private router: Router,
    private authservices: AuthService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.name = this.data.name;
      this.image = this.data.image;
      this.role_id = this.data.role_id;
      this.id = this.data.id;
    }
    this.authservices.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isloggedIn = isLoggedIn;
      this.data = JSON.parse(localStorage.getItem('data')!);
      if (this.data) {
        this.name = this.data.name;
        this.id = this.data.id;
        this.image = this.data.image;
        this.role_id = this.data.role_id;
      }
      this.userNotification();
    });
    this.notificationService.userNotifications.subscribe((notifications) => {
      this.notifications = notifications; 
      this.count = this.notifications.reduceRight(
        (count, notification) => {
          if (notification.read_at === null) {
            return count + 1;
          }
          return count;
        },
        0
      );
    });
  }

  toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      themeIcon?.classList.replace('fa-sun', 'fa-moon');
    } else {
      themeIcon?.classList.replace('fa-moon', 'fa-sun');
    }
  }

  userNotification() {
    this.notificationService.getUserNotifications().subscribe((data: any) => {
      this.notifications = data.Notifications;
      this.count = data.unReadNotificationsCount;
    });
  }

  onLogout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('data');
    localStorage.removeItem('notifications');
    this.authservices.setLoggedIn(false);
    this.role_id = null;
    this.router.navigateByUrl("signin");
  }

  onRead(id: any) {
    this.Id = { id: id };
    this.notificationService.markNotificationAsRead(this.Id).subscribe(() => {
      this.userNotification();
    });
  }
}

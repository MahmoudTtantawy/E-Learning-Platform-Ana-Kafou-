import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  data: any;
  name!: string;
  image!: string;
  role_id!: any;


  ngOnInit() {
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.name = this.data.name;
      this.image = this.data.image;
      this.role_id = this.data.role_id; 
    }
  }

}

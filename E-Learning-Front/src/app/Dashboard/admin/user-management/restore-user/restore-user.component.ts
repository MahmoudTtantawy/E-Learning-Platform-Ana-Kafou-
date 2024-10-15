import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-restore-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './restore-user.component.html',
  styleUrl: './restore-user.component.css'
})
export class RestoreUserComponent {
  users: any;
  items: any[] = []
  constructor(private fb: FormBuilder, private router : Router,private userServices : UserService){}

ngOnInit(){
  this.userServices.getAllTrashedStudent().subscribe((data: any) => {
    this.users = data.data;
    console.log(data);
  });
}
restoreUser(id: number) {
  this.userServices.restoreStudent(id).subscribe(
    (response) => {
      alert('User restored successfully');
      this.router.navigate(['/admin/user-managment']);
    },
    (error) => {
      alert('Error restoring user');
      console.error('Error restoring user:', error);
    }
  );
}
}

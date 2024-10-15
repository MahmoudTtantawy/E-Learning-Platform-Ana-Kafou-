import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateOrganizerService } from '../../../services/create-organizer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-trashed',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './trashed.component.html',
  styleUrl: './trashed.component.css'
})
export class TrashedComponent {
  organizer: any;
  items: any[] = []
  constructor(private fb: FormBuilder, private router : Router,private Organizerservece : CreateOrganizerService){}

ngOnInit(){
  this.Organizerservece.getAllTrashedOrganizer().subscribe((data: any) => {
    this.organizer = data.data;
    console.log(data);
  });
}
  restoreItem(item: any) {
    if (confirm('Are you sure you want to restore this item?')) {
      this.Organizerservece.restoreorganizer(item.id).subscribe(
        (response) => {
          console.log('Item restored successfully', response);
        },
        (error) => {
          console.error('Error restoring item', error);
        }
      );
    }
    this.router.navigateByUrl('/allorganizer');

  }
}

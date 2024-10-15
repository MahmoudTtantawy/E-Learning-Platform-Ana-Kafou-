
import { FormBuilder } from '@angular/forms';
import { CreateOrganizerService } from './../../../services/create-organizer.service';
import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  organizer: any;
  items: any[] = []
constructor(private fb: FormBuilder,private router : Router,private Organizerservece : CreateOrganizerService){}
  ngOnInit(){
    this.Organizerservece.getAllorganizer().subscribe((data: any) => {
      this.organizer = data.data;
      // console.log(data.data);
      
    });
  }
  deleteItem(item: any) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.Organizerservece.deleteorganizer(item.id).subscribe({
        next: (response) => {
          // console.log('Item deleted:', response);
          this.items = this.items.filter(i => i !== item);
          this.router.navigateByUrl('/trashorganizer');

        },
        error: (error) => {
          console.error('Error deleting item:', error);
        }
      });
    }
  }
  navigateToUpdate(id: string) {
    this.router.navigate(['/updateorganizer', id]);  
  }
  
}

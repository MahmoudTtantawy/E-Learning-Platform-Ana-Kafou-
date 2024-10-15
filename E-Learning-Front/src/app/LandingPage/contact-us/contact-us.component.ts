import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormField} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [MatFormField,MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  subscriptionForm: FormGroup;
  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.subscriptionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.contactForm = this.fb.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  subscribe() {
    this.submitted = true;
    const email = this.subscriptionForm.get('email')?.value;

    this.http.post('http://localhost:8000/api/subscribe', { email })
      .subscribe({
        next: (response) => {
          alert('Subscription successful!');
        },
        error: (error) => {
          console.error('Subscription failed:', error);
        }
      });
  }
  sendContactMessage() {
    const contactData = {
      email: this.contactForm.get('contactEmail')?.value,
      message: this.contactForm.get('message')?.value
    };

    this.http.post('http://localhost:8000/api/contact', contactData)
      .subscribe({
        next: (response) => {
          alert('Message sent successfully');
        },
        error: (error) => {
          alert('Error sending message');
          console.error('Message send failed:', error);
        }
      });
  }
}

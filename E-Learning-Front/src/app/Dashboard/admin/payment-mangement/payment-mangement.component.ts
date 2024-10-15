import { Component } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-payment-mangement',
  standalone: true,
  imports: [],
  templateUrl: './payment-mangement.component.html',
  styleUrl: './payment-mangement.component.css'
})
export class PaymentMangementComponent {
  payments: any;
  users:any;
  courses:any;
constructor(private paymentService: PaymentService) {}
ngOnInit(): void {
  this.paymentService.getPayments().subscribe(
    (response:any) => {
      this.payments = response.payments;
     console.log(this.payments)
    },
    (error:any) => {
      console.error('Error fetching payments', error);
    }
  );
}

}

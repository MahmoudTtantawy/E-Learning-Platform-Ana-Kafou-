import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  private apiUrl = 'http://localhost:8000/api';
  user_data: any = JSON.parse(localStorage.getItem('data')!);
  private stripePromise = loadStripe('pk_test_51Q4p29HHlb6JyFN5NOmqDxMMfS65GHSLV8I9JDI7B8V74zIIeQRgyPJjC9qFP4iefByjoM70ZYw6zDHQSz8TX3UP000aCFgAl8');
  constructor(private http: HttpClient) {

  }

  getPayments() {
    return this.http.get(`${this.apiUrl}/payments`);
  }
  createPaymentIntent(courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment-intent`, { course_id: courseId });
  }

  async confirmPayment(clientSecret: string, cardElement: StripeCardElement, stripe?: Stripe) {
    if (!stripe) {
      throw new Error('Stripe.js has not loaded yet.');
    }

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    return { paymentIntent, error };
  }
  storePaymentIntent(paymentIntent: any, course_id: number): Observable<any> {
    const coniframtion = {
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      user_id: this.user_data.id,
      course_id: course_id,
    };
    return this.http.post(`${this.apiUrl}/store-payment`, coniframtion);
  }
  getPayment(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-payments`);
  }
}

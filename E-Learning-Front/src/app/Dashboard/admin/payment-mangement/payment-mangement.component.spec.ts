import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMangementComponent } from './payment-mangement.component';

describe('PaymentMangementComponent', () => {
  let component: PaymentMangementComponent;
  let fixture: ComponentFixture<PaymentMangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMangementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSubscriptionComponent } from './mail-subscription.component';

describe('MailSubscriptionComponent', () => {
  let component: MailSubscriptionComponent;
  let fixture: ComponentFixture<MailSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailSubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

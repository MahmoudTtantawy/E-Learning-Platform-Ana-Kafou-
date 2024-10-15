import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSignUPComponent } from './student-sign-up.component';

describe('StudentSignUPComponent', () => {
  let component: StudentSignUPComponent;
  let fixture: ComponentFixture<StudentSignUPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSignUPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSignUPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

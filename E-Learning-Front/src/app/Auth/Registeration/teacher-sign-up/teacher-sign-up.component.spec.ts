import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSignUPComponent } from './teacher-sign-up.component';

describe('TeacherSignUPComponent', () => {
  let component: TeacherSignUPComponent;
  let fixture: ComponentFixture<TeacherSignUPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherSignUPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherSignUPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

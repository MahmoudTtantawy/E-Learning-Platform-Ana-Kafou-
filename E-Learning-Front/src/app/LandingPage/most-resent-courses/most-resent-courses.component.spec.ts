import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostResentCoursesComponent } from './most-resent-courses.component';

describe('MostResentCoursesComponent', () => {
  let component: MostResentCoursesComponent;
  let fixture: ComponentFixture<MostResentCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostResentCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostResentCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

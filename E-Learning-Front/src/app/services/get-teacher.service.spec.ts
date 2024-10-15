import { TestBed } from '@angular/core/testing';

import { GetTeacherService } from './get-teacher.service';

describe('GetTeacherService', () => {
  let service: GetTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CreateOrganizerService } from './create-organizer.service';

describe('CreateOrganizerService', () => {
  let service: CreateOrganizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrganizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

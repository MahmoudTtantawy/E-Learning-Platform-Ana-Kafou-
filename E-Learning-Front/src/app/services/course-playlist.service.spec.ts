import { TestBed } from '@angular/core/testing';

import { CoursePlaylistService } from './course-playlist.service';

describe('CoursePlaylistService', () => {
  let service: CoursePlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursePlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

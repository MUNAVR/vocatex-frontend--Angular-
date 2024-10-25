import { TestBed } from '@angular/core/testing';

import { EditJobService } from './edit-job.service';

describe('EditJobService', () => {
  let service: EditJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

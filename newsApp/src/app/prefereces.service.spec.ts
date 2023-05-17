import { TestBed } from '@angular/core/testing';

import { PreferecesService } from './prefereces.service';

describe('PreferecesService', () => {
  let service: PreferecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

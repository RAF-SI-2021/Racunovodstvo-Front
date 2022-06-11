import { TestBed } from '@angular/core/testing';

import { ObracunService } from './obracun.service';

describe('ObracunService', () => {
  let service: ObracunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObracunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

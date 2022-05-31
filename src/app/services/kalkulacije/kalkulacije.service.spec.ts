import { TestBed } from '@angular/core/testing';

import { KalkulacijeService } from './kalkulacije.service';

describe('KalkulacijeService', () => {
  let service: KalkulacijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KalkulacijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { KonverzijaService } from './konverzija.service';

describe('KonverzijaService', () => {
  let service: KonverzijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KonverzijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

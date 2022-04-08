import { TestBed } from '@angular/core/testing';

import { KnjizenjeService } from './knjizenje.service';

describe('KnjizenjeService', () => {
  let service: KnjizenjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnjizenjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

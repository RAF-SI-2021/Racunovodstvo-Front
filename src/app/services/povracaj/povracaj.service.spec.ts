import { TestBed } from '@angular/core/testing';

import { PovracajService } from './povracaj.service';

describe('PovracajService', () => {
  let service: PovracajService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PovracajService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

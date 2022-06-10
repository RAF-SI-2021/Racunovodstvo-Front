import { TestBed } from '@angular/core/testing';

import { ProdajaGuard } from './prodaja.guard';

describe('ProdajaGuard', () => {
  let guard: ProdajaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProdajaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

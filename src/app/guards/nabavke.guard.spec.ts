import { TestBed } from '@angular/core/testing';

import { NabavkeGuard } from './nabavke.guard';

describe('NabavkeGuard', () => {
  let guard: NabavkeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NabavkeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { IzvestajGuard } from './izvestaj.guard';

describe('IzvestajGuard', () => {
  let guard: IzvestajGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IzvestajGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

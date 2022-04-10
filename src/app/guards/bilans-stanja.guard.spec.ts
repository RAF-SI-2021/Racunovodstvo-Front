import { TestBed } from '@angular/core/testing';
import {BilansStanjaGuard} from "./bilans-stanja.guard";


describe('BilansStanjaGuard', () => {
  let guard: BilansStanjaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BilansStanjaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

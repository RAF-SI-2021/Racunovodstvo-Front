import { TestBed } from '@angular/core/testing';
import {BilansUspehaGuard} from "./bilans-uspeha.guard";


describe('BilansUspehaGuard', () => {
  let guard: BilansUspehaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BilansUspehaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

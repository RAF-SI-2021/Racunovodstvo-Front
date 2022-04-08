import { TestBed } from '@angular/core/testing';
import {KIFGuard} from "./kif.guard";


describe('KIFGuard', () => {
  let guard: KIFGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KIFGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

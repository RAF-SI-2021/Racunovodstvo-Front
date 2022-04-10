import { TestBed } from '@angular/core/testing';
import {ReportsGuard} from "./reports.guard";


describe('ReportsGuard', () => {
  let guard: ReportsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReportsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

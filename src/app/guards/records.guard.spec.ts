import { TestBed } from '@angular/core/testing';
import {RecordsGuard} from "./records.guard";


describe('RecordsGuard', () => {
  let guard: RecordsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecordsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

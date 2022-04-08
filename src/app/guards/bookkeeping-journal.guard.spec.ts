import { TestBed } from '@angular/core/testing';
import {BookkeepingJournalGuard} from "./bookkeeping-journal.guard";


describe('BookkeepingJournalGuard', () => {
  let guard: BookkeepingJournalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BookkeepingJournalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

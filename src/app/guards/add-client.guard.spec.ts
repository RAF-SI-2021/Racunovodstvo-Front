import { TestBed } from '@angular/core/testing';
import {AddClientGuard} from "./add-client.guard";


describe('AddClientGuard', () => {
  let guard: AddClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

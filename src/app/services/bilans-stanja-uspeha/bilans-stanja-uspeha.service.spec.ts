import { TestBed } from '@angular/core/testing';

import { BilansStanjaUspehaService } from './bilans-stanja-uspeha.service';

describe('BilansStanjaUspehaService', () => {
  let service: BilansStanjaUspehaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilansStanjaUspehaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

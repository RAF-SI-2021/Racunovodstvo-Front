import { TestBed } from '@angular/core/testing';

import { TransakcijaService } from './transakcija.service';

describe('TransakcijaService', () => {
  let service: TransakcijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransakcijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

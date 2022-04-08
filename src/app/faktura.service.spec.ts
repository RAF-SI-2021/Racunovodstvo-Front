import { TestBed } from '@angular/core/testing';

import { FakturaService } from './faktura.service';

describe('FakturaService', () => {
  let service: FakturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakturaService);
  });

});

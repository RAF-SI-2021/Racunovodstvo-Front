import { TestBed } from '@angular/core/testing';

import { ProfitniCentarService } from './profitni-centar.service';

describe('ProfitniCentarService', () => {
  let service: ProfitniCentarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfitniCentarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

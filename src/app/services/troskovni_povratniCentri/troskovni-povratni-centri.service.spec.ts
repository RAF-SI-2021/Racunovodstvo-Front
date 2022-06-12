import { TestBed } from '@angular/core/testing';

import { TroskovniPovratniCentriService } from './troskovni-povratni-centri.service';

describe('TroskovniPovratniCentriService', () => {
  let service: TroskovniPovratniCentriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TroskovniPovratniCentriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

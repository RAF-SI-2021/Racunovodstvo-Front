import { TestBed } from '@angular/core/testing';

import { TroskovniCentarService } from './troskovni-centar.service';

describe('TroskovniCentarService', () => {
  let service: TroskovniCentarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TroskovniCentarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

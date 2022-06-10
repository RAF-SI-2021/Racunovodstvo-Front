import { TestBed } from '@angular/core/testing';

import { AnalitickeKarticeService } from './analiticke-kartice.service';

describe('AnalitickeKarticeService', () => {
  let service: AnalitickeKarticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalitickeKarticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

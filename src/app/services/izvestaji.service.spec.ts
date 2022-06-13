import { TestBed } from '@angular/core/testing';

import { IzvestajiService } from './izvestaji.service';

describe('IzvestajiService', () => {
  let service: IzvestajiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IzvestajiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

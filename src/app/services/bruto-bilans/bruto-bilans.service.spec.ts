import { TestBed } from '@angular/core/testing';

import { BrutoBilansService } from './bruto-bilans.service';

describe('BrutoBilansService', () => {
	let service: BrutoBilansService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BrutoBilansService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

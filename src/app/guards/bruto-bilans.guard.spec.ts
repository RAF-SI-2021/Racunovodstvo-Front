import { TestBed } from '@angular/core/testing';
import { BrutoBilansGuard } from './bruto-bilans.guard';

describe('BrutoBilansGuard', () => {
	let guard: BrutoBilansGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(BrutoBilansGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

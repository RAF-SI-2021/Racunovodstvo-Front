import { TestBed } from '@angular/core/testing';
import { AcquisitionsGuard } from './acquisitions.guard';

describe('AcquisitionsGuard', () => {
	let guard: AcquisitionsGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(AcquisitionsGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

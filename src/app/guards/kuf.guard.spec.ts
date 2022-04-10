import { TestBed } from '@angular/core/testing';
import { KUFGuard } from './kuf.guard';

describe('KUFGuard', () => {
	let guard: KUFGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(KUFGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

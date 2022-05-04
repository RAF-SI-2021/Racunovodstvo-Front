import { TestBed } from '@angular/core/testing';

import { FinansijskaOperativaGuard } from './finansijska-operativa.guard';

describe('FinansijskaOperativaGuard', () => {
	let guard: FinansijskaOperativaGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(FinansijskaOperativaGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

import { TestBed } from '@angular/core/testing';

import { ObracunZaradeGuard } from './obracun-zarade.guard';

describe('ObracunZaradeGuard', () => {
	let guard: ObracunZaradeGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(ObracunZaradeGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

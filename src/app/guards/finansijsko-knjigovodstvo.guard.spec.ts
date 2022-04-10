import { TestBed } from '@angular/core/testing';

import { FinansijskoKnjigovodstvoGuard } from './finansijsko-knjigovodstvo.guard';

describe('FinansijskoKnjigovodstvoGuard', () => {
	let guard: FinansijskoKnjigovodstvoGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(FinansijskoKnjigovodstvoGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

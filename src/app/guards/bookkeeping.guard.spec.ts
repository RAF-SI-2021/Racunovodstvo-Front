import { TestBed } from '@angular/core/testing';
import { BookkeppingGuard } from './bookkepping.guard';

describe('BookkeppingGuard', () => {
	let guard: BookkeppingGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(BookkeppingGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

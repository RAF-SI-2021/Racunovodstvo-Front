import { TestBed } from '@angular/core/testing';
import { MainBookGuard } from './main-book.guard';

describe('MainBookGuard', () => {
	let guard: MainBookGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(MainBookGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

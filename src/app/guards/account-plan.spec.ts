import { TestBed } from '@angular/core/testing';
import { AccountPlanGuard } from './account-plan.guard';

describe('AccountPlanGuard', () => {
	let guard: AccountPlanGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(AccountPlanGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

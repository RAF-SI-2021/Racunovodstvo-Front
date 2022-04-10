import { TestBed } from '@angular/core/testing';
import { ManageUsersGuard } from './manage-users.guard';

describe('AccountPlanGuard', () => {
	let guard: ManageUsersGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(ManageUsersGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

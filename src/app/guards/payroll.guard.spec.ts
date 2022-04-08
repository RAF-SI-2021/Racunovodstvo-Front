import { TestBed } from '@angular/core/testing';
import { PayrollGuard } from './payroll.guard';

describe('PayrollGuard', () => {
	let guard: PayrollGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(PayrollGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

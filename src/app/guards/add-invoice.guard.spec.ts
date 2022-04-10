import { TestBed } from '@angular/core/testing';
import { AddInvoiceGuard } from './add-invoice.guard';

describe('AddInvoiceGuard', () => {
	let guard: AddInvoiceGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(AddInvoiceGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});

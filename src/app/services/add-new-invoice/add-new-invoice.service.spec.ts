import { TestBed } from '@angular/core/testing';
import { AddNewInvoiceService } from './add-new-invoice.service';

describe('AddNewInvoiceService', () => {
	let service: AddNewInvoiceService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AddNewInvoiceService);
	});
});

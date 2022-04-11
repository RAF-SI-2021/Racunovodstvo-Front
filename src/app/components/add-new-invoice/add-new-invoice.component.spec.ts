import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewInvoiceComponent } from './add-new-invoice.component';

describe('AddNewInvoiceComponent', () => {
	let component: AddNewInvoiceComponent;
	let fixture: ComponentFixture<AddNewInvoiceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddNewInvoiceComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddNewInvoiceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
});

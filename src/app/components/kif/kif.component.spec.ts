import { TestBed, ComponentFixture } from '@angular/core/testing';

import { KifComponent } from './kif.component';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Invoice, Company } from 'src/app/shared/invoice.model';
import { RouterTestingModule } from '@angular/router/testing';


describe('KifComponent', () => {
	let component: KifComponent;
	let fixture: ComponentFixture<KifComponent>;
	let service: InvoiceService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				HttpClientModule,
			],declarations: [KifComponent],
    }).compileComponents();
  });


	beforeEach(async () => {
		await TestBed.configureTestingModule({

			declarations: [KifComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(KifComponent);
		component = fixture.componentInstance;
		service = fixture.debugElement.injector.get(InvoiceService);
		fixture.detectChanges();
	});
	it('should set selectedFacture to double clicked one', () => {
		expect(component.setEditable).toBeTruthy();
		let faktura = new Invoice(
			1,
			'3',
			'22/03/2222',
			'20/03/2000',
			new Company('NEBITNO'),
			'20/03/2000',
			10000,
			0,
			5,
			500,
			10500,
			10500,
			'DIN',
			1,
			10500,
			'Komentar',
			'IZLAZNA_FAKTURA',
			2,
			'1111',
			'FAKTURA'
		);
		component.setEditable(faktura);
		expect(component.selektovanaFaktura).toBe(faktura);
	});

	it('should set date input type if input is datum', () => {
		expect(component.setInputAsDate).toBeTruthy();
		component.input = 'datum';
		component.setInputAsDate();
		expect(component.inputAsDate).toBe('date');
	});

	it('should set number input type if input is preduzece', () => {
		expect(component.setInputAsDate).toBeTruthy();
		component.input = 'preduzece';
		component.setInputAsDate();
		expect(component.inputAsDate).toBe('number');
	});
});

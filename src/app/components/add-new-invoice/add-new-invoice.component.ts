import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-add-new-invoice',
	templateUrl: './add-new-invoice.component.html',
	styleUrls: ['./add-new-invoice.component.css'],
})
export class AddNewInvoiceComponent implements OnInit {
	public addingForm!: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.addingForm = this.formBuilder.group({
			brojFaktureV: ['', Validators.required],
			datumIzdavanjaV: ['', Validators.required],
			komitentV: ['', Validators.required],
			datumPlacanjaV: ['', Validators.required],
			prodajnaVrednostV: ['', Validators.required],
			porezV: ['', Validators.required],
			iznosV: ['', Validators.required],
			valutaV: ['', Validators.required, Validators.maxLength(4)],
			kursV: [
				'',
				Validators.required,
				Validators.pattern(/^\d*(?:[.,]\d{1,2})?$/),
			],
			zaNaplatuV: ['', Validators.required],
		});
	}
}

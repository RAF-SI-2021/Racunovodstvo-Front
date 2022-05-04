import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IClient } from 'src/app/shared/client.model';
import { AddNewClientService } from '../../services/add-new-client/add-new-client.service';
import { AddNewInvoiceService } from 'src/app/services/add-new-invoice/add-new-invoice.service';

@Component({
	selector: 'app-add-new-invoice',
	templateUrl: './add-new-invoice.component.html',
	styleUrls: ['./add-new-invoice.component.css'],
})
export class AddNewInvoiceComponent implements OnInit {
	public addingForm!: FormGroup;
	public clients: IClient[] = [];

	constructor(
		private formBuilder: FormBuilder,
		private addNewClientService: AddNewClientService,
		private addNewInvoiceService: AddNewInvoiceService
	) {}

	ngOnInit(): void {
		this.addingForm = this.formBuilder.group({
			brojFaktureV: ['', Validators.required],
			datumIzdavanjaV: ['', Validators.required],
			rokZaPlacanjeV: ['', Validators.required],
			komitentV: ['', Validators.required], // preduzece
			prodajnaVrednostV: ['', Validators.required],
			rabatV: ['', Validators.required],
			porezV: ['', Validators.required],
			valutaV: ['', Validators.required],
			kursV: ['', Validators.required],
			zaNaplatuV: ['', Validators.required], // naplata
		});

		this.clients = [];
		this.addNewClientService.getAllClients().subscribe((clients: any) => {
			clients.forEach((client: IClient) => {
				this.clients.push(client);
			});
		});
	}

	addNewInvoice(invoice: any): void {
		// console.log(invoice.preduzece); // id preduzeca
		this.addNewInvoiceService
			.addNewInvoice(invoice)
			.subscribe((response: any) => {
				console.log(response);
				this.ngOnInit();
			});
	}
}

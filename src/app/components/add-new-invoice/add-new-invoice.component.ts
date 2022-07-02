import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IClient } from 'src/app/shared/client.model';
import { AddNewClientService } from '../../services/add-new-client/add-new-client.service';
import { AddNewInvoiceService } from 'src/app/services/add-new-invoice/add-new-invoice.service';
import {CurrencyService} from "../../services/currency/currency.service";
import {CurrencyResponse, CurrencyResult} from "../../shared/currency.model";

@Component({
	selector: 'app-add-new-invoice',
	templateUrl: './add-new-invoice.component.html',
	styleUrls: ['./add-new-invoice.component.css'],
})
export class AddNewInvoiceComponent implements OnInit {
	public addingForm!: FormGroup;
	public clients: IClient[] = [];

	currencies: string[];
  currencyResponse: CurrencyResponse;

	constructor(
		private formBuilder: FormBuilder,
		private addNewClientService: AddNewClientService,
		private addNewInvoiceService: AddNewInvoiceService,
		private currency: CurrencyService
	) {
        this.currencies = ["RSD", "EUR", "USD", "CHF", "GBP", "AUD", "CAD", "SEK", "DKK", "NOK",
      "JPY", "RUB", "CNY", "HRK", "KWD", "PLN", "CZK", "HUF", "BAM"];
    }

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

		this.currency.getCurencies().subscribe((response) => {
          this.currencyResponse = response;
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

	promeniKurs() {
      let curr = this.addingForm.get('valutaV')?.value.toLowerCase()
      if(curr == 'rsd') {
        this.addingForm.patchValue({
          kursV: 1.00
        })
      } else {
        this.addingForm.patchValue({
          kursV: this.currencyResponse.result[curr].sre
        })
      }
    }
}

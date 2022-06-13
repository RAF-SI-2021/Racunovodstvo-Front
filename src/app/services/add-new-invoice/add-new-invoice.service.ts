import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/shared/invoice.model';

@Injectable({
	providedIn: 'root',
})
export class AddNewInvoiceService {
	private readonly api = environment.knjizenjeServiceApi + '/api/faktura';
	private readonly options = { headers: { Authorization: 'Bearer ' } };

	constructor(private httpClient: HttpClient) {
		this.options.headers.Authorization += sessionStorage.getItem(
			'jwt'
		) as string;
	}

	addNewInvoice(invoice: Invoice): Observable<Invoice> {
		const request: string = `${this.api}`;
		return this.httpClient.post<Invoice>(request, invoice, this.options);
	}
}


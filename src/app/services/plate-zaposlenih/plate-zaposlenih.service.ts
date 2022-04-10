import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plata } from '../../shared/plata.model';

@Injectable({
	providedIn: 'root',
})
export class PlateZaposlenihService {
	httpHeaders: HttpHeaders = new HttpHeaders({
		Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
	});

	constructor(private http: HttpClient) {}

	getAllPlate() {
		return this.http.get<Plata[]>(
			environment.APIEndpoint + `/api/plata/all`,
			{
				headers: this.httpHeaders,
			}
		);
	}

	filterPlate(query: string) {
		return this.http.get<Plata[]>(
			environment.APIEndpoint + `/api/plata?search=` + query,
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		);
	}
}

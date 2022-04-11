import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
	KontnaGrupa,
	readKontoResponse,
} from '../../shared/kontna-grupa.model';

@Injectable({
	providedIn: 'root',
})
export class KontnaGrupaService {
	private readonly apiUrl = environment.kontnaGrupaApi;

	constructor(private httpClient: HttpClient) {}

	delete(konto: KontnaGrupa) {
		let jwt = String(sessionStorage.getItem('jwt'));
		let url = `${this.apiUrl}/` + konto.kontnaGrupaId;

		return this.httpClient.delete(url, {
			headers: {
				Authorization: 'Bearer '.concat(jwt.toString()),
			},
		});
	}

	create(brojKonta: string, naziv: string): Observable<KontnaGrupa> {
		let jwt = String(sessionStorage.getItem('jwt'));
		let url = `${this.apiUrl}`;
		let body = {
			brojKonta: brojKonta,
			nazivKonta: naziv,
		};

		return this.httpClient.post<KontnaGrupa>(url, body, {
			headers: {
				Authorization: 'Bearer '.concat(jwt.toString()),
			},
		});
	}

	update(
		brojKonta: string,
		naziv: string,
		kontnaGrupaId: number
	): Observable<KontnaGrupa> {
		let jwt = String(sessionStorage.getItem('jwt'));
		let url = `${this.apiUrl}` + '/' + `${kontnaGrupaId}`;
		let body = {
			kontnaGrupaId: kontnaGrupaId,
			brojKonta: brojKonta,
			nazivKonta: naziv,
		};

		return this.httpClient.put<KontnaGrupa>(url, body, {
			headers: {
				Authorization: 'Bearer '.concat(jwt.toString()),
			},
		});
	}

	readAll(): Observable<readKontoResponse> {
		let jwt = String(sessionStorage.getItem('jwt'));
		let url = `${this.apiUrl}`;

		return this.httpClient.get<readKontoResponse>(url, {
			headers: {
				Authorization: 'Bearer '.concat(jwt.toString()),
			},
		});
	}
}

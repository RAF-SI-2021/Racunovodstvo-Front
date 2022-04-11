import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Zaposleni } from '../../shared/profile.model';
import { Company } from '../../shared/invoice.model';

@Injectable({
	providedIn: 'root',
})
export class ZaposleniService {
	httpHeaders: HttpHeaders = new HttpHeaders({
		Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
	});

	constructor(private http: HttpClient) {}

	getAllZaposleni() {
		return this.http.get<Zaposleni[]>(
			environment.APIEndpoint + `/api/zaposleni?search=all`,
			{
				headers: this.httpHeaders,
			}
		);
	}

	filterZaposleni(query: string) {
		return this.http.get<Zaposleni[]>(
			environment.APIEndpoint + `/api/zaposleni?search=` + query,
			{
				headers: this.httpHeaders,
				observe: 'response',
			}
		);
	}

	createZaposleni(
		ime: string,
		prezime: string,
		datumRodjenja: string,
		jmbg: string,
		pol: string,
		radnaPozicija: string,
		preduzece: Company
	) {
		return this.http.post(
			environment.APIEndpoint + `/api/zaposleni`,
			{
				ime: ime,
				prezime: prezime,
				datumRodjenja: new Date(datumRodjenja).getTime(),
				jmbg: jmbg,
				pol: pol,
				radnaPozicija: radnaPozicija,
				preduzece: preduzece,
				pocetakRadnogOdnosa: new Date().getTime(),
				statusZaposlenog: 'ZAPOSLEN',
			},
			{
				headers: this.httpHeaders,
			}
		);
	}
}

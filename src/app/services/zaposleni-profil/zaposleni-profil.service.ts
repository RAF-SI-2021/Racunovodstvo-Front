import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plata, Zaposleni } from '../../shared/profile.model';

@Injectable({
	providedIn: 'root',
})
export class ZaposleniProfilService {
	constructor(private httpClient: HttpClient) {}

	getZaposleni(id: string | null): Observable<Zaposleni> {
		const headers = {
			Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
		};
		return this.httpClient.get<Zaposleni>(
			`http://localhost:8080/api/zaposleni/${id}`,
			{
				headers: headers,
			}
		);
	}

	getPlate(id: string | null): Observable<Plata[]> {
		const headers = {
			Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
		};
		return this.httpClient.get<Plata[]>(
			`http://localhost:8080/api/zaposleni/${id}/plata`,
			{
				headers: headers,
			}
		);
	}

	putPlata(id: string | null, plata: number): Observable<Plata> {
		const headers = {
			Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
		};
		return this.httpClient.post<Plata>(
			`http://localhost:8080/api/plata/`,
			{
				datum: new Date(),
				netoPlata: plata,
				zaposleniId: id,
			},
			{ headers }
		);
	}

	updateZaposleni(
		zaposleniId: number,
		ime: string,
		prezime: string,
		imeRoditelja: string,
		pocetakRadnogOdnosa: string,
		jmbg: string,
		pol: string,
		datumRodjenja: string,
		adresa: string,
		grad: string,
		brojRacuna: string,
		stepenObrazovanja: string,
		brojRadneKnjizice: number,
		statusZaposlenog: string,
		komentar: string,
		radnaPozicija: string
	): Observable<Zaposleni> {
		console.log('prosao validaciju');
		const headers = {
			Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
		};
		return this.httpClient.put<Zaposleni>(
			`http://localhost:8080/api/zaposleni/${zaposleniId}`,
			{
				zaposleniId: zaposleniId,
				ime: ime,
				prezime: prezime,
				imeRoditelja: imeRoditelja,
				pocetakRadnogOdnosa: new Date(pocetakRadnogOdnosa),
				jmbg: jmbg,
				pol: pol,
				datumRodjenja: new Date(datumRodjenja),
				adresa: adresa,
				grad: grad,
				brojRacuna: brojRacuna,
				stepenObrazovanja: stepenObrazovanja,
				brojRadneKnjizice: brojRadneKnjizice,
				statusZaposlenog: statusZaposlenog,
				komentar: komentar,
				radnaPozicija: radnaPozicija,
			},
			{ headers }
		);
	}
}

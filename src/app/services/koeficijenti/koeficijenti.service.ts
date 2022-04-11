import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Koeficijent } from '../../shared/koeficijent.model';

@Injectable({
	providedIn: 'root',
})
export class KoeficijentiService {
	httpHeaders: HttpHeaders = new HttpHeaders({
		Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
	});

	constructor(private http: HttpClient) {}

	getAllKoeficijenti() {
		return this.http.get<Koeficijent[]>(
			environment.APIEndpoint + `/api/koeficijenti`,
			{
				headers: this.httpHeaders,
			}
		);
	}

	updateKoeficijent(
		koeficijent: Koeficijent,
		najnizaOsnovica: number,
		najvisaOsnovica: number,
		penzionoOsiguranje1: number,
		penzionoOsiguranje2: number,
		zdravstvenoOsiguranje1: number,
		zdravstvenoOsiguranje2: number
	) {
		return this.http.put(
			environment.APIEndpoint + `/api/koeficijenti`,
			{
				koeficijentId: koeficijent.koeficijentId,
				najnizaOsnovica: najnizaOsnovica,
				najvisaOsnovica: najvisaOsnovica,
				penzionoOsiguranje1: penzionoOsiguranje1,
				penzionoOsiguranje2: penzionoOsiguranje2,
				zdravstvenoOsiguranje1: zdravstvenoOsiguranje1,
				zdravstvenoOsiguranje2: zdravstvenoOsiguranje2,
				nezaposlenost1: koeficijent.nezaposlenost1,
				nezaposlenost2: koeficijent.nezaposlenost2,
				poreskoOslobadjanje: koeficijent.poreskoOslobadjanje,
				koeficijentPoreza: koeficijent.koeficijentPoreza,
				date: koeficijent.date,
				status: koeficijent.status,
			},
			{
				headers: this.httpHeaders,
			}
		);
	}
}

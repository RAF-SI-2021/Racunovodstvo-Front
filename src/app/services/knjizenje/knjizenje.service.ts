import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DnevnikKnjizenja } from 'src/app/shared/dnevnik-knjizenja.model';

@Injectable({
	providedIn: 'root',
})
export class KnjizenjeService {
	constructor(private httpClient: HttpClient) {}

	getKnjizenja(): Observable<DnevnikKnjizenja[]> {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			'Access-Control-Allow-Origin': '*',
			accept: 'application/json',
		};
		return this.httpClient.get<DnevnikKnjizenja[]>(
			'http://localhost:8080/api/knjizenje/all',
			{ headers: headers }
		);
	}
	pretrazi(
		brNaloga: string,
		od: Date,
		doo: Date,
		brDokFak: string,
		komentar: string,
		uzetOd: boolean,
		uzetDo: boolean
	): Observable<DnevnikKnjizenja[]> {
		var s = '?search=';
		if (brNaloga != '') {
			s += 'brojNaloga:' + brNaloga;
		}
		if (uzetOd) {
			if (s != '?search=') {
				s += ',';
			} /// parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0))
			s += 'datumKnjizenja>' + Math.floor(new Date(od).getTime() / 1000);
		}

		if (uzetDo) {
			if (s != '?search=') {
				s += ',';
			}
			s += 'datumKnjizenja<' + Math.floor(new Date(doo).getTime() / 1000);
		}

		if (brDokFak != '') {
			if (s != '?search=') {
				s += ',';
			}
			s += 'dokumentId:' + brDokFak;
		}

		if (komentar != '') {
			if (s != '?search=') {
				s += ',';
			}
			s += 'komentar:' + komentar;
		}

		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			'Access-Control-Allow-Origin': '*',
		};

		return this.httpClient.get<DnevnikKnjizenja[]>(
			'http://localhost:8080/api/knjizenje' + s,
			{ headers: headers }
		);
	}
}

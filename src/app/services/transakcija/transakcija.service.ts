import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Transakcija } from '../../shared/transakcija.model';
import { Pageable } from '../../shared/pageable.model';

@Injectable({
	providedIn: 'root',
})
export class TransakcijaService {
	subject: Subject<{ brojDokumenta: number; datum: string }> = new Subject<{
		brojDokumenta: number;
		datum: string;
	}>();

	constructor(private http: HttpClient) {}

	getAllTransactions(): Observable<Pageable<Transakcija>> {
		return this.http.get<Pageable<Transakcija>>(
			environment.knjizenjeServiceApi + `/api/transakcije`,
			{
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
				}),
			}
		);
	}

	filterTransactions(
		filter: string,
		value: string
	): Observable<Pageable<Transakcija>> {
		if (filter === 'datumTransakcije') {
			let date = new Date(value);
			let value2 = date.getTime() / 1000 + 24 * 60 * 60;
			value = '' + date.getTime() / 1000;

			return this.http.get<Pageable<Transakcija>>(
				environment.knjizenjeServiceApi +
					`/api/transakcije?search=` +
					filter +
					`\>${value},` +
					filter +
					`\<${value2}`,
				{
					headers: new HttpHeaders({
						Authorization:
							'Bearer ' + sessionStorage.getItem('jwt'),
					}),
				}
			);
		}

		return this.http.get<Pageable<Transakcija>>(
			environment.knjizenjeServiceApi +
				`/api/transakcije?search=` +
				filter +
				':' +
				value,
			{
				headers: new HttpHeaders({
					Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
				}),
			}
		);
	}
}

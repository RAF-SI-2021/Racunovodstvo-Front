import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable, Subject} from "rxjs";
import {Transakcija} from "../../shared/transakcija.model";

@Injectable({
  providedIn: 'root',
})
export class TransakcijaService {

  subject: Subject<{brojDokumenta: number, datum: string}> = new Subject<{brojDokumenta: number, datum: string}>();

  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<Transakcija[]> {
    return this.http.get<Transakcija[]>(environment.APIEndpoint + `/api/transakcije/all`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      }),
      }
    );
  }

  filterTransactions(filter: string, value: string): Observable<Transakcija[]> {

    if(filter === 'datumTransakcije') {
      let date = new Date(value);
      let value2 = date.getTime() / 1000 + 24 * 60 * 60;
      value = '' + date.getTime() / 1000;

      return this.http.get<Transakcija[]>(environment.APIEndpoint + `/api/transakcije?search=` +
        filter + `\>${value},` +
        filter + `\<${value2}`,
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
          }),
        }
      );
    }

    return this.http.get<Transakcija[]>(environment.APIEndpoint + `/api/transakcije?search=` +
      filter + ':' + value,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
        }),
      }
    );

  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../shared/manage-users";
import {PageableTroskovniCentar, TroskovniCentar} from "../../shared/troskovni-centar";
import {BookkeepingJournal} from "../../shared/bookkeeping-journal.model";
import {Lokacija} from "../../shared/konverzija.model";
import {Zaposleni} from "../../shared/profile.model";

@Injectable({
  providedIn: 'root'
})

export class TroskovniCentarService {


  private readonly endpoint = environment.troskovni_centar;
  private jwt;

  constructor(private httpClient: HttpClient) {
    this.jwt = sessionStorage.getItem('jwt');
  }
  getCentri(): Observable<TroskovniCentar[]>{
    let queryParams = new HttpParams();
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.get<TroskovniCentar[]>(this.endpoint + '/all',{
      headers: headers,
    });
  }
  delete(id: number): Observable<any>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.delete<any>(this.endpoint+ '/'+ id, {
      headers: headers
    })
  }

  save(troskovniCentar: TroskovniCentar): Observable<TroskovniCentar> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.troskovni_centar}`;
    return this.httpClient.post<TroskovniCentar>(url, troskovniCentar,{
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
    });
  }

  update(centar: TroskovniCentar): Observable<TroskovniCentar>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.put<TroskovniCentar>(this.endpoint,centar,{
      headers: headers
    });
  }


  assignKnizenje(knjizenje: BookkeepingJournal,troskovniCentar: TroskovniCentar): Observable<TroskovniCentar>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    let body = {
      knjizenje: knjizenje,
      bazniCentarId: troskovniCentar.id,
    };
    return this.httpClient.put<TroskovniCentar>(this.endpoint + '/addFromKnjizenje',body,{
      headers: headers,
    });
  }
  getAllLokacije(): Observable<Lokacija[]> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.lokacijeApi}`;
    return this.httpClient.get<Lokacija[]>(url, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
    });
  }
  getAllOdgovornaLica(): Observable<Zaposleni[]> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.zaposleniApi}`;

    let params = new HttpParams();
    params = params.append('search', '');

    return this.httpClient.get<Zaposleni[]>(url, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
      params: params
    });
  }
}

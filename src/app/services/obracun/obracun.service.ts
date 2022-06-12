import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../shared/manage-users";
import {Zaposleni} from "../../shared/profile.model";
import {environment} from "../../../environments/environment";
import {Obracun, ObracunZaposleni, ObracunZaradeConfig, SifraTransakcije} from "../../shared/obracun.model";
import {Pageable} from "../../shared/pageable.model";

@Injectable({
  providedIn: 'root'
})
export class ObracunService {

  private jwt;

  constructor(private httpClient: HttpClient) {
    this.jwt = sessionStorage.getItem('jwt');
  }

  getObracuni(): Observable<Obracun[]>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.get<Obracun[]>(environment.APIEndpoint+`/api/obracun/all`, {
      headers: headers
    })
  }

  izvrsiTransakciju(id: number): Observable<any>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.get<Obracun[]>(environment.APIEndpoint+`/api/obracun/obradi/`+id, {
      headers: headers
    })
  }
  getDanSifraTransakcijeId(): Observable<ObracunZaradeConfig>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    console.log("USAO")
    return this.httpClient.get<ObracunZaradeConfig>(environment.APIEndpoint+`/api/obracun_zarade_config`, {
      headers: headers
    })
  }

  getTransakcije(): Observable<Pageable<SifraTransakcije>>{
    const headers = { Authorization: `Bearer ${this.jwt}` };

    return this.httpClient.get<Pageable<SifraTransakcije>>(environment.APIEndpoint+`/api/sifraTransakcije`, {
      headers: headers
    })

  }

  findByDate(datum: String): Observable<Obracun[]>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.get<Obracun[]>(environment.APIEndpoint+`/api/obracun_zarade/`+datum, {
      headers: headers
    })
  }

  update(dan: number, sifraTransakcijeId: number): Observable<any>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    console.log("POSLATA SIFRA: " + sifraTransakcijeId + " dan: " + dan);
    return this.httpClient.post<any>(environment.APIEndpoint+`/api/obracun_zarade_config`, {
      dayOfMonth: dan,
      sifraTransakcijeId: sifraTransakcijeId
    }, {headers: headers})
  }

  updateZaposleni(obracunZaposleniId: number, netoPlata: number, ucinak: number): Observable<ObracunZaposleni>{

    let params = new HttpParams();

    params = params.append('ucinak',ucinak);
    params = params.append('netoPlata', netoPlata);
    params = params.append('idObracunZaposleni',obracunZaposleniId);

    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.put<any>(environment.APIEndpoint+`/api/obracun_zaposleni`, {

    }, {headers: headers, params: params})
  }

  deleteZaposleni(obracunZaposleniId: number): Observable<any>{
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    };



    return this.httpClient.delete<Obracun[]>(environment.APIEndpoint+`/api/obracun_zaposleni/`+ obracunZaposleniId, {
      headers: headers
    })

  }

}

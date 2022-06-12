import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IzvestajiService {

  private jwt;

  constructor(private httpClient: HttpClient) {
    this.jwt = sessionStorage.getItem('jwt');
  }

  getIzvestajOPromenamaNaKapitalu(godina1: number, godina2: number, opis: string): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    };

    let params = new HttpParams();
    params = params.append('godina1', godina1);
    params = params.append('godina2', godina2);
    params = params.append('opis', opis);

    return this.httpClient.get<any>(environment.izvestajiApi + '/promena_na_kapital', {
      headers: headers,
      'responseType': 'blob' as 'json',
      params: params
    });
  }

  getIzvestajOTransakcijamaZaKomitenta(komitent: number, naslov: string, datum1: string, datum2: string): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    };

    let params = new HttpParams();
    params = params.append('preduzece', komitent);
    params = params.append('title', naslov);
    params = params.append('datumOd', datum1);
    params = params.append('datumDo', datum2);

    return this.httpClient.get<any>(environment.izvestajiApi + '/staticki_izvestaj_o_transakcijama', {
      headers: headers,
      'responseType': 'blob' as 'json',
      params: params
    });
  }

  getIzvestajOTransakcijamaPoSifriTransakcije(naslov: string, tipSortiranja: string): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    };

    let params = new HttpParams();
    params = params.append('title', naslov);
    params = params.append('sort', tipSortiranja);

    return this.httpClient.get<any>(environment.izvestajiApi + '/sifra_transakcije', {
      headers: headers,
      'responseType': 'blob' as 'json',
      params: params
    });
  }

}

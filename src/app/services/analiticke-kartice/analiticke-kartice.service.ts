import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {KontnaGrupa} from "../../shared/kontna-grupa.model";
import {Observable} from "rxjs";
import {AnalitickeKarticeResponse} from "../../shared/analiticke-kartice.model";
import {Company} from "../../shared/invoice.model";

@Injectable({
  providedIn: 'root'
})
export class AnalitickeKarticeService {

  private readonly apiUrl = environment.analitkceKarticeApi;


  constructor(private httpClient: HttpClient) {}


  readKartice(
    konto: KontnaGrupa,
    datumOd: string,
    datumDo: string,
    komitentId: number
  ): Observable<AnalitickeKarticeResponse[]> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${this.apiUrl}`;

    let queryParams = new HttpParams();
    let date1 = new Date(datumDo);
    let date2 = new Date(datumOd);
    let str1 = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate()
    let str2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()

    console.log(str1);
    queryParams = queryParams.append('brojKonta', konto.brojKonta);
    if(datumDo != '')
      queryParams = queryParams.append('datumDo', str1);
    if(datumOd != '')
      queryParams = queryParams.append('datumOd', str2);
    if(komitentId != null)
      queryParams = queryParams.append('preduzeceId', komitentId);

    return this.httpClient.get<AnalitickeKarticeResponse[]>(url, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
      params: queryParams,
    });
  }

}

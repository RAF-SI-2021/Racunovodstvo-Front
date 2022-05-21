import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../shared/manage-users";

@Injectable({
  providedIn: 'root'
})
export class BilansStanjaUspehaService {

  private readonly stanje = environment.bilans_stanja;
  private readonly uspeh = environment.bilans_uspeha;

  private jwt;

  constructor(private httpClient: HttpClient) {
    this.jwt = sessionStorage.getItem('jwt');
  }

  get_uspeh(title: string, datum1od: string, datum1do: string, datum2od: string, datum2do: string,
            datum3od: string, datum3do: string): Observable<any> {
    let date1 = '';
    let date2 = '';
    let date3 = '';
    if(datum1do != '' || datum1od != ''){
      date1 = '&datumOd1='+ datum1od + '&datumDo1=' + datum1do;
    }
    if(datum2do != '' || datum2od != ''){
      date2 = '&datumOd2='+ datum2od + '&datumDo2=' + datum2do;
    }
    if(datum3do != '' || datum3od != ''){
      date3 = '&datumOd3='+ datum3od + '&datumDo3=' + datum3do;
    }
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    };
    return this.httpClient.get<any>(this.uspeh + `?title=${title}${date1}${date2}${date3}&kontoOd=0&kontoDo=1`, {
      headers: headers,
      'responseType'  : 'blob' as 'json'
    });
  }
  get_stanje(title: string, datum1od: string, datum1do: string, datum2od: string, datum2do: string,
              datum3od: string, datum3do: string): Observable<any> {
    let date1 = '';
    let date2 = '';
    let date3 = '';
    if(datum1do != '' || datum1od != ''){
      date1 = '&datumOd1='+ datum1od + '&datumDo1=' + datum1do;
    }
    if(datum2do != '' || datum2od != ''){
      date2 = '&datumOd2='+ datum2od + '&datumDo2=' + datum2do;
    }
    if(datum3do != '' || datum3od != ''){
      date3 = '&datumOd3='+ datum3od + '&datumDo3=' + datum3do;
    }
    const headers = {
      Authorization: `Bearer ${this.jwt}`,

    };
    return this.httpClient.get<any>(this.stanje +`?title=${title}${date1}${date2}${date3}&kontoOd=0&kontoDo=1`, {
      headers: headers,
      'responseType'  : 'blob' as 'json'
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrencyResponse} from "../../shared/currency.model";
import {environment} from "../../../environments/environment.k8s";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
  });

  constructor(private http: HttpClient) { }


  getCurencies() {
    return this.http.get<CurrencyResponse>(environment.preduzeceServiceApi + "/api/kursna_lista", {
      headers: this.httpHeaders
    })
  }
}

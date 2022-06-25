import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrencyResponse} from "../../shared/currency.model";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  httpHeaders: HttpHeaders = new HttpHeaders({
    COOKIE: "klistasess=a%3A4%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%229bde9d11243c04b7bfe6277167ffd124%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A15%3A%22178.148.108.210%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A50%3A%22Mozilla%2F5.0+%28X11%3B+Linux+x86_64%29+AppleWebKit%2F537.36%22%3Bs%3A13%3A%22last_activity%22%3Bs%3A10%3A%221656194286%22%3B%7Db3c63a83dcaf186f40148796d156edad",
  });

  constructor(private http: HttpClient) { }


  getCurencies(date: string) {
    return this.http.get<CurrencyResponse>("https://api.kursna-lista.info/5c5efe4b0083bd12f9124024f443dad9/kl_na_dan/" + date + "/json", {
      headers: this.httpHeaders
    })
  }
}

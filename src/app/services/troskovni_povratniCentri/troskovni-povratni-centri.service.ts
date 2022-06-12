import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Pageable2, ProfitniCentar, TroskovniCentar} from "../../shared/ProfitniTroskovniCentar.model";

@Injectable({
  providedIn: 'root'
})
export class TroskovniPovratniCentriService {

  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
  });

  constructor(private http: HttpClient) {

  }

  getTroskovniCentri(){
    return this.http.get<Pageable2<TroskovniCentar>>(environment.knjizenjeServiceApi + '/api/troskovni-centri?page=&size=&sort=', {
      headers: this.httpHeaders
    });
  }

  getProfitniCentri(){
    return this.http.get<Pageable2<ProfitniCentar>>(environment.knjizenjeServiceApi + '/api/profitni-centri?page=&size=&sort=', {
      headers: this.httpHeaders
    });
  }
}

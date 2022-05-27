import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ProfitniCentar, TroskovniCentar} from "../../shared/ProfitniTroskovniCentar.model";

@Injectable({
  providedIn: 'root'
})
export class TroskovniPovratniCentriService {

  constructor(private http: HttpClient) {

  }

  getTroskovniCentri(){
    return this.http.get<TroskovniCentar[]>(environment.APIEndpoint + '/api/troskovni_centri');
  }

  getProfitniCentri(){
    return this.http.get<ProfitniCentar[]>(environment.APIEndpoint + '/api/profitni_centri');
  }
}

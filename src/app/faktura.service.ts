import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Faktura, Preduzece} from "../model/model";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FakturaService {

  constructor(private http: HttpClient) { }


  filterKUF(pretraga : string, value : string){
    return this.http.get<Faktura[]>(environment.APIEndpoint+`/api/faktura/ulazneFakture/?` + pretraga + `=${value}`);
  }

  filterKIF(pretraga : string, value : string){
    return this.http.get<Faktura[]>(environment.APIEndpoint+`/api/faktura/izlazneFakture/?` + pretraga + `=${value}`);
  }

  svaPreduzeca(){
    return this.http.get<Preduzece[]>(environment.APIEndpoint+`/api/preduzece/all`);
  }

  sveFakture(){
    return this.http.get<Faktura[]>(environment.APIEndpoint+`/api/faktura/all`);
  }

  obrisiFakturu(fakturaId : number){
    return this.http.delete<any>(environment.APIEndpoint+`/api/faktura/${fakturaId}`);
  }

  izmeniFakturu(faktura : Faktura){
    return this.http.put<any>(environment.APIEndpoint+`/api/faktura`, {
      fakturaId : faktura.fakturaId,
      brojFakture: faktura.brojFakture,
      datumIzdavanja: faktura.datumIzdavanja,
      datumPlacanja: faktura.datumPlacanja,
      prodajnaVrednost: faktura.prodajnaVrednost,
      porezProcenat: faktura.porezProcenat,
      valuta: faktura.valuta,
      kurs: faktura.kurs,
      naplata: faktura.naplata,
      komentar: faktura.komentar,
      tipFakture: faktura.tipFakture,
      rabatProcenat: faktura.rabatProcenat,
      preduzece: faktura.preduzece
    });
  }
}

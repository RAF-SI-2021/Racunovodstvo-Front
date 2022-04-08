import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Faktura, Konto, Preduzece, ResponseObject} from "../model/model";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FakturaService {

  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
  });

  constructor(private http: HttpClient) {

  }




  filterKUF(pretraga : string, value : string){
    if(pretraga.includes('datum') || pretraga.includes('rokZa')){
      let date = new Date(value);
      let value2 = date.getTime() / 1000 + 24*60*60;
      value = '' + date.getTime() / 1000;
      return this.http.get<any>(environment.APIEndpoint+`/api/faktura?search=tipFakture:ULAZNA_FAKTURA,` + pretraga + `\>${value},` + pretraga + `\<${value2}`, {
        headers: this.httpHeaders,
        observe: 'response'
      });
    }
    return this.http.get<any>(environment.APIEndpoint+`/api/faktura?search=tipFakture:ULAZNA_FAKTURA,` + pretraga + `:${value}`, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  filterKIF(pretraga : string, value : string){
    if(pretraga.includes('datum') || pretraga.includes('rokZa')){
      let date = new Date(value);
      let value2 = date.getTime() / 1000 + 24*60*60;
      value = '' + date.getTime() / 1000;
      return this.http.get<any>(environment.APIEndpoint+`/api/faktura?search=tipFakture:IZLAZNA_FAKTURA,` + pretraga + `\>${value},` + pretraga + `\<${value2}`, {
        headers: this.httpHeaders,
        observe: 'response'
      });
    }
    if(pretraga.includes('rokZa')){
      let value2 = new Date();
      return this.http.get<any>(environment.APIEndpoint+`/api/faktura?search=tipFakture:IZLAZNA_FAKTURA,` + pretraga + `\>${value2},` + pretraga + `\<${value}`, {
        headers: this.httpHeaders,
        observe: 'response'
      });
    }
    return this.http.get<any>(environment.APIEndpoint+`/api/faktura?search=tipFakture:IZLAZNA_FAKTURA,` + pretraga + `:${value}`, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  svaPreduzeca(){
    return this.http.get<Preduzece[]>(environment.APIEndpoint+`/api/preduzece/all`, {
      headers: this.httpHeaders
    });
  }

  sveFakture(){
    return this.http.get<ResponseObject>(environment.APIEndpoint+`/api/faktura/all`, {
      headers: this.httpHeaders
    });
  }

  obrisiFakturu(dokumentId : number){
    return this.http.delete<any>(environment.APIEndpoint+`/api/faktura/${dokumentId}`, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  izmeniFakturu(faktura : Faktura){
    return this.http.put<Response>(environment.APIEndpoint+`/api/faktura`, {
      fakturaId : faktura.fakturaId,
      brojFakture: faktura.brojFakture,
      datumIzdavanja: faktura.datumIzdavanja,
      rokZaPlacanje: faktura.rokZaPlacanje,
      datumPlacanja: faktura.datumPlacanja,
      prodajnaVrednost: faktura.prodajnaVrednost,
      porezProcenat: faktura.porezProcenat === null ? 0 : faktura.porezProcenat,
      valuta: faktura.valuta,
      kurs: faktura.kurs,
      naplata: faktura.naplata,
      komentar: faktura.komentar === null ? '': faktura.komentar,
      tipFakture: faktura.tipFakture,
      rabatProcenat: faktura.rabatProcenat === null ? 0 : faktura.rabatProcenat,
      preduzece: faktura.preduzece,
      dokumentId: faktura.dokumentId,
      brojDokumenta: faktura.brojDokumenta,
      tipDokumenta: faktura.tipDokumenta
    }, {
      headers: this.httpHeaders,
      observe: 'response'
    });
  }

  getKontneGrupe(){
    return this.http.get<ResponseObject>(environment.APIEndpoint+'/api/konto?sort=brojKonta', {
      headers: this.httpHeaders
    })
  }

  knjizenje(kontos : Konto[], ukupnoDuguje: number, ukupnoPotrazuje: number, saldo: number, dokumentId: string, brojNaloga: string, datum: string){
    return this.http.post(environment.APIEndpoint+'/api/knjizenje', {
      "datumKnjizenja": datum,
      "brojNaloga": brojNaloga,
      "dokument":{
        "brojDokumenta": dokumentId,
        "tipDokumenta": "FAKTURA"
      },
      "konto": kontos
    },{
      headers: this.httpHeaders
    })
  }
}

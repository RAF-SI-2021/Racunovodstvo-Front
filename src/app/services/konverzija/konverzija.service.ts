import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artikal, Konverzija, Lokacija, Preduzece} from "../../shared/konverzija.model";
import {FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";
// @ts-ignore
import {Pageable} from "../../shared/pageable.model";
import {MainBook} from "../../shared/bookkeeping-journal.model";

@Injectable({
  providedIn: 'root'
})
export class KonverzijaService {

  constructor(private httpClient: HttpClient) { }

  getKonverzije(): Observable<Pageable<Konverzija>> {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    };
    return this.httpClient.get<Pageable<Konverzija>>(
      environment.nabavkaServiceApi + '/api/konverzije',
      {
        headers: headers,
      }
    );
  }

  getArtikli(idKonverzije: number): Observable<Pageable<Artikal>> {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    };
    return this.httpClient.get<Pageable<Artikal>>(
      environment.nabavkaServiceApi + "/api/artikli/" + idKonverzije,
      {
        headers: headers,
      }
    );
  }

  getSviArtikli(): Observable<Pageable<Artikal>> {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    };
    return this.httpClient.get<Pageable<Artikal>>(
      environment.nabavkaServiceApi + "/api/artikli/kalkulacija",
      {
        headers: headers,
      }
    );
  }

  getLokacije(): Observable<Lokacija[]> {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    };
    return this.httpClient.get<Lokacija[]>(
      environment.nabavkaServiceApi + '/api/lokacije',
      {
        headers: headers,
      }
    );
  }

  getKomitenti(): Observable<Preduzece[]> {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    };
    return this.httpClient.get<Preduzece[]>(
      environment.preduzeceServiceApi + '/api/preduzece/all',
      {
        headers: headers,
      }
    );
  }

  postArtikal( artikal: Artikal): Observable<Artikal>{
    console.log(artikal)
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    };
    return this.httpClient.post<Artikal>(
      environment.nabavkaServiceApi + '/api/artikli',
      artikal,
      {
        headers: headers,
      }
    );
  }

  postKonverzija(konverzija: Konverzija): Observable<Konverzija>{
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    };
    return this.httpClient.post<Konverzija>(
      environment.nabavkaServiceApi + '/api/konverzije/',
      konverzija,
      {
        headers: headers,
      }
    );
  }

  deleteKonverzija(id: number):Observable<any>{
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    };
    return this.httpClient.delete(
      environment.nabavkaServiceApi + '/api/konverzije/'+id,
      {
        headers: headers,
      }
    );
  }

  pretrazi(sifraArtikla: string, nazivArtikla: string, jedinicaMere:string, kolicina: string):Observable<Pageable<Artikal>>{
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    };
    var s = '?search=';
    if(sifraArtikla !=''){
      s+= 'sifraArtikla:' + sifraArtikla+',';
    }
    if(nazivArtikla != ''){
      s+= 'nazivArtikla:' + nazivArtikla+',';
    }
    if(jedinicaMere != ''){
      s+= 'jedinicaMere:' + jedinicaMere+',';
    }
    if(kolicina != ''){
      s+= 'kolicina:' + kolicina+',';
    }

    return this.httpClient.get<Pageable<Artikal>>(
      environment.nabavkaServiceApi + '/api/artikli' + s.substring(0, s.length - 1),
      {headers: headers}
    );
  }

  updateProdajnaCena(artikal: Artikal): Observable<Artikal>{
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    };
    console.log(artikal)
    return this.httpClient.put<Artikal>(
      environment.nabavkaServiceApi + '/api/artikli/',
      {
        "artikalId": artikal.artikalId,
        "sifraArtikla": artikal.sifraArtikla,
        "nazivArtikla": artikal.nazivArtikla,
        "jedinicaMere": artikal.jedinicaMere,
        "kolicina": artikal.kolicina,
        "nabavnaCena": artikal.nabavnaCena,
        "rabatProcenat": artikal.rabatProcenat,
        "konverzijaKalkulacijaId": artikal.konverzijaKalkulacijaId,
        "marzaProcenat": 0,
        "prodajnaCena": artikal.prodajnaCena,
        "aktivanZaProdaju": true,
        "porezProcenat": 0,
        "valid": true
      },
      {
        headers: headers,
      }
    );
  }

}

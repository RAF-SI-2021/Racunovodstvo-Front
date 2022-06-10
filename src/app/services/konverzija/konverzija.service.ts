import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artikal, Konverzija, Lokacija, Preduzece} from "../../shared/konverzija.model";
import {FormGroup} from "@angular/forms";
import {Pageable} from "../../shared/pageable.model";

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
      'http://localhost:8080/api/konverzije',
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
      "http://localhost:8080/api/artikli/" + idKonverzije,
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
      'http://localhost:8080/api/lokacije',
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
      'http://localhost:8080/api/preduzece/all',
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
      'http://localhost:8080/api/artikli',
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
      'http://localhost:8080/api/konverzije/',
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
      'http://localhost:8080/api/konverzije/'+id,
      {
        headers: headers,
      }
    );
  }
}

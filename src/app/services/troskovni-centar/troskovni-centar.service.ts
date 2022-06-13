import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../shared/manage-users";
import {PageableTroskovniCentar, TroskovniCentar} from "../../shared/troskovni-centar";
import {BookkeepingJournal} from "../../shared/bookkeeping-journal.model";
import {Lokacija} from "../../shared/konverzija.model";
import {Zaposleni} from "../../shared/profile.model";

@Injectable({
  providedIn: 'root'
})

export class TroskovniCentarService {


  private readonly endpoint = environment.troskovni_centar;
  private jwt;

  constructor(private httpClient: HttpClient) {
    this.jwt = sessionStorage.getItem('jwt');
  }
  getCentri(): Observable<TroskovniCentar[]>{
    let queryParams = new HttpParams();
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.get<TroskovniCentar[]>(this.endpoint + '/all',{
      headers: headers,
    });
  }
  deleteCentri(id: number): Observable<any>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.delete<any>(this.endpoint+ '/'+ id, {
      headers: headers
    })
  }

  addCentri(centar: TroskovniCentar, parent: TroskovniCentar): Observable<TroskovniCentar>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    let id = null;
    if(parent){
      id = parent.id;
    }
   // if(centar.parentTroskovniCentar !== undefined || centar.parentTroskovniCentar !== null ){
   //   id = centar.parentTroskovniCentar.id;
   // parent = centar.parentTroskovniCentar;
   // }
    const body= {
      "sifra": centar.sifra,
      "naziv": centar.naziv,
      "ukupniTrosak": centar.ukupniTrosak,
      "lokacijaId": centar.lokacijaId,
      "parentId": id,
      "odgovornoLiceId": centar.odgovornoLiceId,
      "parentTroskovniCentar": parent,
    }
    return this.httpClient.post<TroskovniCentar>(this.endpoint, body,{
      headers: headers
    });
  }
  editCentri(centar: TroskovniCentar): Observable<TroskovniCentar>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.put<TroskovniCentar>(this.endpoint,centar,{
      headers: headers
    });
  }


  assignKnizenje(knjizenje: BookkeepingJournal,troskovniCentar: TroskovniCentar): Observable<TroskovniCentar>{
    const headers = { Authorization: `Bearer ${this.jwt}` };
    let body = {
      knjizenje: knjizenje,
      bazniCentarId: troskovniCentar.id,
    };
    return this.httpClient.put<TroskovniCentar>(this.endpoint + '/addFromKnjizenje',body,{
      headers: headers,
    });
  }
  getAllLokacije(): Observable<Lokacija[]> {
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.get<Lokacija[]>('http://localhost:8080/api/lokacije', {
      headers: headers,
    });
  }
  getAllOdgovornaLica(): Observable<Zaposleni[]> {
    const headers = { Authorization: `Bearer ${this.jwt}` };
    let params = new HttpParams();
    params = params.append('search', '');
    return this.httpClient.get<Zaposleni[]>('http://localhost:8080/api/zaposleni', {
      headers: headers,
      params: params
    });
  }
}

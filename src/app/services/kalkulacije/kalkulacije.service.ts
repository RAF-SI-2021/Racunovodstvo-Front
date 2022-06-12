import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../../environments/environment";
import {KalkulacijaArtikal, KalkulacijeModel, Lokacija, TrosakNabavke} from "../../shared/kalkulacije.model";
import {Pageable} from "../../shared/pageable.model";

@Injectable({
  providedIn: 'root'
})
export class KalkulacijeService {

  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
  });

  constructor(private http: HttpClient) { }


  deleteKalkulacija(id: number){
    return this.http.delete(environment.nabavkaServiceApi+ `/api/kalkulacije/${id}`, {
      headers: this.httpHeaders
    });
  }

  deleteArtikal(id: number){
    return this.http.delete(environment.nabavkaServiceApi+ `/api/artikli/${id}`, {
      headers: this.httpHeaders
    });
  }

  getAllKalkulacije(){
    return this.http.get<Pageable<KalkulacijeModel>>(environment.nabavkaServiceApi+ `/api/kalkulacije`, {
      headers: this.httpHeaders
    });
  }

  getAllArtikli(id: number){
    return this.http.get<Pageable<KalkulacijaArtikal>>(environment.nabavkaServiceApi+ `/api/artikli/${id}`, {
      headers: this.httpHeaders
    });
  }

  filterKalkulacije(filter: string){
    return this.http.get<Pageable<KalkulacijeModel>>(environment.nabavkaServiceApi+ `/api/kalkulacije/` + filter, {
      headers: this.httpHeaders
    });
  }

  createKalkulacija(brojKalkulacije: string, tipKalkulacije: string, datum: string, dobavljacId: number, lokacijaId: Lokacija, troskoviNabavke: TrosakNabavke[], valuta: string, komentar: string){
    return this.http.post<KalkulacijeModel>(environment.nabavkaServiceApi+ `/api/kalkulacije`, {
      brojKalkulacije: brojKalkulacije,
      tipKalkulacije: tipKalkulacije,
      datum: datum,
      dobavljacId: dobavljacId,
      lokacija: lokacijaId,
      troskoviNabavke: troskoviNabavke,
      valuta: valuta,
      komentar: komentar
    }, {
      headers: this.httpHeaders
    });
  }

  updateKalkulacija(kalkulacijaId: number, brojKalkulacije: string, tipKalkulacije: string, datum: string, dobavljacId: number, lokacijaId: Lokacija, troskoviNabavke: TrosakNabavke[], valuta: string, komentar: string){
    return this.http.put<KalkulacijeModel>(environment.nabavkaServiceApi+ `/api/kalkulacije`, {
      id: kalkulacijaId,
      brojKalkulacije: brojKalkulacije,
      tipKalkulacije: tipKalkulacije,
      datum: datum,
      dobavljacId: dobavljacId,
      lokacija: lokacijaId,
      troskoviNabavke: troskoviNabavke,
      valuta: valuta,
      komentar: komentar
    }, {
      headers: this.httpHeaders
    });
  }

  createArtikal(aktivanZaProdaju: boolean, sifraArtikla: string, nazivArtikla: string, jedinicaMere: string, kolicina: number, nabavnaCena: number,
                rabatProcenat: number, marzaProcenat: number, porezProcenat: number, prodajnaCena: number, kalkulacijaKonverzijaId: number){
    return this.http.post<KalkulacijaArtikal>(environment.nabavkaServiceApi+ '/api/artikli', {
      aktivanZaProdaju: true,
      sifraArtikla: sifraArtikla,
      nazivArtikla: nazivArtikla,
      jedinicaMere: jedinicaMere,
      kolicina: kolicina,
      nabavnaCena: nabavnaCena,
      rabatProcenat: rabatProcenat,
      marzaProcenat: marzaProcenat,
      porezProcenat: porezProcenat,
      prodajnaCena: prodajnaCena,
      konverzijaKalkulacijaId: "" + kalkulacijaKonverzijaId
    }, {
      headers: this.httpHeaders
    });
    }


  updateArtikal(artikalId: number,aktivanZaProdaju: boolean, sifraArtikla: string, nazivArtikla: string, jedinicaMere: string, kolicina: number, nabavnaCena: number,
                rabatProcenat: number, marzaProcenat: number, porezProcenat: number, prodajnaCena: number, kalkulacijaKonverzijaId: number){
    return this.http.put<KalkulacijaArtikal>(environment.nabavkaServiceApi + `/api/artikli`, {
      artikalId: artikalId,
      aktivanZaProdaju: true,
      sifraArtikla: sifraArtikla,
      nazivArtikla: nazivArtikla,
      jedinicaMere: jedinicaMere,
      kolicina: kolicina,
      nabavnaCena: nabavnaCena,
      rabatProcenat: rabatProcenat,
      marzaProcenat: marzaProcenat,
      porezProcenat: porezProcenat,
      prodajnaCena: prodajnaCena,
      konverzijaKalkulacijaId: "" + kalkulacijaKonverzijaId
    }, {
      headers: this.httpHeaders
    });
  }

  getAllLokacije(){
    return this.http.get<Lokacija[]>(environment.nabavkaServiceApi + `/api/lokacije`, {
      headers: this.httpHeaders
    });
  }


}

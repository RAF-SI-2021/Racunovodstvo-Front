import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../../environments/environment";
import {KalkulacijaArtikal, KalkulacijeModel, Lokacija, TrosakNabavke} from "../../shared/kalkulacije.model";

@Injectable({
  providedIn: 'root'
})
export class KalkulacijeService {

  constructor(private http: HttpClient) { }


  deleteKalkulacija(id: number){
    return this.http.delete(environment.APIEndpoint+ `/api/kalkulacije/${id}`);
  }

  deleteArtikal(id: number){
    return this.http.delete(environment.APIEndpoint+ `/api/artikli/${id}`);
  }

  getAllKalkulacije(){
    return this.http.get<KalkulacijeModel[]>(environment.APIEndpoint+ `/api/kalkulacije`);
  }

  getAllArtikli(id: number){
    return this.http.get<KalkulacijaArtikal[]>(environment.APIEndpoint+ `/api/kalkulacije/${id}`);
  }

  filterKalkulacije(filter: string){
    return this.http.get<KalkulacijeModel[]>(environment.APIEndpoint+ `/api/kalkulacije/` + filter);
  }

  createKalkulacija(brojKalkulacije: string, tipKalkulacije: string, datum: string, dobavljacId: number, lokacijaId: number, troskoviNabavke: TrosakNabavke[], valuta: string, komentar: string){
    return this.http.post<KalkulacijeModel>(environment.APIEndpoint+ `/api/kalkulacije`, {
      brojKalkulacije: brojKalkulacije,
      tipKalkulacije: tipKalkulacije,
      datum: datum,
      dobavljacId: dobavljacId,
      lokacijaId: lokacijaId,
      troskoviNabavke: troskoviNabavke,
      valuta: valuta,
      komentar: komentar
    })
  }

  updateKalkulacija(kalkulacijaId: number, brojKalkulacije: string, tipKalkulacije: string, datum: string, dobavljacId: number, lokacijaId: number, troskoviNabavke: TrosakNabavke[], valuta: string, komentar: string){
    return this.http.post<KalkulacijeModel>(environment.APIEndpoint+ `/api/kalkulacije`, {
      kalkulacijaId: kalkulacijaId,
      brojKalkulacije: brojKalkulacije,
      tipKalkulacije: tipKalkulacije,
      datum: datum,
      dobavljacId: dobavljacId,
      lokacijaId: lokacijaId,
      troskoviNabavke: troskoviNabavke,
      valuta: valuta,
      komentar: komentar
    })
  }

  createArtikal(aktivanZaProdaju: boolean, sifraArtikla: string, nazivArtikla: string, jedinicaMere: string, kolicina: number, nabavnaCena: number,
                rabatProcenat: number, marzaProcenat: number, porezProcenat: number, prodajnaCena: number, kalkulacijaKonverzijaId: number){
    return this.http.post<KalkulacijaArtikal>(environment.APIEndpoint+ `/api/artikli`, {
      aktivanZaProdaju: aktivanZaProdaju,
      sifraArtikla: sifraArtikla,
      nazivArtikla: nazivArtikla,
      jedinicaMere: jedinicaMere,
      kolicina: kolicina,
      nabavnaCena: nabavnaCena,
      rabatProcenat: rabatProcenat,
      marzaProcenat: marzaProcenat,
      porezProcenat: porezProcenat,
      prodajnaCena: prodajnaCena,
      kalkulacijaKonverzijaId: "" + kalkulacijaKonverzijaId
    })
    }


  updateArtikal(artikalId: number,aktivanZaProdaju: boolean, sifraArtikla: string, nazivArtikla: string, jedinicaMere: string, kolicina: number, nabavnaCena: number,
                rabatProcenat: number, marzaProcenat: number, porezProcenat: number, prodajnaCena: number, kalkulacijaKonverzijaId: number){
    return this.http.post<KalkulacijaArtikal>(environment.APIEndpoint+ `/api/artikli`, {
      artikalId: artikalId,
      aktivanZaProdaju: aktivanZaProdaju,
      sifraArtikla: sifraArtikla,
      nazivArtikla: nazivArtikla,
      jedinicaMere: jedinicaMere,
      kolicina: kolicina,
      nabavnaCena: nabavnaCena,
      rabatProcenat: rabatProcenat,
      marzaProcenat: marzaProcenat,
      porezProcenat: porezProcenat,
      prodajnaCena: prodajnaCena,
      kalkulacijaKonverzijaId: "" + kalkulacijaKonverzijaId
    })
  }

  getAllLokacije(){
    return this.http.get<Lokacija[]>(environment.APIEndpoint + `/api/lokacije`)
  }


}

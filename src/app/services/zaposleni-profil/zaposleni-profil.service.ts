import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Zaposleni} from "../../shared/profile.model";

@Injectable({
  providedIn: 'root'
})
export class ZaposleniProfilService {


  constructor(private httpClient: HttpClient) {
  }

  getZaposleni(id: string | null): Observable<Zaposleni> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('jwt')}` };
    return this.httpClient.get<Zaposleni>(`http://localhost:8080/api/zaposleni/${id}`, {
      headers: headers,
    });
  }

  updateZaposleni(zaposleniId: number, ime: string, prezime: string, imeRoditelja: string, pocetakRadnogOdnosa: string, jmbg: string,
                  pol: string, datumRodjenja: string, adresa: string, grad: string, brojRacuna: string, stepenObrazovanja: string,
                  brojRadneKnjizice: number, statusZaposlenog: string, komentar: string, radnaPozicija: string): Observable<Zaposleni>{
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("jwt")}
    return this.httpClient.put<Zaposleni>(`http://localhost:8080/api/zaposleni/${zaposleniId}`, {
      zaposleniId: zaposleniId,
      ime: ime,
      prezime: prezime,
      imeRoditelja: imeRoditelja,
      string: pocetakRadnogOdnosa,
      jmbg: jmbg,
      pol: pol,
      datumRodjenja: datumRodjenja,
      adresa: adresa,
      grad: grad,
      brojRacuna: brojRacuna,
      stepenObrazovanja: stepenObrazovanja,
      brojRadneKnjizice: brojRadneKnjizice,
      statusZaposlenog: statusZaposlenog,
      komentar: komentar,
      radnaPozicija: radnaPozicija
    }, {headers})
  }
}

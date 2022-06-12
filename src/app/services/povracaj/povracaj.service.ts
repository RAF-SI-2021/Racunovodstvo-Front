import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PovracajModel} from "../../shared/povracaj.model";

@Injectable({
  providedIn: 'root'
})
export class PovracajService {

  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
  });

  constructor(private http: HttpClient) {
  }


  getAll() {
    return this.http.get<PovracajModel[]>(environment.knjizenjeServiceApi + '/api/povracaji/all', {
      headers: this.httpHeaders
    });
  }

  editPovracaj(povracajId: number, brojPovracaja: string, datum: string, prodajnaVrednost: number) {
    return this.http.put(environment.knjizenjeServiceApi + '/api/povracaji', {
      povracajId: povracajId,
      brojPovracaja: brojPovracaja,
      datumPovracaja: datum,
      prodajnaVrednost: prodajnaVrednost
    }, {
      headers: this.httpHeaders
    })
  }


  createPovracaj(brojPovracaja: string, datum: string, prodajnaVrednost: number) {
    return this.http.post(environment.knjizenjeServiceApi + '/api/povracaji', {
      brojPovracaja: brojPovracaja,
      datumPovracaja: datum,
      prodajnaVrednost: prodajnaVrednost
    }, {
      headers: this.httpHeaders
    })
  }

  deletePovracaj(id: number) {
    return this.http.delete(environment.knjizenjeServiceApi + `/api/povracaji/${id}`,{
      headers: this.httpHeaders
    })
  }
}

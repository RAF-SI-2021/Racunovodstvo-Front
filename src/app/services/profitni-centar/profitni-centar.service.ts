import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookkeepingJournal} from "../../shared/bookkeeping-journal.model";
import {PageableProfitniCentar, ProfitniCentar} from "../../shared/profitni-centar.model";
import {Zaposleni} from "../../shared/profile.model";
import {Lokacija} from "../../shared/konverzija.model";


@Injectable({
  providedIn: 'root'
})
export class ProfitniCentarService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<ProfitniCentar[]> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.profitniCentriApi}`;

    return this.httpClient.get<ProfitniCentar[]>(url + '/all', {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      }
    });
  }

  getAllPageable(): Observable<PageableProfitniCentar> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.profitniCentriApi}`;
    let params = new HttpParams();
    params = params.append('page', '');
    params = params.append('size', '');
    params = params.append('sort', '');

    return this.httpClient.get<PageableProfitniCentar>(url, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
      params: params,
    });
  }

  save(profitniCentar: ProfitniCentar): Observable<ProfitniCentar> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.profitniCentriApi}`;
    return this.httpClient.post<ProfitniCentar>(url, profitniCentar,{
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
    });
  }

  addKontosFromKnjizenje(knjizenje: BookkeepingJournal, profitniCentar: ProfitniCentar): Observable<ProfitniCentar> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.profitniCentriApi}`;
    let body = {
      knjizenje: knjizenje,
      bazniCentarId: profitniCentar.id
    };

    return this.httpClient.put<ProfitniCentar>(url + '/addFromKnjizenje', body, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
    });
  }

  update(profitniCentar: ProfitniCentar): Observable<ProfitniCentar> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.profitniCentriApi}`;

    return this.httpClient.put<ProfitniCentar>(url, profitniCentar, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
    });
  }

  delete(id: number): Observable<void> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.profitniCentriApi}`;
    return this.httpClient.delete<void>(url + '/' + id, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
    });
  }


  getAllLokacije(): Observable<Lokacija[]> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.lokacijeApi}`;
    return this.httpClient.get<Lokacija[]>(url, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
    });
  }

  getAllOdgovornaLica(): Observable<Zaposleni[]> {
    let jwt = String(sessionStorage.getItem('jwt'));
    let url = `${environment.zaposleniApi}`;

    let params = new HttpParams();
    params = params.append('search', '');

    return this.httpClient.get<Zaposleni[]>(url, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
      params: params
    });
  }

}

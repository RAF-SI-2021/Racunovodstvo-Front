import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookkeepingJournal} from "../../shared/bookkeeping-journal.model";
import {PageableProfitniCentar, ProfitniCentar} from "../../shared/profitni-centar.model";

const jwt = String(sessionStorage.getItem('jwt'));
const url = `${environment.profitniCentriApi}`;

@Injectable({
  providedIn: 'root'
})
export class ProfitniCentarService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<PageableProfitniCentar> {
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

  addKontosFromKnjizenje(knjizenje: BookkeepingJournal, profitniCentar: ProfitniCentar): Observable<ProfitniCentar> {
    let body = {
      knjizenje: knjizenje,
      profitniCentar: profitniCentar
    };

    return this.httpClient.put<ProfitniCentar>(url + '/addFromKnjizenje', body, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
    });
  }

  update(profitniCentar: ProfitniCentar): Observable<ProfitniCentar> {
    let body = {
      profitniCentar: profitniCentar
    };

    return this.httpClient.put<ProfitniCentar>(url, body, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
    });
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(url + '/' + id, {
      headers: {
        Authorization: 'Bearer '.concat(jwt.toString()),
      },
    });
  }

}

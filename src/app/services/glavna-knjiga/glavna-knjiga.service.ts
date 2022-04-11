import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  BookkeepingJournal,
  MainBook,
} from '../../shared/bookkeeping-journal.model';

@Injectable({
  providedIn: 'root',
})
export class GlavnaKnjigaService {
  constructor(private httpClient: HttpClient) {
  }

  pretrazi(
    od: string,
    doo: string,
    konto: string,
    nazivKonta: string,
    komentar: string
  ): Observable<MainBook[]> {

    if (
      od == '' &&
      doo == '' &&
      konto == '' &&
      nazivKonta == '' &&
      komentar == ''
    ) {
      return this.getGlavneKnjige();
    } else {
      var s = '?search=';
    }
    if (konto != '') {
      s += 'kontnaGrupa_brojKonta:' + konto + ',';
    }

    if(od != ''){
      s += 'knjizenje_datumKnjizenja>' +
        Math.floor(new Date(od).getTime() /1000) + ',';
    }else{
      if(doo != ''){
        s += 'knjizenje_datumKnjizenja>' +
          Math.floor(new Date().getTime() /1000) + ',';

      }
    }

    if(doo != ''){
      s +=
          'knjizenje_datumKnjizenja<' +
        Math.floor(new Date(doo).getTime() / 1000) + ',';

    }else{
      if(od != ''){
        s +=
          'knjizenje_datumKnjizenja<' +
          Math.floor(new Date("1970-01-01").getTime() / 1000) + ',';
      }
    }

    if (komentar != '') {
      s += 'knjizenje_komentar:' + komentar + ',';
    }

    if (nazivKonta != '') {
      s += 'kontnaGrupa_nazivKonta:' + nazivKonta + ',';
    }

    const headers = {
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      'Access-Control-Allow-Origin': '*',
    };

    return this.httpClient.get<MainBook[]>(
      'http://localhost:8080/api/glavna-knjiga' + s.substring(0, s.length - 1),
      {headers: headers}
    );
  }

  getGlavneKnjige() {
    const headers = {
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      'Access-Control-Allow-Origin': '*',
      accept: 'application/json',
    };
    return this.httpClient.get<MainBook[]>(
      'http://localhost:8080/api/glavna-knjiga/all',
      {headers: headers}
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookkeepingJournal } from 'src/app/shared/bookkeeping-journal.model';

@Injectable({
	providedIn: 'root',
})
export class BookkeepingJournalService {
	constructor(private httpClient: HttpClient) {}

	getKnjizenja(): Observable<BookkeepingJournal[]> {
		const headers = {
			Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
			'Access-Control-Allow-Origin': '*',
			accept: 'application/json',
		};
		return this.httpClient.get<BookkeepingJournal[]>(
			'http://localhost:8080/api/knjizenje/all',
			{ headers: headers }
		);
	}
	pretrazi(
		brNaloga: string,
		od: string,
		doo: string,
		brDokFak: string,
		komentar: string,
	): Observable<BookkeepingJournal[]> {



    if (
      od == '' &&
      doo == '' &&
      brDokFak == '' &&
      brNaloga == '' &&
      komentar == ''
    ) {
      return this.getKnjizenja();
    } else {
      var s = '?search=';
    }

		if (brNaloga != '') {
			s += 'brojNaloga:' + brNaloga + ',';
		}

    if(od != ''){
      s += 'datumKnjizenja>' +
        Math.floor(new Date(od).getTime() / 1000) + ',';
    }else{
      if(doo != ''){
        s += 'datumKnjizenja>' +
          Math.floor(new Date(3600).getTime() / 1000) + ',';
      }
    }

    if(doo != ''){
      s +=
        'datumKnjizenja<' +
        Math.floor(new Date(doo).getTime() / 1000)  + ',';
    }else{
      if(od != ''){
        s +=
          'datumKnjizenja<' +
          Math.floor(new Date().getTime() / 1000)  + ',';
      }
    }

		if (brDokFak != '') {
			s += 'dokumentId:' + brDokFak + ',';
		}

		if (komentar != '') {
			s += 'komentar:' + komentar + ',';
		}

		const headers = {
			Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
			'Access-Control-Allow-Origin': '*',
		};

		return this.httpClient.get<BookkeepingJournal[]>(
			'http://localhost:8080/api/knjizenje' + s.substring(0, s.length - 1),
			{ headers: headers }
		);
	}
}

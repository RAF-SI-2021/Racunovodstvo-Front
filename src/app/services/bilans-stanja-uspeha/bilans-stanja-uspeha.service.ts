import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../shared/manage-users";

@Injectable({
  providedIn: 'root'
})
export class BilansStanjaUspehaService {

  private readonly stanje = environment.bilans_stanja;
  private readonly uspeh = environment.bilans_uspeha;

  private jwt;

  constructor(private httpClient: HttpClient) {
    this.jwt = sessionStorage.getItem('jwt');
  }

  get_uspeh(title: string, datum1od: string, datum1do: string, datum2od: string, datum2do: string,
            datum3od: string, datum3do: string): Observable<any> {
    let date1 = '';
    let date2 = '';
    let date3 = '';
    if(datum1do != '' || datum1od != ''){
    let datum1od_correct = this.get_correct_date_format(datum1od);
    let datum1do_correct = this.get_correct_date_format(datum1do);
      date1 = '&datumiOd='+ datum1od_correct + '&datumiDo=' + datum1do_correct;
    }
    if(datum2do != '' || datum2od != ''){
      let datum2od_correct = this.get_correct_date_format(datum2od);
      let datum2do_correct = this.get_correct_date_format(datum2do);
      date2 = '&datumiOd='+ datum2od_correct + '&datumiDo=' + datum2do_correct;
    }
    if(datum3do != '' || datum3od != ''){
      let datum3od_correct = this.get_correct_date_format(datum3od);
      let datum3do_correct = this.get_correct_date_format(datum3do);
      date3 = '&datumiOd='+ datum3od_correct + '&datumiDo=' + datum3do_correct;
    }
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    };
    return this.httpClient.get<any>(this.uspeh + `?title=${title}${date1}${date2}${date3}&kontoOd=0&kontoDo=1`, {
      headers: headers,
      'responseType'  : 'blob' as 'json'
    });
  }
  get_stanje(title: string, datum1od: string, datum1do: string, datum2od: string, datum2do: string,
              datum3od: string, datum3do: string): Observable<any> {
    let date1 = '';
    let date2 = '';
    let date3 = '';
    if(datum1do != '' || datum1od != ''){
      let datum1od_correct = this.get_correct_date_format(datum1od);
      let datum1do_correct = this.get_correct_date_format(datum1do);
      date1 = '&datumiOd='+ datum1od_correct + '&datumiDo=' + datum1do_correct;
    }
    if(datum2do != '' || datum2od != ''){
      let datum2od_correct = this.get_correct_date_format(datum2od);
      let datum2do_correct = this.get_correct_date_format(datum2do);
      date2 = '&datumiOd='+ datum2od_correct + '&datumiDo=' + datum2do_correct;
    }
    if(datum3do != '' || datum3od != ''){
      let datum3od_correct = this.get_correct_date_format(datum3od);
      let datum3do_correct = this.get_correct_date_format(datum3do);
      date3 = '&datumiOd='+ datum3od_correct + '&datumiDo=' + datum3do_correct;
    }
    const headers = {
      Authorization: `Bearer ${this.jwt}`,

    };
    return this.httpClient.get<any>(this.stanje +`?title=${title}${date1}${date2}${date3}&kontoOd=0&kontoDo=1`, {
      headers: headers,
      'responseType'  : 'blob' as 'json'
    });
  }

  get_correct_date_format(date: string) : string
  {
    let split1 = date.split('/')
    return split1[2] + '-' + split1[1] + '-' + split1[0]
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DnevnikKnjizenja, GlavnaKnjiga} from "../shared/knjizenje.model";

@Injectable({
  providedIn: 'root'
})
export class GlavnaKnjigaService {

  constructor(private httpClient: HttpClient) {

  }
  pretrazi(od:Date, doo:Date, konto: string, nazivKonta: string, komentar: string, uzetOd: boolean, uzetDo: boolean): Observable<DnevnikKnjizenja[]>{
    if (konto == '' && nazivKonta =='' && komentar == '' && uzetDo == false && uzetOd == false){
      s = '';
    }else{
      var s = "?search=";
    }
    if(konto != ''){
      s +=  'kontnaGrupa_brojKonta:'+ konto;
    }
    if(uzetOd){
      if(s != "?search="){
        s+=",";
      }/// parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0))
      s+= 'knjizenje_datumKnjizenja>'+ Math.floor(new Date(od).getTime() / 1000);
    }

    if(uzetDo){
      if(s != "?search="){
        s+=",";
      }
      s+= 'knjizenje_datumKnjizenja<'+ Math.floor(new Date(doo).getTime() / 1000);
    }

    if(komentar != ''){
      if(s != "?search="){
        s+=",";
      }
      s+='knjizenje_komentar:'+komentar;
    }

    if(nazivKonta != ''){
      if(s != "?search="){
        s+=",";
      }
      s+='kontnaGrupa_nazivKonta:'+nazivKonta;
    }

    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("jwt"), "Access-Control-Allow-Origin": "*"}

    return this.httpClient.get<DnevnikKnjizenja[]>('http://localhost:8080/api/glavna-knjiga'+s,{headers:headers});
  }


  getGlavneKnjige() {
    const headers = { 'Authorization': 'Bearer ' +  localStorage.getItem("jwt"), "Access-Control-Allow-Origin": "*", "accept":"application/json"}
    return this.httpClient.get<GlavnaKnjiga[]>('http://localhost:8080/api/glavna-knjiga/all', {headers:headers});
  }
}

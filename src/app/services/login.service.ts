import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponse} from "../../model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = environment.authApi

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<LoginResponse>> {
    let body =
      {
        username: username,
        password: password
      }
    let url = `${this.apiUrl}/login`
    return this.httpClient.post<LoginResponse>(url, body, {observe: 'response'})
  }


}

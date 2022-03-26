import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.userApi

  constructor(private httpClient: HttpClient) { }

  getLoggedInUser(): Observable<User> {
    let jwt = String(localStorage.getItem('jwt'))
    let url = `${this.apiUrl}/loginuser`

    return this.httpClient.get<User>(url, {
      headers: {
        'Authorization': 'Bearer '.concat(jwt.toString())
      }
    })
  }
}

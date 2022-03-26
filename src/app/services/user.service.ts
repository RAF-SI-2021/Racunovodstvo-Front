import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Permission} from "../../model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.permissionApi

  constructor(private httpClient: HttpClient) { }

  getPermissions(): Observable<Permission[]> {
    let jwt = String(localStorage.getItem('jwt'))
    let url = `${this.apiUrl}/all`

    return this.httpClient.get<Permission[]>(url, {
      headers: {
        'Authorization': 'Bearer '.concat(jwt.toString())
      }
    })
  }
}

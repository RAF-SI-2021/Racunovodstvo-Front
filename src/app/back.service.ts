import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Permission, User, Users} from "../model";

@Injectable({
  providedIn: 'root'
})
export class BackService {


  private readonly list_users = environment.list_users
  private readonly add_upd_del_user = environment.add_upd_del_user
  private readonly jwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjQ4NTE5NjUyLCJpYXQiOjE2NDg0ODM2NTJ9.98jVs1L0qoLQrCcaDP0xy7TInpl9SyP-W8LZk0vJAlxtkp_lAgHnlFOu7ojSPnjhMDdaCaMagtjnVxO-PtqlPg'

  constructor(private httpClient: HttpClient) { }


  listAllUsers(): Observable<User[]>{
    const headers = { 'Authorization': `Bearer ${this.jwt}`}
    return this.httpClient.get<User[]>(this.list_users, {'headers':headers})
  }
  addUser(usrname: string, firstName: string, lastName: string, password: string, permissions: Permission[]): Observable<User>{
    const headers = { 'Authorization': `Bearer ${this.jwt}`}
    let permish = JSON.stringify(permissions);
    console.log(permish)
    return this.httpClient.post<User>(this.add_upd_del_user, {
      "username": usrname,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "user_permissions": permish
    }, {'headers':headers})
  }



  updateUser(usrname: string, firstName: string, lastName: string, id: number): Observable<User>{
    const headers = { 'Authorization': `Bearer ${this.jwt}`}
    return this.httpClient.put<User>(this.add_upd_del_user, {
      "userId": id,
      "username": usrname,
      "firstName": firstName,
      "lastName": lastName,
    }  ,{'headers':headers})
  }
  deleteUser(id: number): Observable<any> {
    const headers = { 'Authorization': `Bearer ${this.jwt}` , 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'}
    console.log(this.add_upd_del_user + id)
    return this.httpClient.delete<any>(this.add_upd_del_user + id,{'headers':headers})
  }





}

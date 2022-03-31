import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Users } from '../../shared/manage-users';

@Injectable({
  providedIn: 'root',
})
export class ManageUsersService {
  private readonly list_users = environment.list_users;
  private readonly add_upd_del_user = environment.add_upd_del_user;
  private jwt;

  constructor(private httpClient: HttpClient) {
    this.jwt = localStorage.getItem('jwt');
  }

  listAllUsers(): Observable<User[]> {
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.get<User[]>(this.list_users, { headers: headers });
  }
  addUser(
    usrname: string,
    firstName: string,
    lastName: string,
    password: string
  ): Observable<User> {
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.post<User>(
      this.add_upd_del_user,
      {
        username: usrname,
        password: password,
        firstName: firstName,
        lastName: lastName,
      },
      { headers: headers }
    );
  }

  updateUser(
    usrname: string,
    firstName: string,
    lastName: string,
    id: number
  ): Observable<User> {
    const headers = { Authorization: `Bearer ${this.jwt}` };
    return this.httpClient.put<User>(
      this.add_upd_del_user,
      {
        userId: id,
        username: usrname,
        firstName: firstName,
        lastName: lastName,
      },
      { headers: headers }
    );
  }
  deleteUser(id: number): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.jwt}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    };
    console.log(this.add_upd_del_user + id);
    return this.httpClient.delete<any>(this.add_upd_del_user + id, {
      headers: headers,
    });
  }
}

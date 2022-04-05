import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../shared/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	private readonly apiUrl = environment.authApi;

	constructor(private httpClient: HttpClient) {}

	login(username: string, password: string): Observable<LoginResponse> {
		let body = {
			username: username,
			password: password,
		};
		let url = `${this.apiUrl}/login`;
		return this.httpClient.post<LoginResponse>(url, body);
	}
}

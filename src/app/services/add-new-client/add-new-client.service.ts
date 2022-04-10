import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../../shared/client.model';

@Injectable({
	providedIn: 'root',
})
export class AddNewClientService {
	private readonly api = 'http://localhost:8080/api/preduzece';
	private readonly options = { headers: { Authorization: 'Bearer ' } };

	constructor(private httpClient: HttpClient) {
		this.options.headers.Authorization += sessionStorage.getItem(
			'jwt'
		) as string;
	}

	getAllClients(): Observable<IClient> {
		const request: string = `${this.api}/all`;
		return this.httpClient.get<IClient>(request, this.options);
	}

	addNewClient(client: IClient): Observable<IClient> {
		const request: string = `${this.api}`;
		return this.httpClient.post<IClient>(request, client, this.options);
	}

	updateClient(client: IClient): Observable<IClient> {
		const request: string = `${this.api}`;
		return this.httpClient.put<IClient>(request, client, this.options);
	}

	deleteClient(clientId: number): Observable<IClient> {
		const request: string = `${this.api}/${clientId}`;
		return this.httpClient.delete<IClient>(request, this.options);
	}
}

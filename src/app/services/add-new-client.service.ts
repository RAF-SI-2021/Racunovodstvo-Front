import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../shared/client.model';

@Injectable({
  providedIn: 'root',
})
export class AddNewClientService {
  private readonly api = 'http://localhost:8080/api/preduzece';

  constructor(private httpClient: HttpClient) {}

  getAllClients(): Observable<IClient> {
    const request: string = `${this.api}/all`;
    return this.httpClient.get<IClient>(request);
  }

  addNewClient(client: IClient): Observable<IClient> {
    const request: string = `${this.api}`;
    return this.httpClient.post<IClient>(request, client);
  }

  updateClient(client: IClient): Observable<IClient> {
    const request: string = `${this.api}`;
    return this.httpClient.put<IClient>(request, client);
  }

  deleteClient(clientId: number): Observable<IClient> {
    const request: string = `${this.api}/${clientId}`;
    return this.httpClient.delete<IClient>(request);
  }
}

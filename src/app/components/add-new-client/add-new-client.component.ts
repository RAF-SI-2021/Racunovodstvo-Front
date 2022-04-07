import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/shared/client.model';
import { AddNewClientService } from '../../services/add-new-client/add-new-client.service';

@Component({
	selector: 'app-add-new-client',
	templateUrl: './add-new-client.component.html',
	styleUrls: ['./add-new-client.component.css'],
})
export class AddNewClientComponent implements OnInit {
	public openFormForAddingNewClient = false;
	public clients: IClient[] = [];

	constructor(private addNewClientService: AddNewClientService) {}

	ngOnInit(): void {
		this.clients = [];
		this.addNewClientService.getAllClients().subscribe((clients: any) => {
			clients.forEach((client: IClient) => {
				this.clients.push(client);
			});
		});
	}

	addNewClient(client: IClient): void {
		this.addNewClientService
			.addNewClient(client)
			.subscribe((response: any) => {
				console.log(response);
				this.ngOnInit();
			});
	}

	updateClient(client: IClient): void {
		this.addNewClientService
			.updateClient(client)
			.subscribe((response: any) => {
				console.log(response);
				this.ngOnInit();
			});
	}

	deleteClient(client: IClient): void {
		this.addNewClientService
			.deleteClient(client.preduzeceId as number)
			.subscribe((response: any) => {
				console.log(response);
				this.ngOnInit();
			});
	}
}

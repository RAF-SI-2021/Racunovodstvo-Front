import { TestBed } from '@angular/core/testing';

import { AddNewClientService } from './add-new-client.service';

describe('AddNewClientService', () => {
	let service: AddNewClientService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AddNewClientService);
	});
});

import { TestBed } from '@angular/core/testing';

import { PlateZaposlenihService } from './plate-zaposlenih.service';

describe('PlateZaposlenihService', () => {
	let service: PlateZaposlenihService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PlateZaposlenihService);
	});
});

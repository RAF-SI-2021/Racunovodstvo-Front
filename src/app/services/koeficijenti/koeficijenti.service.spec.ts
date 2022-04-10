import { TestBed } from '@angular/core/testing';

import { KoeficijentiService } from './koeficijenti.service';

describe('KoeficijentiService', () => {
	let service: KoeficijentiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(KoeficijentiService);
	});
});

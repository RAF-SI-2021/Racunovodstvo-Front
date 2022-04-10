import { TestBed } from '@angular/core/testing';
import { GlavnaKnjigaService } from './glavna-knjiga.service';

describe('GlavnaKnjigaService', () => {
	let service: GlavnaKnjigaService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GlavnaKnjigaService);
	});
});

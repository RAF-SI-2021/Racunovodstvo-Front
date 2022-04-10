import { TestBed } from '@angular/core/testing';

import { ZaposleniProfilService } from './zaposleni-profil.service';

describe('ZaposleniProfilService', () => {
	let service: ZaposleniProfilService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ZaposleniProfilService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

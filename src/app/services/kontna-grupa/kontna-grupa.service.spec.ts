import { TestBed } from '@angular/core/testing';
import { KontnaGrupaService } from './kontna-grupa.service';
import { HttpClientModule } from '@angular/common/http';

describe('KontnaGrupaService', () => {
	let service: KontnaGrupaService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
		});
		service = TestBed.inject(KontnaGrupaService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

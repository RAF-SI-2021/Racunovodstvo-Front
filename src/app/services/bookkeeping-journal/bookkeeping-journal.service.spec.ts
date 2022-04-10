import { TestBed } from '@angular/core/testing';

import { BookkeepingJournalService } from './bookkeeping-journal.service';

describe('KnjizenjeService', () => {
	let service: BookkeepingJournalService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BookkeepingJournalService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

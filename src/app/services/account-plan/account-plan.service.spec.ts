import { TestBed } from '@angular/core/testing';
import { AccountPlanService } from './account-plan.service';
import { HttpClientModule } from '@angular/common/http';

describe('AccountPlanService', () => {
	let service: AccountPlanService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
		});
		service = TestBed.inject(AccountPlanService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});

import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { AccountPlanService } from '../../services/account-plan/account-plan.service';
import { readKontoResponse } from '../../shared/account-plan.model';
import { AccountPlanComponent } from './account-plan.component';

describe('AccountPlanComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				HttpClientModule,
			],
			declarations: [AccountPlanComponent],
		}).compileComponents();
	});

	it('should create the account plan component', () => {
		const fixture = TestBed.createComponent(AccountPlanComponent);
		const app = fixture.debugElement.componentInstance;
		const formBuilder = fixture.debugElement.injector.get(FormBuilder);
		expect(app).toBeTruthy();
	});

	it(`should have editing disabled`, () => {
		const fixture = TestBed.createComponent(AccountPlanComponent);
		const app = fixture.debugElement.componentInstance;
		const formBuilder = fixture.debugElement.injector.get(FormBuilder);
		expect(app.enableEditIndex).toEqual(-1);
	});

	it('should render column header broj konta', () => {
		const fixture = TestBed.createComponent(AccountPlanComponent);
		const app = fixture.debugElement.componentInstance;
		const formBuilder = fixture.debugElement.injector.get(FormBuilder);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('th')?.textContent).toContain(
			'Broj Konta'
		);
	});

	it('should fetch data successfully if called asynchronously', async(() => {
		const fixture = TestBed.createComponent(AccountPlanComponent);
		const app = fixture.debugElement.componentInstance;
		const dataService =
			fixture.debugElement.injector.get(AccountPlanService);
		spyOn(dataService, 'readAll').and.returnValue(
			new Observable<readKontoResponse>()
		);

		fixture.detectChanges();
		fixture.whenStable().then(() => {
			expect(app.kontos).not.toBe(null);
		});
	}));
});

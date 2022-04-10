import {TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { Authority } from './shared/enums/permissions';
=======
import {Authority} from "./enums/permissions";
>>>>>>> bruto-bilans

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AppComponent],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'racunovodstvo'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('racunovodstvo');
	});

	it('should have no admin permission', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		spyOn(app, 'isAdmin').and.returnValue(
			sessionStorage.getItem(Authority.ADMIN) != null
		);

		fixture.detectChanges();
		expect(app.isAdmin()).toBe(false);
	});
});

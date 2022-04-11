import { async, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
import { LoginResponse } from '../../shared/user.model';

describe('LoginComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				HttpClientModule,
			],
			declarations: [LoginComponent],
		}).compileComponents();
	});

	it('should create the login component', () => {
		const fixture = TestBed.createComponent(LoginComponent);
		const app = fixture.debugElement.componentInstance;
		const formBuilder = fixture.debugElement.injector.get(FormBuilder);
		expect(app).toBeTruthy();
	});

	it('should render login button', () => {
		const fixture = TestBed.createComponent(LoginComponent);
		const app = fixture.debugElement.componentInstance;
		const formBuilder = fixture.debugElement.injector.get(FormBuilder);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector('button')?.textContent).toContain(
			'Uloguj se'
		);
	});

	it('should set wrong username and password correctly', async(() => {
		const fixture = TestBed.createComponent(LoginComponent);
		const app = fixture.debugElement.componentInstance;
		const loginService = fixture.debugElement.injector.get(LoginService);
		spyOn(app, 'login').and.returnValue(new Observable<LoginResponse>());

		fixture.detectChanges();
		fixture.whenStable().then(() => {
			expect(app.wrongPasswordOrUsername).toBe(false);
		});
	}));
});

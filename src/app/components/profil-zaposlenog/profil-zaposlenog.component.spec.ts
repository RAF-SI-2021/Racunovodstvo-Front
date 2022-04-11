import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilZaposlenogComponent } from './profil-zaposlenog.component';
import { HttpClient } from '@angular/common/http';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

describe('ProfilZaposlenogComponent', () => {
	let component: ProfilZaposlenogComponent;
	let fixture: ComponentFixture<ProfilZaposlenogComponent>;
	let httpClient: HttpClient;
	let httpMock: HttpTestingController;
	let form: FormBuilder;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProfilZaposlenogComponent],
			imports: [
				HttpClientTestingModule,
				ReactiveFormsModule,
				RouterTestingModule,
				FormsModule,
			],
			providers: [DatePipe],
		}).compileComponents();
		httpClient = TestBed.inject(HttpClient);
		httpMock = TestBed.get(HttpTestingController);
		form = TestBed.inject(FormBuilder);
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfilZaposlenogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should od field be type of Date', () => {
		expect(component.plate instanceof Array).toBe(true);
	});
});

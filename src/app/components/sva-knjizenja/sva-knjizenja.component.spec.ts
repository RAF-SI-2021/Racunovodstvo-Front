import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvaKnjizenjaComponent } from './sva-knjizenja.component';
import { HttpClient } from '@angular/common/http';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';

describe('SvaKnjizenjaComponent', () => {
	let component: SvaKnjizenjaComponent;
	let fixture: ComponentFixture<SvaKnjizenjaComponent>;
	let httpMock: HttpTestingController;
	let httpClient: HttpClient;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SvaKnjizenjaComponent],
			imports: [HttpClientTestingModule],
		}).compileComponents();
		httpMock = TestBed.get(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SvaKnjizenjaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set UzetOd to be true', () => {
		component.odChanged();
		expect(component.uzetOd).toBe(true);
	});

	it('should od field be type of Date', () => {
		expect(component.od instanceof Date).toBe(true);
	});
});

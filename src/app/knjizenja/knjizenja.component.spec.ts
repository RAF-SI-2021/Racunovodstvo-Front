import {
	TestBed,
	async,
	fakeAsync,
	tick,
	ComponentFixture,
} from '@angular/core/testing';

import {
	HttpClient,
	HttpClientModule,
	HttpResponse,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { KnjizenjaComponent } from './knjizenja.component';
import { KnjizenjeService } from '../services/knjizenje/knjizenje.service';

import { DnevnikKnjizenja } from '../shared/dnevnik-knjizenja.model';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('Testing knjizenja component', () => {
	let component: KnjizenjaComponent;
	let fixture: ComponentFixture<KnjizenjaComponent>;
	let service: KnjizenjeService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientModule],
			declarations: [KnjizenjaComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(KnjizenjaComponent);
		component = fixture.componentInstance;
		service = fixture.debugElement.injector.get(KnjizenjeService);
		fixture.detectChanges();
	});

	it('should create Knjizenje', () => {
		let app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should set UzetOd to be true', () => {
		component.odChanged();
		expect(component.uzetOd).toBe(true);
	});

	it('should od field be type of Date', () => {
		expect(component.od instanceof Date).toBe(true);
	});

	it('should knjizenje entity be set on html', () => {
		let knjizenje = new DnevnikKnjizenja(
			1,
			'111',
			new Date(),
			15,
			15,
			1,
			0,
			'test'
		);
		component.knjizenja.push(knjizenje);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('#brojNaloga').textContent).toContain(
			knjizenje.brojNaloga
		);
	});
});

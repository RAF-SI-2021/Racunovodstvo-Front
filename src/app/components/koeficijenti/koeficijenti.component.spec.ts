import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoeficijentiComponent } from './koeficijenti.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('KoeficijentiComponent', () => {
	let component: KoeficijentiComponent;
	let fixture: ComponentFixture<KoeficijentiComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				HttpClientModule,
			],
			declarations: [KoeficijentiComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(KoeficijentiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should #naslov contain word Koeficijenti', function () {
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('#naslov').textContent).toContain(
			'Koeficijenti'
		);
	});

	it('should the number of objects in koeficijenti array be the same as in koefForms', function () {
		expect(component.koeficijenti.length).toEqual(
			component.koefForms.length
		);
	});
});

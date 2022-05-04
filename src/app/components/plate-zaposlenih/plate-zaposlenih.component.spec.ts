import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateZaposlenihComponent } from './plate-zaposlenih.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('PlateZaposlenihComponent', () => {
	let component: PlateZaposlenihComponent;
	let fixture: ComponentFixture<PlateZaposlenihComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				HttpClientModule,
			],
			declarations: [PlateZaposlenihComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PlateZaposlenihComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should createQuery fucntion return all', function () {
		expect(component.createQuery('', '', '', '', '', '', '', '', '')).toBe(
			'all'
		);
	});

	it('should createQuery fucntion return zaposleni_ime:test', function () {
		expect(
			component.createQuery('test', '', '', '', '', '', '', '', '')
		).toBe('zaposleni_ime:test');
	});

	it('should createQuery fucntion return zaposleni_ime:test,porez:7', function () {
		expect(
			component.createQuery('test', '', '', '7', '', '', '', '', '')
		).toBe('zaposleni_ime:test,porez:7');
	});
});

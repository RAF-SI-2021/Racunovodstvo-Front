import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniComponent } from './zaposleni.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('ZaposleniComponent', () => {
	let component: ZaposleniComponent;
	let fixture: ComponentFixture<ZaposleniComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				HttpClientModule,
			],
			declarations: [ZaposleniComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ZaposleniComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should createQuery fucntion return all', function () {
		expect(component.createQuery('', '', '', '')).toBe('all');
	});

	it('should createQuery fucntion return ime:test', function () {
		expect(component.createQuery('test', '', '', '')).toBe('ime:test');
	});

	it('should createQuery fucntion return ime:test,prezime:test', function () {
		expect(component.createQuery('test', 'test', '', '')).toBe(
			'ime:test,prezime:test'
		);
	});
});

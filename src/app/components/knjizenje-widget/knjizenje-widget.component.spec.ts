import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjizenjeWidgetComponent } from './knjizenje-widget.component';
import { KontnaGrupa, Konto } from 'src/app/shared/invoice.model';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocomplete } from '@angular/material/autocomplete';

describe('KnjizenjeWidgetComponent', () => {
	let component: KnjizenjeWidgetComponent;
	let fixture: ComponentFixture<KnjizenjeWidgetComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				HttpClientModule,
			],
			declarations: [KnjizenjeWidgetComponent, MatAutocomplete],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(KnjizenjeWidgetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should saldo be valid', () => {
		let duguje = component.dugujeUkupno();
		let potrazuje = component.potrazujeUkupno();
		expect(component.saldo()).toBe(duguje - potrazuje);
	});

	it('is sum of depth correctly binded with HTML', () => {
		let konto1 = new Konto(
			new KontnaGrupa('test', '00'),
			15,
			36,
			false,
			false,
			false,
			false
		);
		let konto2 = new Konto(
			new KontnaGrupa('test1', '010'),
			45,
			22,
			false,
			false,
			false,
			false
		);
		component.kontos.push(konto1, konto2);
		let kontoGroup1 = component.formBuilder.group({
			konto: [konto1.kontnaGrupa.brojKonta, [Validators.required]],
			duguje: [
				konto1.duguje,
				[Validators.required, Validators.pattern('^[0-9]*$')],
			],
			potrazuje: [
				konto1.potrazuje,
				[Validators.required, Validators.pattern('^[0-9]*$')],
			],
		});
		let kontoGroup2 = component.formBuilder.group({
			konto: [konto2.kontnaGrupa.brojKonta, [Validators.required]],
			duguje: [
				konto2.duguje,
				[Validators.required, Validators.pattern('^[0-9]*$')],
			],
			potrazuje: [
				konto2.potrazuje,
				[Validators.required, Validators.pattern('^[0-9]*$')],
			],
		});
		component.kontoGroups.push(kontoGroup1, kontoGroup2);
		let duguje = component.dugujeUkupno();
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('#dugujeUkupno').textContent).toContain(
			duguje
		);
	});
});

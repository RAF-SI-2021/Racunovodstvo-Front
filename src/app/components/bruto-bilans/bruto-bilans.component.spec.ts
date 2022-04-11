import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrutoBilansComponent } from './bruto-bilans.component';

describe('BrutoBilansComponent', () => {
	let component: BrutoBilansComponent;
	let fixture: ComponentFixture<BrutoBilansComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BrutoBilansComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BrutoBilansComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

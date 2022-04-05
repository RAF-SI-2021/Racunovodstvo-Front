import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KufComponent } from './kuf.component';

describe('KufComponent', () => {
	let component: KufComponent;
	let fixture: ComponentFixture<KufComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [KufComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(KufComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitniCentarComponent } from './profitni-centar.component';

describe('ProfitniCentarComponent', () => {
  let component: ProfitniCentarComponent;
  let fixture: ComponentFixture<ProfitniCentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitniCentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitniCentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

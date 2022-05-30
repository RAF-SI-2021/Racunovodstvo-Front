import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpFakturaComponent } from './mp-faktura.component';

describe('MpFakturaComponent', () => {
  let component: MpFakturaComponent;
  let fixture: ComponentFixture<MpFakturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpFakturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpFakturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajOTransakcijamaKomitentComponent } from './izvestaj-o-transakcijama-komitent.component';

describe('IzvestajOTransakcijamaKomitentComponent', () => {
  let component: IzvestajOTransakcijamaKomitentComponent;
  let fixture: ComponentFixture<IzvestajOTransakcijamaKomitentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzvestajOTransakcijamaKomitentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzvestajOTransakcijamaKomitentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajOTransakcijamaSifraComponent } from './izvestaj-o-transakcijama-sifra.component';

describe('IzvestajOTransakcijamaSifraComponent', () => {
  let component: IzvestajOTransakcijamaSifraComponent;
  let fixture: ComponentFixture<IzvestajOTransakcijamaSifraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzvestajOTransakcijamaSifraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzvestajOTransakcijamaSifraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

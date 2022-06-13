import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajOPromenamaNaKapitaluComponent } from './izvestaj-o-promenama-na-kapitalu.component';

describe('IzvestajOPromenamaNaKapitaluComponent', () => {
  let component: IzvestajOPromenamaNaKapitaluComponent;
  let fixture: ComponentFixture<IzvestajOPromenamaNaKapitaluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzvestajOPromenamaNaKapitaluComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzvestajOPromenamaNaKapitaluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

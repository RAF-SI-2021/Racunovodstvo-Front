import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KufComponent } from './kuf.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FakturaService} from "../faktura.service";
import {Faktura, Preduzece} from "../../model/model";

describe('KufComponent', () => {
  let component: KufComponent;
  let fixture: ComponentFixture<KufComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
      declarations: [ KufComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KufComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should set selectedFacture to double clicked one',()=>{
    expect(component.setEditable).toBeTruthy();
    let faktura = new Faktura(1,"3","22/03/2222", "20/03/2000", new Preduzece("NEBITNO"), "20/03/2000", 10000, 0,
      5, 500, 10500, 10500, "DIN", 1, 10500, "Komentar", "IZLAZNA_FAKTURA",2,"1111", "FAKTURA")
    component.setEditable(faktura);
    expect(component.selektovanaFaktura).toBe(faktura)
  });

  it('should set date input type if input is datum',()=>{
    expect(component.setInputAsDate).toBeTruthy();
    component.input = 'datum';
    component.setInputAsDate();
    expect(component.inputAsDate).toBe('date')
  });

  it('should set number input type if input is preduzece',()=>{
    expect(component.setInputAsDate).toBeTruthy();
    component.input = 'preduzece';
    component.setInputAsDate();
    expect(component.inputAsDate).toBe('number')
  });

  it('should set text input type if input is valuta',()=>{
    expect(component.setInputAsDate).toBeTruthy();
    component.input = 'valuta';
    component.setInputAsDate();
    expect(component.inputAsDate).toBe('text')
  });


});

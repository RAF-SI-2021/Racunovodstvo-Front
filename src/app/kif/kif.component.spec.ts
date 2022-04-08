import {TestBed, async, fakeAsync, tick, ComponentFixture} from '@angular/core/testing';

import { KifComponent } from './kif.component';
import {FakturaService} from "../faktura.service";
import {HttpClientModule, HttpResponse} from "@angular/common/http";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Faktura, Preduzece} from "../../model/model";
import {RouterTestingModule} from "@angular/router/testing";

describe('KifComponent', () => {
  let component: KifComponent;
  let fixture: ComponentFixture<KifComponent>;
  let service: FakturaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
      declarations: [ KifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KifComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(FakturaService);
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

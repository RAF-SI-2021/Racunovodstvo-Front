import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Konverzija2Component } from './konverzija2.component';

describe('Konverzija2Component', () => {
  let component: Konverzija2Component;
  let fixture: ComponentFixture<Konverzija2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Konverzija2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Konverzija2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});

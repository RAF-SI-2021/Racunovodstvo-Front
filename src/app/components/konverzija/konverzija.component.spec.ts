import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonverzijaComponent } from './konverzija.component';

describe('KonverzijaComponent', () => {
  let component: KonverzijaComponent;
  let fixture: ComponentFixture<KonverzijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonverzijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonverzijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoeficijentiComponent } from './koeficijenti.component';

describe('KoeficijentiComponent', () => {
  let component: KoeficijentiComponent;
  let fixture: ComponentFixture<KoeficijentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoeficijentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KoeficijentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalkulacijeComponent } from './kalkulacije.component';

describe('KalkulacijeComponent', () => {
  let component: KalkulacijeComponent;
  let fixture: ComponentFixture<KalkulacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KalkulacijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KalkulacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

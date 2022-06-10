import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroskovniCentarComponent } from './troskovni-centar.component';

describe('TroskovniCentarComponent', () => {
  let component: TroskovniCentarComponent;
  let fixture: ComponentFixture<TroskovniCentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TroskovniCentarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TroskovniCentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateZaposlenihComponent } from './plate-zaposlenih.component';

describe('PlateZaposlenihComponent', () => {
  let component: PlateZaposlenihComponent;
  let fixture: ComponentFixture<PlateZaposlenihComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlateZaposlenihComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateZaposlenihComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalitickeKarticeComponent } from './analiticke-kartice.component';

describe('AnalitickeKarticeComponent', () => {
  let component: AnalitickeKarticeComponent;
  let fixture: ComponentFixture<AnalitickeKarticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalitickeKarticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalitickeKarticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

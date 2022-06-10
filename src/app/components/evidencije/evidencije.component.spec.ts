import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencijeComponent } from './evidencije.component';

describe('EvidencijeComponent', () => {
  let component: EvidencijeComponent;
  let fixture: ComponentFixture<EvidencijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidencijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidencijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

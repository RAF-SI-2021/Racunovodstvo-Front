import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PovracajComponent } from './povracaj.component';

describe('PovracajComponent', () => {
  let component: PovracajComponent;
  let fixture: ComponentFixture<PovracajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PovracajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PovracajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

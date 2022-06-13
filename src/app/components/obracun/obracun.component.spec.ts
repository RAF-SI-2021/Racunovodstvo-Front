import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObracunComponent } from './obracun.component';

describe('ObracunComponent', () => {
  let component: ObracunComponent;
  let fixture: ComponentFixture<ObracunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObracunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObracunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

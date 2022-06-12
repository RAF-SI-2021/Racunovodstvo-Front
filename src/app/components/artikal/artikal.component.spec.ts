import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikalComponent } from './artikal.component';

describe('ArtikalComponent', () => {
  let component: ArtikalComponent;
  let fixture: ComponentFixture<ArtikalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtikalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtikalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

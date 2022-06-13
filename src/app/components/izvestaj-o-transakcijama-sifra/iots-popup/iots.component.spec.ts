import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotsComponent } from './iots.component';

describe('IotsComponent', () => {
  let component: IotsComponent;
  let fixture: ComponentFixture<IotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

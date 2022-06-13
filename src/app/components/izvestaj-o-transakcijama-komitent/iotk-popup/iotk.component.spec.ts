import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotkComponent } from './iotk.component';

describe('IotkComponent', () => {
  let component: IotkComponent;
  let fixture: ComponentFixture<IotkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

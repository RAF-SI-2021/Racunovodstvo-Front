import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsuPopupComponent } from './bsu-popup.component';

describe('BsuPopupComponent', () => {
  let component: BsuPopupComponent;
  let fixture: ComponentFixture<BsuPopupComponent>;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsuPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsuPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

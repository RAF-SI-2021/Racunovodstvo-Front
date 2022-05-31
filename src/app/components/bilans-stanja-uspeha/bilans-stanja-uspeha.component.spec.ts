import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilansStanjaUspehaComponent } from './bilans-stanja-uspeha.component';

describe('BilansStanjaUspehaComponent', () => {
  let component: BilansStanjaUspehaComponent;
  let fixture: ComponentFixture<BilansStanjaUspehaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilansStanjaUspehaComponent ]
    })
    .compileComponents();
  });



  beforeEach(() => {
    fixture = TestBed.createComponent(BilansStanjaUspehaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

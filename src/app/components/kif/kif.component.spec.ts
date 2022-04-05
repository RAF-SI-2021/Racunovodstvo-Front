import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KifComponent } from './kif.component';

describe('KifComponent', () => {
  let component: KifComponent;
  let fixture: ComponentFixture<KifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

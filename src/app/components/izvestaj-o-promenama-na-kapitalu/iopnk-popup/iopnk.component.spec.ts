import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IopnkComponent } from './iopnk.component';

describe('IopnkComponent', () => {
  let component: IopnkComponent;
  let fixture: ComponentFixture<IopnkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IopnkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IopnkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

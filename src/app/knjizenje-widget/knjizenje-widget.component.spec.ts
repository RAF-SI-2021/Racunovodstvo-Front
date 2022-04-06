import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjizenjeWidgetComponent } from './knjizenje-widget.component';

describe('KnjizenjeWidgetComponent', () => {
  let component: KnjizenjeWidgetComponent;
  let fixture: ComponentFixture<KnjizenjeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnjizenjeWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KnjizenjeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

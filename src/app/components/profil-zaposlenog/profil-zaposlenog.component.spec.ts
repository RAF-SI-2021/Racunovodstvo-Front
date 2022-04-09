import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilZaposlenogComponent } from './profil-zaposlenog.component';

describe('ProfilZaposlenogComponent', () => {
  let component: ProfilZaposlenogComponent;
  let fixture: ComponentFixture<ProfilZaposlenogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilZaposlenogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilZaposlenogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { BlagajnaComponent } from './blagajna.component';
import {TransakcijaService} from "../../services/transakcija/transakcija.service";
import {Observable} from "rxjs";
import {Transakcija} from "../../shared/transakcija.model";

describe('BlagajnaComponent', () => {
  let component: BlagajnaComponent;
  let fixture: ComponentFixture<BlagajnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlagajnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlagajnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have properties initiated', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.transakcije).toEqual([]);
    expect(app.input).toEqual('');
    expect(app.vrednost).toEqual('');
    expect(app.filterZaTip).toEqual(false);
  });

  it('filterZaTip should be changed on any filter to be false', () => {
    const app = fixture.debugElement.componentInstance;
    app.filter('brojTransakcije', 1111);
    expect(app.filterZaTip).toEqual(false);
  });

  it('filterZaTip should be changed on tip filter to be true', () => {
    const app = fixture.debugElement.componentInstance;
    app.filter('tipTransakcije', 'UPLATA');
    expect(app.filterZaTip).toEqual(true);
  });

  it('should fetch data successfully if called asynchronously', fakeAsync(() => {
    const app = fixture.debugElement.componentInstance;
    const transakcijaService = fixture.debugElement.injector.get(TransakcijaService);
    spyOn(transakcijaService, 'getAllTransactions')
      .and
      .returnValue(new Observable<Transakcija[]>(observer => {
        observer.next([{
          transakcijaId: 1,
          brojTransakcije: 1,
          komitentTransakcije: '',
          datumTransakcije: '',
          tipTransakcije: '',
          iznosTransakcije: 1,
          sadrzajTransakcije: '',
          sifraTransakcije: '',
          komentarTransakcije: ''
        }])
        observer.complete();
      }));

    fixture.detectChanges();
    tick();
    expect(app.transakcije).toBe([{
      transakcijaId: 1,
      brojTransakcije: 1,
      komitentTransakcije: '',
      datumTransakcije: '',
      tipTransakcije: '',
      iznosTransakcije: 1,
      sadrzajTransakcije: '',
      sifraTransakcije: '',
      komentarTransakcije: ''
    }]);
  }));

  it('getAllIznosiZaTip to return good string', () => {
    const app = fixture.debugElement.componentInstance;
    const transakcijaService = fixture.debugElement.injector.get(TransakcijaService);
    spyOn(transakcijaService, 'getAllTransactions')
      .and
      .returnValue(new Observable<Transakcija[]>(observer => {
        observer.next([{
          transakcijaId: 1,
          brojTransakcije: 1,
          komitentTransakcije: '',
          datumTransakcije: '',
          tipTransakcije: 'UPLATA',
          iznosTransakcije: 99,
          sadrzajTransakcije: '',
          sifraTransakcije: '',
          komentarTransakcije: ''
        }])
        observer.complete();
      }));

    fixture.detectChanges();
    tick();
    const result = app.getAllIznosiZaTip();
    expect(result).toBe('Suma svih iznosa za tip UPLATA: 99')
  });

});

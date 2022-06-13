import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Izvestaji} from "../../shared/enums/izvestaji";
import {BilansStanjaUspehaComponent} from "../bilans-stanja-uspeha/bilans-stanja-uspeha.component";
import {IzvestajiService} from "../../services/izvestaji.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IzvestajOPromenamaNaKapitaluComponent} from "../izvestaj-o-promenama-na-kapitalu/izvestaj-o-promenama-na-kapitalu.component";
import {IzvestajOTransakcijamaKomitentComponent} from "../izvestaj-o-transakcijama-komitent/izvestaj-o-transakcijama-komitent.component";
import {IzvestajOTransakcijamaSifraComponent} from "../izvestaj-o-transakcijama-sifra/izvestaj-o-transakcijama-sifra.component";

@Component({
  selector: 'app-izvestaji',
  templateUrl: './izvestaji.component.html',
  styleUrls: ['./izvestaji.component.css']
})
export class IzvestajiComponent implements OnInit, AfterViewInit {

  @ViewChild(BilansStanjaUspehaComponent) child;

  @ViewChild(IzvestajOPromenamaNaKapitaluComponent)
  iopnk;

  @ViewChild(IzvestajOTransakcijamaKomitentComponent)
  iotk;

  @ViewChild(IzvestajOTransakcijamaSifraComponent)
  iots;

  tipoviIzvestaja: string[];
  flag: string;

  //Promena kapitala
  godina1: number;
  godina2: number;
  opis: string;
  ucesce: number;
  current_type: string;

  //Izveštaj o transakcijama vezanim za komitenta
  komitent: string;
  naslovKomitet: string;
  date1: string;
  date2: string;
  radioBtn: number = 1;

  //Statistički izveštaj o transakcijama po šifri transakcije
  /* Korisnik bira naslov izveštaja, kao i tip sortiranja iz drop down-a: uplata rastuće,
  uplata opadajuće, saldo rastuće i saldo opadajuće. */

  naslovSifra: string;
  tipSortiranja: string[] = ['uplata rastuće', 'uplata opadajuće', 'saldo rastuće', 'saldo opadajuće'];

  constructor(private izvestajService: IzvestajiService, private modalService: NgbModal) {
  }

  ngAfterViewInit() {
    if (this.flag === Izvestaji.BILANS_STANJA) {
      this.child.bilansStanja();
    } else if (this.flag === Izvestaji.BILANS_USPEHA) {
      this.child.bilansUspeha();
    } else if (this.flag === Izvestaji.PROMENE_KAPITALA) {
      this.iopnk.openDialog();
    } else if (this.flag === Izvestaji.STATICKI_IZVESTAJ_KOMITET) {
      this.iotk.openDialog();
    } else if (this.flag === Izvestaji.STATICKI_IZVESTAJ_PO_SIFRI) {
      this.iots.openDialog();
    }
  }

  ngOnInit(): void {
    this.loadTipovi();
  }

  loadTipovi() {
    this.tipoviIzvestaja = [Izvestaji.BILANS_STANJA, Izvestaji.BILANS_USPEHA, Izvestaji.PROMENE_KAPITALA,
      Izvestaji.STATICKI_IZVESTAJ_KOMITET, Izvestaji.STATICKI_IZVESTAJ_PO_SIFRI];
  }

  tipSelection(tip: string) {
    this.current_type = tip;
    console.log(this.current_type);
    switch (tip) {
      case Izvestaji.BILANS_STANJA:
        if (this.isPermitedForBilans()) {
          this.flag = Izvestaji.BILANS_STANJA;
          this.ngAfterViewInit();
        } else {
          alert('Nemate dozvolu za pristup.')
        }
        break;
      case Izvestaji.BILANS_USPEHA:
        if (this.isPermitedForBilans()) {
          this.flag = Izvestaji.BILANS_USPEHA;
          this.ngAfterViewInit();
        } else {
          alert('Nemate dozvolu za pristup.')
        }
        break;
      case Izvestaji.PROMENE_KAPITALA:
        this.flag = Izvestaji.PROMENE_KAPITALA;
        this.ngAfterViewInit();
        break;
      case Izvestaji.STATICKI_IZVESTAJ_KOMITET:
        this.flag = Izvestaji.STATICKI_IZVESTAJ_KOMITET;
        this.ngAfterViewInit();
        break;
      case Izvestaji.STATICKI_IZVESTAJ_PO_SIFRI:
        this.flag = Izvestaji.STATICKI_IZVESTAJ_PO_SIFRI;
        this.ngAfterViewInit();
        break;
      default:
        alert('Doslo je do greske.')
        break;
    }
  }

  private isPermitedForBilans() {
    return sessionStorage.getItem('finknj');
  }

}

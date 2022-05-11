import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnalitickeKarticeResponse} from "../../shared/analiticke-kartice.model";
import {map, Observable} from "rxjs";
import {KontnaGrupa} from "../../shared/kontna-grupa.model";
import {KontnaGrupaService} from "../../services/kontna-grupa/kontna-grupa.service";
import {AnalitickeKarticeService} from "../../services/analiticke-kartice/analiticke-kartice.service";
import {Company} from "../../shared/invoice.model";
import {InvoiceService} from "../../services/invoice/invoice.service";


@Component({
  selector: 'app-analiticke-kartice',
  templateUrl: './analiticke-kartice.component.html',
  styleUrls: ['./analiticke-kartice.component.css']
})
export class AnalitickeKarticeComponent implements OnInit {

  analitickaKarticaForm: FormGroup;
  kontneGrupeOption?: Observable<KontnaGrupa[]>;
  preduzecaGrupeOption?: Observable<Company[]>;
  preduzeca: Company[] = [];
  kontneGrupe: KontnaGrupa[] = [];
  rows: AnalitickeKarticeResponse[] = [];
  suma: AnalitickeKarticeResponse;



  constructor(
    private formBuilder: FormBuilder,
    private kontnaGrupaService: KontnaGrupaService,
    private analitickaKarticaService: AnalitickeKarticeService,
    private preduzeceService: InvoiceService,
  ) {
    this.analitickaKarticaForm = this.formBuilder.group({
      konto: ['', [Validators.required]],
      datumOd: [''],
      datumDo: [''],
      komitent: [''],
    });
    this.suma = new AnalitickeKarticeResponse('', '', '', 0, 0, 0);

  }



  ngOnInit(): void {
    this.readKontos();
    this.readCompanies();
    this.rows = [];

  }

  readAnalitickeKartice() {

    let konto = new KontnaGrupa(-1, '', '');

    for (let i = 0; i < this.kontneGrupe.length; i++) {
      if (
        this.kontneGrupe[i].brojKonta ===
        this.analitickaKarticaForm.get('konto')?.value.split(' ', 1)[0]
      ) {
        konto = this.kontneGrupe[i];
      }
    }

    if (konto.kontnaGrupaId == -1) {
      alert("Ne postoji kontna grupa")
      return
    }

    this.analitickaKarticaService
      .readKartice(
        konto,
        this.analitickaKarticaForm.get('datumOd')?.value,
        this.analitickaKarticaForm.get('datumDo')?.value,
        this.analitickaKarticaForm.get('komitent')?.value,
      )
      .subscribe({
        next: (analitickaKarticaResponseList) => {
          // console.log(analitickaKarticaResponseList);
          this.rows = analitickaKarticaResponseList;
          for (let i = 0; i < this.rows.length; i++) {
            this.suma.duguje += this.rows[i].duguje;
            this.suma.potrazuje += this.rows[i].potrazuje;
            this.suma.saldo += this.rows[i].saldo;
          }
        },
        error: () => {
          alert("Greska pri ucitavanju analitickih kartica, pokusajte ponovo.")
        }
      });



  }

  readCompanies() {
    this.preduzeceService.svaPreduzeca().subscribe((preduzeca) => {
      this.preduzeca = preduzeca;
      this.preduzecaGrupeOption = this.analitickaKarticaForm
        .get('komitent')
        ?.valueChanges.pipe(map((value) => this._filterCompany(value)));
    });
  }

  readKontos() {
    this.kontnaGrupaService.readAll().subscribe((readKontoResp) => {
      this.kontneGrupe = readKontoResp.content;
      this.sortKontos();
      this.kontneGrupeOption = this.analitickaKarticaForm
        .get('konto')
        ?.valueChanges.pipe(map((value) => this._filterKonto(value)));
    });
  }

  private _filterKonto(value: any): KontnaGrupa[] {
    console.log(value);
    const filterValue = ('' + value.konto).toLowerCase();

    console.log(filterValue);

    return this.kontneGrupe.filter(
      (option) =>
        option.nazivKonta.toLowerCase().includes(filterValue) ||
        option.brojKonta.toLowerCase().includes(filterValue)
    );
  }

  private _filterCompany(value: any): Company[] {
    const filterValue = ('' + value.konto).toLowerCase();
    return this.preduzeca.filter(
      (option) =>
        option.naziv.toLowerCase().includes(filterValue)
    );
  }

  sortKontos() {
    let knts = this.kontneGrupe;
    knts.sort((a, b) => {
      let kontoNum1 = Number.parseFloat('0.'.concat(a.brojKonta));
      let kontoNum2 = Number.parseFloat('0.'.concat(b.brojKonta));
      if (kontoNum1 > kontoNum2) return 1;
      if (kontoNum1 < kontoNum2) return -1;

      return 0;
    });

    this.kontneGrupe = knts;
  }
}

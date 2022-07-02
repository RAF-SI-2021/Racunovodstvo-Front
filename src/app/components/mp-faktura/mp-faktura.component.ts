import {Component, OnInit} from '@angular/core';
import {Company, Invoice} from "../../shared/invoice.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InvoiceService} from "../../services/invoice/invoice.service";
import {IClient} from "../../shared/client.model";
import {CurrencyService} from "../../services/currency/currency.service";
import {CurrencyResponse, CurrencyResult} from "../../shared/currency.model";

@Component({
  selector: 'app-mp-faktura',
  templateUrl: './mp-faktura.component.html',
  styleUrls: ['./mp-faktura.component.css']
})
export class MpFakturaComponent implements OnInit {

  fakture: Invoice[] = [];
  preduzeca: IClient[] = [];

  currencies: string[];
  currencyResponse: CurrencyResponse;


  fakturaForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: InvoiceService, private currency: CurrencyService) {
    this.fakturaForm = formBuilder.group({
      brojFakture: ['', Validators.required],
      datumIzdavanja: ['', Validators.required],
      komitent: ['', Validators.required],
      datumPlacanja: [''],
      prodajnaVrednost: [0, Validators.required],
      rabatProcenat: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      porezProcenat: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      valuta: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
          Validators.pattern('^[A-Z]+$')
        ],
      ],
      kurs: [0, Validators.required],
      naplata: [0, [Validators.required]],
      komentar: [''],

    })

    this.currencies = ["RSD", "EUR", "USD", "CHF", "GBP", "AUD", "CAD", "SEK", "DKK", "NOK",
              "JPY", "RUB", "CNY", "HRK", "KWD", "PLN", "CZK", "HUF", "BAM"];

    let faktura1: Invoice = new Invoice(
      1,
      '3',
      '03-20-2022',
      '03-20-2022',
      new Company('NEBITNO',0),
      '03-20-2022',
      10000,
      0,
      5,
      500,
      10500,
      10500,
      'DIN',
      1,
      10500,
      'Komentar',
      'IZLAZNA_FAKTURA',
      2,
      '1111',
      'FAKTURA'
    );

    let faktura2: Invoice = new Invoice(
      2,
      '4',
      '03-20-2022',
      '03-20-2000',
      new Company('NEBITNO', 1),
      '03-20-2022',
      10000,
      0,
      5,
      500,
      10500,
      10500,
      'DIN',
      1,
      10500,
      'Komentar',
      'IZLAZNA_FAKTURA',
      2,
      '1111',
      'FAKTURA'
    );

    this.fakture.push(faktura1, faktura2);
  }

  ngOnInit(): void {
    this.service.sveMpFakture().subscribe(fakture => {
      this.fakture = fakture;
    })
    this.service.svaPreduzecaIClient().subscribe((preduzeca) => {
      this.preduzeca = preduzeca;
    });
    this.currency.getCurencies().subscribe((response) => {
              this.currencyResponse = response;
        });
  }

  ukupnaProdajnaVrednost() {
    let totalSum = 0;
    this.fakture.forEach(function (value) {
      totalSum += value.prodajnaVrednost;
    });
    return Math.round(totalSum * 100) / 100
  }

  ukupanRabat() {
    let totalSum = 0;
    this.fakture.forEach(function (value) {
      let rabatAct = value.rabat * value.kurs;
      totalSum += rabatAct;
    });
    return Math.round(totalSum * 100) / 100
  }

  ukupanPorez() {
    let totalSum = 0;
    this.fakture.forEach(function (value) {
      totalSum += value.porez;
    });
    return Math.round(totalSum * 100) / 100
  }

  ukupnoNaplata() {
    let totalSum = 0;
    this.fakture.forEach(function (value) {
      totalSum += value.naplata;
    });
    return Math.round(totalSum * 100) / 100
  }

  getAsDate(date: string) {
    let newDate = new Date(date);
    return (
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  }

  filterOfNull(procenat: number) {
    if (procenat === null) {
      return 0;
    }
    return Math.round(procenat * 100) / 100
  }

  sacuvaj() {
    let brojFakture = this.fakturaForm.get('brojFakture')?.value;
    let datumIzdavanja = this.fakturaForm.get('datumIzdavanja')?.value;
    let komitent = this.fakturaForm.get('komitent')?.value;
    let datumPlacanja = this.fakturaForm.get('datumPlacanja')?.value;
    let prodajnaVrednost = this.fakturaForm.get('prodajnaVrednost')?.value;
    let rabatProcenat = this.fakturaForm.get('rabatProcenat')?.value;
    let porezProcenat = this.fakturaForm.get('porezProcenat')?.value;
    let valuta = this.fakturaForm.get('valuta')?.value;
    let kurs = this.fakturaForm.get('kurs')?.value;
    let naplata = this.fakturaForm.get('naplata')?.value;
    let komentar = this.fakturaForm.get('komentar')?.value;
    this.service.novaFaktura(brojFakture, datumIzdavanja, komitent, datumPlacanja, prodajnaVrednost, rabatProcenat, porezProcenat, valuta,
      kurs, naplata, komentar, "MALOPRODAJNA_FAKTURA").subscribe(response => {
      this.ngOnInit();
    })
  }


  delete(dokumentId: number) {
    this.service.obrisiFakturu(dokumentId).subscribe(() => {
      this.ngOnInit();
    })
  }

  promeniKurs() {
        let curr = this.fakturaForm.get('valuta')?.value.toLowerCase()
        if(curr == 'rsd') {
          this.fakturaForm.patchValue({
            kurs: 1.00
          })
        } else {
          this.fakturaForm.patchValue({
            kurs: this.currencyResponse.result[curr].sre
          })
        }
      }
}

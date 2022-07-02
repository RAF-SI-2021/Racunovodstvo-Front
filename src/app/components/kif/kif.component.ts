import { Component, OnInit } from '@angular/core';
import { Invoice, Company } from 'src/app/shared/invoice.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import {CurrencyService} from "../../services/currency/currency.service";
import {CurrencyResponse, CurrencyResult} from "../../shared/currency.model";

@Component({
	selector: 'app-kif',
	templateUrl: './kif.component.html',
	styleUrls: ['./kif.component.css'],
})
export class KifComponent implements OnInit {
	filterGroup: FormGroup;
	updateGroup: FormGroup;
	vrednost: string = '';
  currencies: string[];
  currencyResponse: CurrencyResponse;

	constructor(
		private formBuilder: FormBuilder,
		private service: InvoiceService,
    private currency: CurrencyService
	) {
		this.filterGroup = this.formBuilder.group({
			pretraga: ['', [Validators.required]],
			vrednost: ['', [Validators.required]],
		});

		this.updateGroup = this.formBuilder.group({
			brojFakture: [this.selektovanaFaktura.brojFakture],
			datumIzdavanja: [this.selektovanaFaktura.datumIzdavanja.split('T')[0]],
			komitent: [
				this.selektovanaFaktura.preduzece.naziv,
				[Validators.required],
			],
			datumPlacanja: [this.selektovanaFaktura.datumPlacanja.split('T')[0]],
			rokZaPlacanje: [this.selektovanaFaktura.rokZaPlacanje.split('T')[0]],
			prodajnaVrednost: [this.selektovanaFaktura.prodajnaVrednost],
			rabatProcenat: [this.selektovanaFaktura.rabatProcenat],
			porezProcenat: [this.selektovanaFaktura.porezProcenat],
			valuta: [
				this.selektovanaFaktura.valuta,
				[
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(3),
          Validators.pattern('^[A-Z]+$')
				],
			],
			kurs: [this.selektovanaFaktura.kurs],
			naplata: [this.selektovanaFaktura.naplata, [Validators.required]],
			komentar: [this.selektovanaFaktura.komentar],
		});

    this.currencies = ["RSD", "EUR", "USD", "CHF", "GBP", "AUD", "CAD", "SEK", "DKK", "NOK",
      "JPY", "RUB", "CNY", "HRK", "KWD", "PLN", "CZK", "HUF", "BAM"];


	}

	inputAsDate: string = 'text';
	input: string = '';

	preduzece1: Company = new Company('test1', 1);
	preduzece2: Company = new Company('test2', 2);

	preduzeca: Company[] = [];

	faktura1: Invoice = new Invoice(
		1,
		'3',
		'22-03-2222',
		'20-03-2000',
		new Company('NEBITNO', 1),
		'20/03/2000',
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

	faktura2: Invoice = new Invoice(
		2,
		'4',
		'2000-03-02',
		'2000-03-02',
		new Company('NEBITNO',1),
		'2000-03-02',
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

	kif: Invoice[] = [];

	selektovanaFaktura: Invoice = this.faktura2;

	edit: boolean = false;

	ngOnInit(): void {
		this.service.svaPreduzeca().subscribe((preduzeca) => {
			this.preduzeca = preduzeca;
		});
		this.edit = false;
		this.service.sveKifFakture().subscribe((response) => {
			this.kif = response
		});
    this.currency.getCurencies().subscribe((response) => {
      this.currencyResponse = response;
    });
	}

	setInputAsDate() {
		if (this.input.startsWith('datum') || this.input.startsWith('rok')) {
			this.inputAsDate = 'date';
		} else if (this.input.startsWith('preduzece')) {
			this.inputAsDate = 'number';
		} else {
			this.inputAsDate = 'text';
			this.vrednost = '';
		}
	}

	ukupnaProdajnaVrednost() {
		let totalSum = 0;
		this.kif.forEach(function (value) {
			totalSum += value.prodajnaVrednost;
		});
		return totalSum;
	}

	getCompanyName(faktura: Invoice) {
	  if(faktura.preduzece) {
	    return faktura.preduzece
	  }
	  return null
	}

	ukupanRabat() {
		let totalSum = 0;
		this.kif.forEach(function (value) {
			let rabatAct = value.rabat * value.kurs;
			totalSum += rabatAct;
		});
		return totalSum;
	}

	ukupanPorez() {
		let totalSum = 0;
		this.kif.forEach(function (value) {
			totalSum += value.porez;
		});
		return totalSum;
	}

	ukupnoNaplata() {
		let totalSum = 0;
		this.kif.forEach(function (value) {
			totalSum += value.naplata;
		});
		return totalSum;
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
		return procenat;
	}

	setEditable(faktura: Invoice) {
		this.selektovanaFaktura = faktura;
		console.log(faktura.datumIzdavanja.substring(0,10).trim());
		console.log(faktura.rokZaPlacanje.substring(0,10).trim());
		console.log(faktura.datumPlacanja.substring(0,10).trim());

		if (faktura.editable) {
			faktura.editable = false;
			this.edit = false;
		} else {
			faktura.editable = true;
			this.edit = true;
			this.kif.forEach(function (value) {
				if (value !== faktura) value.editable = false;
			});
		}

		this.updateGroup = this.formBuilder.group({
    			brojFakture: [this.selektovanaFaktura.brojFakture],
    			datumIzdavanja: [this.selektovanaFaktura.datumIzdavanja.split('T')[0]],
    			rokZaPlacanje: [this.selektovanaFaktura.rokZaPlacanje.split('T')[0]],
    			komitent: [
    				this.selektovanaFaktura.preduzece ? this.selektovanaFaktura.preduzece : '-',
    				[Validators.required],
    			],
    			datumPlacanja: [this.selektovanaFaktura.datumPlacanja.split('T')[0]],
    			prodajnaVrednost: [
    				this.selektovanaFaktura.prodajnaVrednost,
    				[Validators.required],
    			],
    			rabatProcenat: [this.selektovanaFaktura.rabatProcenat],
    			porezProcenat: [this.selektovanaFaktura.porezProcenat],
    			valuta: [
    				this.selektovanaFaktura.valuta,
    				[
    					Validators.required,
    					Validators.minLength(3),
    					Validators.maxLength(3),
    				],
    			],
    			kurs: [this.selektovanaFaktura.kurs, [Validators.required]],
    			naplata: [this.selektovanaFaktura.naplata, [Validators.required]],
    			komentar: [this.selektovanaFaktura.komentar],
    		});
	}

	filterKIF() {
		let filter = this.filterGroup.get('pretraga')?.value;
		let vrednost = this.filterGroup.get('vrednost')?.value;
		console.log(filter);
		console.log(vrednost);
		//provera unosa
		if (filter === 'preduzece') {
			let proveraVrednosti = parseInt(vrednost);
			if (isNaN(proveraVrednosti)) {
				alert('Morate uneti broj kako bi pretrazili po komitentu');
				return;
			}
		} else if (filter.startsWith('datum')) {
			let proveraVrednosti = new Date(vrednost);
			vrednost = proveraVrednosti.getTime();
			if (isNaN(proveraVrednosti.getDate())) {
				alert('Morate uneti pravilan datum');
				return;
			}
		} else if (filter === 'valuta') {
			if (vrednost.length != 3) {
				alert('Valuta mora sadrzati tacno 3 karaktera');
				return;
			}
			if (!this.alphaOnly(vrednost)) {
				alert('Valuta se moze sastojati samo od karaktera');
				return;
			}
		}
		this.service.filterKIF(filter, vrednost).subscribe(
			(response) => {
				if (response.ok) {
					this.kif = response.body || [];
				}
			},
			(error) => {
				alert('Ne postoji nijedan rezultat za trazenu pretragu!');
			}
		);
	}

	alphaOnly(valuta: string) {
		var regex = new RegExp('^[A-Z]+$');
		if (regex.test(valuta.charAt(0))) {
			return true;
		}
		if (regex.test(valuta.charAt(1))) {
			return true;
		}
		if (regex.test(valuta.charAt(2))) {
			return true;
		}
		return false;
	}

	sacuvaj() {
		let brojFakture = this.updateGroup.get('brojFakture')?.value;
		let datumIzdavanja = this.updateGroup.get('datumIzdavanja')?.value;
		let rokZaPlacanje = this.updateGroup.get('rokZaPlacanje')?.value;
		let komitent = this.updateGroup.get('komitent')?.value;
		let datumPlacanja = this.updateGroup.get('datumPlacanja')?.value;
		let prodajnaVrednost = this.updateGroup.get('prodajnaVrednost')?.value;
		let rabatProcenat = this.updateGroup.get('rabatProcenat')?.value;
		let porezProcenat = this.updateGroup.get('porezProcenat')?.value;
		let valuta = this.updateGroup.get('valuta')?.value;
		let kurs = this.updateGroup.get('kurs')?.value;
		let naplata = this.updateGroup.get('naplata')?.value;
		let komentar = this.updateGroup.get('komentar')?.value;
		//provera
		if (brojFakture.length != 0) {
			this.selektovanaFaktura.brojFakture = brojFakture;
		}
		this.selektovanaFaktura.datumIzdavanja = datumIzdavanja;
		this.selektovanaFaktura.rokZaPlacanje = rokZaPlacanje;

		console.log(komitent);
		this.selektovanaFaktura.preduzece = komitent;
// 		if (komitent !== '-' && komitent.naziv !== this.selektovanaFaktura.preduzece.naziv) {
// 			this.preduzeca.forEach((value) => {
// 				if (komitent === value.naziv) {
// 					this.selektovanaFaktura.preduzece = value;
// 				}
// 			});
// 		}
		this.selektovanaFaktura.datumPlacanja = datumPlacanja;
		this.selektovanaFaktura.prodajnaVrednost = prodajnaVrednost;

		if (rabatProcenat !== undefined && rabatProcenat !== 0) {
			this.selektovanaFaktura.rabatProcenat = rabatProcenat;
		} else {
			this.selektovanaFaktura.rabatProcenat = 0;
		}

		if (porezProcenat != 0) {
			this.selektovanaFaktura.porezProcenat = porezProcenat;
		} else {
			this.selektovanaFaktura.porezProcenat = 0;
		}

		if (!this.alphaOnly(valuta)) {
			alert('Valuta ne moze sadrzti brojeve!');
			return;
		}
		this.selektovanaFaktura.valuta = valuta;
		this.selektovanaFaktura.kurs = kurs;
		this.selektovanaFaktura.naplata = naplata;
		this.selektovanaFaktura.komentar = komentar;

		this.service.izmeniFakturu(this.selektovanaFaktura).subscribe(
			(response) => {
				if (response.ok) {
					alert('Uspesno ste izmenili fakturu');
					this.ngOnInit();
				}
			},
			(error) => {
				alert('Nemate potrebnu autorizaciju');
			}
		);
	}

	delete(faktura: Invoice) {
		this.service.obrisiFakturu(faktura.dokumentId).subscribe((response) => {
			if (response.ok) {
				alert('Uspesno ste obrisali fakturu');
				this.ngOnInit();
			} else {
				alert('Nemate potrebnu autorizaciju');
			}
		});
	}


  promeniKurs() {
    let curr = this.updateGroup.get('valuta')?.value.toLowerCase()
    if(curr == 'rsd') {
      this.updateGroup.patchValue({
        kurs: 1.00
      })
    } else {
      this.updateGroup.patchValue({
        kurs: this.currencyResponse.result[curr].sre
      })
    }
  }

}

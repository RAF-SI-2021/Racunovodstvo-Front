import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrutoBilansService } from '../../services/bruto-bilans/bruto-bilans.service';
import { KontnaGrupaService } from '../../services/kontna-grupa/kontna-grupa.service';
import { KontnaGrupa } from '../../shared/kontna-grupa.model';
import { map, Observable } from 'rxjs';
import { BilansResponse } from '../../shared/bruto-bilans.model';

@Component({
	selector: 'app-bruto-bilans',
	templateUrl: './bruto-bilans.component.html',
	styleUrls: ['./bruto-bilans.component.css'],
})
export class BrutoBilansComponent implements OnInit {
	brutoBilansForm: FormGroup;
	kontneGrupe: KontnaGrupa[] = [];
	kontoGroupOd: FormGroup;
	kontoGroupDo: FormGroup;
	kontneGrupeOptionOd?: Observable<KontnaGrupa[]>;
	kontneGrupeOptionDo?: Observable<KontnaGrupa[]>;
	rows: BilansResponse[] = [];
	suma: BilansResponse;

	constructor(
		private formBuilder: FormBuilder,
		private brutoBilansService: BrutoBilansService,
		private kontnaGrupaService: KontnaGrupaService
	) {
		this.brutoBilansForm = this.formBuilder.group({
			kontoOd: ['', [Validators.required]],
			kontoDo: ['', [Validators.required]],
			datumOd: ['', Validators.required],
			datumDo: ['', Validators.required],
		});
		this.kontoGroupOd = this.formBuilder.group({
			konto: ['', [Validators.required]],
			duguje: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
			potrazuje: [
				'',
				[Validators.required, Validators.pattern('^[0-9]*$')],
			],
		});
		this.kontoGroupDo = this.formBuilder.group({
			konto: ['', [Validators.required]],
			duguje: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
			potrazuje: [
				'',
				[Validators.required, Validators.pattern('^[0-9]*$')],
			],
		});
		this.suma = new BilansResponse(0, 0, '', 'Zbir:', 0, 0);
	}

	ngOnInit(): void {
		this.readKontos();
		this.rows = [];
	}

	readBrutoBilans() {
		console.log(this.brutoBilansForm.get('datumOd')?.value);
		console.log(this.brutoBilansForm.get('datumDo')?.value);

		let kontoOd = new KontnaGrupa(-1, '', '');
		let kontoDo = new KontnaGrupa(-1, '', '');

		for (let i = 0; i < this.kontneGrupe.length; i++) {
			if (
				this.kontneGrupe[i].brojKonta ===
				this.brutoBilansForm.get('kontoOd')?.value.split(' ', 1)[0]
			) {
				kontoOd = this.kontneGrupe[i];
			}
			if (
				this.kontneGrupe[i].brojKonta ===
				this.brutoBilansForm.get('kontoDo')?.value.split(' ', 1)[0]
			) {
				kontoDo = this.kontneGrupe[i];
			}
		}

    if (kontoOd.kontnaGrupaId == -1 || kontoDo.kontnaGrupaId == -1) {
      alert("Ne postoji kontna grupa")
      return
    }

		this.brutoBilansService
			.readAll(
				kontoOd,
				kontoDo,
				this.brutoBilansForm.get('datumOd')?.value,
				this.brutoBilansForm.get('datumDo')?.value
			)
			.subscribe((bilansResponseList) => {
				console.log(bilansResponseList);
				this.rows = bilansResponseList;
				for (let i = 0; i < this.rows.length; i++) {
					this.suma.brojStavki += this.rows[i].brojStavki;
					this.suma.duguje += this.rows[i].duguje;
					this.suma.potrazuje += this.rows[i].potrazuje;
					this.suma.saldo += this.rows[i].saldo;
				}
				this.brutoBilansForm.reset();
			});
	}

	readKontos() {
		this.kontnaGrupaService.readAll().subscribe((readKontoResp) => {
			this.kontneGrupe = readKontoResp.content;
			this.sortKontos();
			this.kontneGrupeOptionDo = this.brutoBilansForm
				.get('kontoDo')
				?.valueChanges.pipe(map((value) => this._filterDo(value)));
			this.kontneGrupeOptionOd = this.brutoBilansForm
				.get('kontoOd')
				?.valueChanges.pipe(map((value) => this._filterOd(value)));
		});
	}

	private _filterDo(value: any): KontnaGrupa[] {
		const filterValue = ('' + value).toLowerCase();

		return this.kontneGrupe.filter(
			(option) =>
				(option.nazivKonta.toLowerCase().includes(filterValue) ||
					option.brojKonta.toLowerCase().includes(filterValue)) &&
				this.moreThanOd(option.brojKonta)
		);
	}

	private _filterOd(value: any): KontnaGrupa[] {
		const filterValue = ('' + value).toLowerCase();

		return this.kontneGrupe.filter(
			(option) =>
				(option.nazivKonta.toLowerCase().includes(filterValue) ||
					option.brojKonta.toLowerCase().includes(filterValue)) &&
				this.lessThanDo(option.brojKonta)
		);
	}

	lessThanDo(brojOd: string) {
		let brojDo = this.brutoBilansForm.get('kontoDo')?.value;
		if (brojDo == '' || brojOd == '') return true;

		let kontoOd = Number.parseFloat('0.'.concat(brojOd));
		let kontoDo = Number.parseFloat('0.'.concat(brojDo));

		console.log(kontoOd + ' SMALLER THAN ' + kontoDo);

		return kontoOd <= kontoDo;
	}

	moreThanOd(brojDo: string) {
		let brojOd = this.brutoBilansForm.get('kontoOd')?.value;
		let kontoOd = Number.parseFloat('0.'.concat(brojOd));
		let kontoDo = Number.parseFloat('0.'.concat(brojDo));
		console.log(kontoDo + ' BIGGER THAN ' + kontoOd);
		return kontoDo >= kontoOd;
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

	// reverseSortKontos(kontos: KontnaGrupa[]):KontnaGrupa[] {
	//
	//   return null
	// }
}

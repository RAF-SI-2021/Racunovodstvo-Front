import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountPlanService } from '../../services/account-plan/account-plan.service';
import { KontnaGrupa } from '../../shared/account-plan.model';

@Component({
	selector: 'app-account-plan',
	templateUrl: './account-plan.component.html',
	styleUrls: ['./account-plan.component.css'],
})
export class AccountPlanComponent implements OnInit {
	kontoCreateForm: FormGroup;
	kontoUpdateForm: FormGroup;
	kontos: KontnaGrupa[] = [];
	enableEditIndex = -1;

	constructor(
		private formBuilder: FormBuilder,
		private kontnaGrupaService: AccountPlanService
	) {
		this.kontoCreateForm = this.formBuilder.group({
			brojKonta: [
				'',
				[
					Validators.required,
					Validators.pattern('[0-9]+'),
					Validators.maxLength(3),
				],
			],
			naziv: ['', Validators.required],
		});
		this.kontoUpdateForm = this.formBuilder.group({
			brojKonta: [
				'',
				[
					Validators.required,
					Validators.pattern('[0-9]+'),
					Validators.maxLength(3),
				],
			],
			naziv: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.readKontos();
	}

	updateKonto(kontnaGrupaId: number) {
		this.kontnaGrupaService
			.update(
				this.kontoUpdateForm.get('brojKonta')?.value,
				this.kontoUpdateForm.get('naziv')?.value,
				kontnaGrupaId
			)
			.subscribe((konto1) => {
				let newKontos = [];
				for (let i = 0; i < this.kontos.length; i++) {
					if (this.kontos[i].kontnaGrupaId != kontnaGrupaId) {
						newKontos.push(this.kontos[i]);
					} else {
						newKontos.push(konto1);
					}
				}
				this.kontos = newKontos;
				this.sortKontos();
				this.enableEditIndex = -1;
				this.kontoUpdateForm.reset();
			});
	}

	deleteKonto(konto: KontnaGrupa) {
		this.kontnaGrupaService.delete(konto).subscribe((resp) => {
			let newKontos = [];

			for (let i = 0; i < this.kontos.length; i++) {
				if (this.kontos[i] != konto) {
					newKontos.push(this.kontos[i]);
				}
			}
			this.kontos = newKontos;
			this.sortKontos();
		});
	}

	createKonto() {
		this.kontnaGrupaService
			.create(
				this.kontoCreateForm.get('brojKonta')?.value,
				this.kontoCreateForm.get('naziv')?.value
			)
			.subscribe((konto) => {
				this.kontos.push(konto);
				this.sortKontos();
				this.kontoCreateForm.reset();
			});
	}

	readKontos() {
		this.kontnaGrupaService.readAll().subscribe((readKontoResp) => {
			this.kontos = readKontoResp.content;
			this.sortKontos();
		});
	}

	sortKontos() {
		let knts = this.kontos;
		console.log(knts);
		knts.sort((a, b) => {
			let kontoNum1 = Number.parseFloat('0.'.concat(a.brojKonta));
			let kontoNum2 = Number.parseFloat('0.'.concat(b.brojKonta));
			if (kontoNum1 > kontoNum2) return 1;
			if (kontoNum1 < kontoNum2) return -1;

			return 0;
		});
		console.log(knts);

		this.kontos = knts;
	}

	toggleEditable(i: number) {
		if (i == this.enableEditIndex) this.enableEditIndex = -1;
		else this.enableEditIndex = i;
	}
}

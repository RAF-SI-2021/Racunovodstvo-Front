import { Component, OnInit } from '@angular/core';
import { Koeficijent } from '../../shared/koeficijent.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KoeficijentiService } from '../../services/koeficijenti/koeficijenti.service';

@Component({
	selector: 'app-koeficijenti',
	templateUrl: './koeficijenti.component.html',
	styleUrls: ['./koeficijenti.component.css'],
})
export class KoeficijentiComponent implements OnInit {
	koeficijenti: Koeficijent[] = [];
	koefForms: FormGroup[] = [];

	constructor(
		private formBuilder: FormBuilder,
		private service: KoeficijentiService
	) {}

	ngOnInit(): void {
		this.service.getAllKoeficijenti().subscribe((response) => {
			this.koeficijenti = response;
			for (let i = 0; i < this.koeficijenti.length; i++) {
				let form = this.formBuilder.group({
					najnizaOsnovica: [
						this.koeficijenti[i].najnizaOsnovica,
						Validators.required,
					],
					najvisaOsnovica: [
						this.koeficijenti[i].najvisaOsnovica,
						Validators.required,
					],
					penzionoOsiguranje1: [
						this.koeficijenti[i].penzionoOsiguranje1,
						Validators.required,
					],
					penzionoOsiguranje2: [
						this.koeficijenti[i].penzionoOsiguranje2,
						Validators.required,
					],
					zdravstvenoOsiguranje1: [
						this.koeficijenti[i].zdravstvenoOsiguranje1,
						Validators.required,
					],
					zdravstvenoOsiguranje2: [
						this.koeficijenti[i].zdravstvenoOsiguranje2,
						Validators.required,
					],
				});
				this.koefForms.push(form);
			}
		});
	}

	update(index: number) {
		let najnizaOsnovica =
			this.koefForms[index].get('najnizaOsnovica')?.value;
		let najvisaOsnovica =
			this.koefForms[index].get('najvisaOsnovica')?.value;
		let penzionoOsiguranje1 = this.koefForms[index].get(
			'penzionoOsiguranje1'
		)?.value;
		let penzionoOsiguranje2 = this.koefForms[index].get(
			'penzionoOsiguranje2'
		)?.value;
		let zdravstvenoOsiguranje1 = this.koefForms[index].get(
			'zdravstvenoOsiguranje1'
		)?.value;
		let zdravstvenoOsiguranje2 = this.koefForms[index].get(
			'zdravstvenoOsiguranje2'
		)?.value;

		this.service
			.updateKoeficijent(
				this.koeficijenti[index],
				najnizaOsnovica,
				najvisaOsnovica,
				penzionoOsiguranje1,
				penzionoOsiguranje2,
				zdravstvenoOsiguranje1,
				zdravstvenoOsiguranje2
			)
			.subscribe((response) => {});
	}
}

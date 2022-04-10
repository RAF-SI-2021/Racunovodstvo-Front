import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZaposleniProfilService } from '../../services/zaposleni-profil/zaposleni-profil.service';
import { Plata, Zaposleni } from '../../shared/profile.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-profil-zaposlenog',
	templateUrl: './profil-zaposlenog.component.html',
	styleUrls: ['./profil-zaposlenog.component.css'],
})
export class ProfilZaposlenogComponent implements OnInit {
	addingForm: FormGroup;
	staz: string = '';
	plata!: number;
	plate: Plata[] = [];

	constructor(
		private profilService: ZaposleniProfilService,
		private formBuilder: FormBuilder,
		router: Router,
		private route: ActivatedRoute,
		public datepipe: DatePipe
	) {
		this.addingForm = this.formBuilder.group({
			sifraZaposlenog: ['', Validators.required],
			ime: ['', Validators.required],
			prezime: ['', Validators.required],
			imeRoditelja: [''],
			datumPocetka: [new Date(), Validators.required],
			JMBG: ['', Validators.required],
			pol: ['', Validators.required],
			datumRodjenja: ['', Validators.required],
			adresa: [''],
			grad: [''],
			radnoMesto: ['', Validators.required],
			brojRacuna: [''],
			stepenObrazovanja: [''],
			brojRadneKnjizice: [''],
			status: ['', Validators.required],
			komentar: [''],
		});
	}

	ngOnInit(): void {
		this.profilService
			.getZaposleni(this.route.snapshot.paramMap.get('id'))
			.subscribe((zaposleni) => {
				this.addingForm.patchValue({
					sifraZaposlenog: zaposleni.zaposleniId,
					ime: zaposleni.ime,
					prezime: zaposleni.prezime,
					imeRoditelja: zaposleni.imeRoditelja,
					datumPocetka: zaposleni.pocetakRadnogOdnosa,
					JMBG: zaposleni.jmbg,
					pol: zaposleni.pol,
					datumRodjenja: zaposleni.datumRodjenja,
					adresa: zaposleni.adresa,
					grad: zaposleni.grad,
					radnoMesto: zaposleni.radnaPozicija,
					brojRacuna: zaposleni.brojRacuna,
					stepenObrazovanja: zaposleni.stepenObrazovanja,
					brojRadneKnjizice: zaposleni.brojRadneKnjizice,
					status: zaposleni.statusZaposlenog,
					komentar: zaposleni.komentar,
				});
				this.staz = this.izracunajStaz(zaposleni.pocetakRadnogOdnosa);
				console.log(this.staz + ' !');
			});

		this.profilService
			.getPlate(this.route.snapshot.paramMap.get('id'))
			.subscribe((plate) => {
				this.plate = plate;
			});
	}

	edit() {
		alert(this.addingForm.get('datumPocetka')?.value);
		// if(this.addingForm.valid){
		this.profilService
			.updateZaposleni(
				this.addingForm.get('sifraZaposlenog')?.value,
				this.addingForm.get('ime')?.value,
				this.addingForm.get('prezime')?.value,
				this.addingForm.get('imeRoditelja')?.value, // .value ?????
				this.addingForm.get('datumPocetka')?.value,
				this.addingForm.get('JMBG')?.value,
				this.addingForm.get('pol')?.value,
				this.addingForm.get('datumRodjenja')?.value,
				this.addingForm.get('adresa')?.value, // .value ?????
				this.addingForm.get('grad')?.value, // .value ?????
				this.addingForm.get('brojRacuna')?.value,
				this.addingForm.get('stepenObrazovanja')?.value,
				this.addingForm.get('brojRadneKnjizice')?.value,
				this.addingForm.get('status')?.value,
				this.addingForm.get('komentar')?.value,
				this.addingForm.get('radnoMesto')?.value
			)
			.subscribe((zaposleni) => {
				console.log('uspesno cuvanje' + ' ' + zaposleni);
			});
		// }else{
		//   console.log("forma nije validna")
		// }
	}

	put() {
		this.profilService
			.putPlata(this.route.snapshot.paramMap.get('id'), this.plata)
			.subscribe((plata) => {
				this.profilService
					.getPlate(this.route.snapshot.paramMap.get('id'))
					.subscribe((plate) => {
						this.plate = plate;
					});
			});
	}

	izracunajStaz(pocetakRada: string) {
		let date1 = new Date(pocetakRada);
		let date2 = new Date();
		let date3 = new Date(date2.getTime() - date1.getTime());
		console.log(date3.getTime());
		let earliestDate = new Date(3600);
		return (
			date3.getFullYear() -
			earliestDate.getFullYear() +
			'/' +
			(date3.getMonth() + 1 - (earliestDate.getMonth() + 1)) +
			'/' +
			(date3.getDate() - earliestDate.getDate())
		);
	}
}

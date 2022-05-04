import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZaposleniService } from '../../services/zaposleni/zaposleni.service';
import { Zaposleni } from '../../shared/profile.model';
import { Company } from '../../shared/invoice.model';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-zaposleni',
	templateUrl: './zaposleni.component.html',
	styleUrls: ['./zaposleni.component.css'],
})
export class ZaposleniComponent implements OnInit {
	filterGroup: FormGroup;
	addZaposleniGroup: FormGroup;
	zaposleni: Zaposleni[] | null = [];
	preduzeca: Company[] = [];

	constructor(
		private formBuilder: FormBuilder,
		private service: ZaposleniService,
		private fakturaService: InvoiceService,
		private router: Router
	) {
		this.filterGroup = formBuilder.group({
			ime: [''],
			prezime: [''],
			radnaPozicija: [''],
			statusZaposlenog: [''],
		});

		this.addZaposleniGroup = formBuilder.group({
			ime: ['', Validators.required],
			prezime: ['', Validators.required],
			jmbg: [
				'',
				[
					Validators.required,
					Validators.minLength(13),
					Validators.maxLength(13),
				],
			],
			pol: ['', Validators.required],
			datumRodjenja: ['', Validators.required],
			preduzece: ['', Validators.required],
			radnaPozicija: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.service.getAllZaposleni().subscribe((response) => {
			this.zaposleni = response;
			this.zaposleni = this.zaposleni.sort((n1, n2) => {
				if (n1.statusZaposlenog < n2.statusZaposlenog) {
					return 1;
				}

				if (n1.statusZaposlenog > n2.statusZaposlenog) {
					return -1;
				}

				return 0;
			});
		});
		this.fakturaService.svaPreduzeca().subscribe((response) => {
			this.preduzeca = response;
		});
		this.addZaposleniGroup = this.formBuilder.group({
			ime: ['', Validators.required],
			prezime: ['', Validators.required],
			jmbg: [
				'',
				[
					Validators.required,
					Validators.minLength(13),
					Validators.maxLength(13),
				],
			],
			pol: ['', Validators.required],
			datumRodjenja: ['', Validators.required],
			preduzece: ['', Validators.required],
			radnaPozicija: ['', Validators.required],
		});
	}

	izracunajStaz(pocetakRada: string) {
		let date1 = new Date(pocetakRada);
		let date2 = new Date();
		let date3 = new Date(date2.getTime() - date1.getTime());
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
	filter() {
		let ime = this.filterGroup.get('ime')?.value;
		let prezime = this.filterGroup.get('prezime')?.value;
		let statusZaposlenog = this.filterGroup.get('statusZaposlenog')?.value;
		let radnaPozicija = this.filterGroup.get('radnaPozicija')?.value;
		this.service
			.filterZaposleni(
				this.createQuery(ime, prezime, statusZaposlenog, radnaPozicija)
			)
			.subscribe(
				(response) => {
					if (response.ok) {
						this.zaposleni = response.body;
					}
				},
				(error) => {
					alert('Nema rezultata za trazenu pretragu!');
				}
			);
	}

	createQuery(
		ime: string,
		prezime: string,
		statusZaposlenog: string,
		radnaPozicija: string
	) {
		let query = '';
		if (
			ime == '' &&
			prezime == '' &&
			statusZaposlenog == '' &&
			radnaPozicija == ''
		) {
			return 'all';
		}
		if (ime !== '') {
			query += 'ime:' + ime + ',';
		}
		if (prezime !== '') {
			query += 'prezime:' + prezime + ',';
		}
		if (statusZaposlenog !== '') {
			query += 'statusZaposlenog:' + statusZaposlenog + ',';
		}
		if (radnaPozicija !== '') {
			query += 'radnaPozicija:' + radnaPozicija + ',';
		}
		return query.substring(0, query.length - 1);
	}

	dodajZaposlenog() {
		let ime = this.addZaposleniGroup.get('ime')?.value;
		let prezime = this.addZaposleniGroup.get('prezime')?.value;
		let datumRodjenja = this.addZaposleniGroup.get('datumRodjenja')?.value;
		let jmbg = this.addZaposleniGroup.get('jmbg')?.value;
		let pol = this.addZaposleniGroup.get('pol')?.value;
		let radnaPozicija = this.addZaposleniGroup.get('radnaPozicija')?.value;
		let preduzece = this.addZaposleniGroup.get('preduzece')?.value;
		this.preduzeca.forEach((value) => {
			if (preduzece === value.naziv) {
				preduzece = value;
			}
		});
		this.service
			.createZaposleni(
				ime,
				prezime,
				datumRodjenja,
				jmbg,
				pol,
				radnaPozicija,
				preduzece
			)
			.subscribe((response) => {
				this.ngOnInit();
			});
	}

	profilZaposlenog(index: number) {
		this.router.navigate([`zaposleni/${index}`]);
	}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Plata } from '../../shared/plata.model';
import { PlateZaposlenihService } from '../../services/plate-zaposlenih/plate-zaposlenih.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-plate-zaposlenih',
	templateUrl: './plate-zaposlenih.component.html',
	styleUrls: ['./plate-zaposlenih.component.css'],
})
export class PlateZaposlenihComponent implements OnInit {
	filterGroup: FormGroup;
	plate: Plata[] | null = [];

	constructor(
		private formBuilder: FormBuilder,
		private service: PlateZaposlenihService,
		private router: Router
	) {
		this.filterGroup = formBuilder.group({
			ime: [''],
			prezime: [''],
			netoPlata: [''],
			porez: [''],
			doprinos1: [''],
			doprinos2: [''],
			brutoPlata: [''],
			ukupanTrosakZarade: [''],
			komentar: [''],
		});
	}

	ngOnInit(): void {
		this.service.getAllPlate().subscribe((response) => {
			this.plate = response;
			this.plate = this.plate.sort((n1, n2) => {
				if (
					n1.zaposleni.statusZaposlenog <
					n2.zaposleni.statusZaposlenog
				) {
					return 1;
				}

				if (
					n1.zaposleni.statusZaposlenog >
					n2.zaposleni.statusZaposlenog
				) {
					return -1;
				}

				return 0;
			});
		});
	}

	filter() {
		let ime = this.filterGroup.get('ime')?.value;
		let prezime = this.filterGroup.get('prezime')?.value;
		let netoPlata = this.filterGroup.get('netoPlata')?.value;
		let porez = this.filterGroup.get('porez')?.value;
		let doprinos1 = this.filterGroup.get('doprinos1')?.value;
		let doprinos2 = this.filterGroup.get('doprinos2')?.value;
		let brutoPlata = this.filterGroup.get('brutoPlata')?.value;
		let ukupanTrosakZarade =
			this.filterGroup.get('ukupanTrosakZarade')?.value;
		let komentar = this.filterGroup.get('komentar')?.value;
		let query = this.createQuery(
			ime,
			prezime,
			netoPlata,
			porez,
			doprinos1,
			doprinos2,
			brutoPlata,
			ukupanTrosakZarade,
			komentar
		);
		if (query === 'all') {
			this.service.getAllPlate().subscribe((response) => {
				this.plate = response;
			});
			return;
		}
		this.service.filterPlate(query).subscribe(
			(response) => {
				console.log(response);
				if (
					response.ok &&
					response.body !== null &&
					response.body.length > 0
				) {
					this.plate = response.body;
				} else {
					alert('Nema rezultata za trazenu pretragu!');
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
		netoPlata: string,
		porez: string,
		doprinos1: string,
		doprinos2: string,
		brutoPlata: string,
		ukupanTrosakZarade: string,
		komentar: string
	) {
		let query = '';
		console.log(netoPlata);
		if (
			ime == '' &&
			prezime == '' &&
			netoPlata == '' &&
			porez == '' &&
			doprinos1 == '' &&
			doprinos2 == '' &&
			brutoPlata == '' &&
			ukupanTrosakZarade == '' &&
			komentar == ''
		) {
			return 'all';
		}
		if (ime !== '') {
			query += 'zaposleni_ime:' + ime + ',';
		}
		if (prezime !== '') {
			query += 'zaposleni_prezime:' + prezime + ',';
		}
		if (netoPlata !== '') {
			query += 'netoPlata:' + netoPlata + ',';
		}
		if (porez !== '') {
			query += 'porez:' + porez + ',';
		}
		if (doprinos1 !== '') {
			query += 'doprinos1:' + doprinos1 + ',';
		}
		if (doprinos2 !== '') {
			query += 'doprinos2:' + doprinos2 + ',';
		}
		if (brutoPlata !== '') {
			query += 'brutoPlata:' + brutoPlata + ',';
		}
		if (ukupanTrosakZarade !== '') {
			query += 'ukupanTrosakZarade:' + ukupanTrosakZarade + ',';
		}
		if (komentar !== '') {
			query += 'komentar:' + komentar + ',';
		}
		return query.substring(0, query.length - 1);
	}

	profilZaposlenog(index: number) {
		this.router.navigate([`zaposleni/${index}`]);
	}
}

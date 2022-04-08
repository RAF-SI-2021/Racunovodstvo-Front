import { Component, OnInit } from '@angular/core';
import { DnevnikKnjizenja } from '../../shared/dnevnik-knjizenja.model';
import { KnjizenjeService } from '../../services/knjizenje/knjizenje.service';

@Component({
	selector: 'app-knjizenja',
	templateUrl: './knjizenja.component.html',
	styleUrls: ['./knjizenja.component.css'],
})
export class KnjizenjaComponent implements OnInit {
	knjizenja: DnevnikKnjizenja[] = [];

	brojNaloga: string = '';
	od: Date = new Date();
	doo: Date = new Date();
	brojDokFak: string = '';
	komentar: string = '';
	uzetOd: boolean = false;
	uzetDo: boolean = false;

	pretrazi() {
		this.knjizenejService
			.pretrazi(
				this.brojNaloga,
				this.od,
				this.doo,
				this.brojDokFak,
				this.komentar,
				this.uzetOd,
				this.uzetDo
			)
			.subscribe((data: any) => {
				this.knjizenja = data.content;
			});
		this.uzetOd = false;
		this.uzetDo = false;
	}

	constructor(public knjizenejService: KnjizenjeService) {}

	ngOnInit(): void {
		localStorage.setItem(
			'jwt',
			'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTY0OTMxNjA4NCwiaWF0IjoxNjQ5MjgwMDg0fQ.LID1a-mPoi62Tfj8SjZYrwUu_TtoazrN2GR3LIlHUFAyXXZDN1wJVQVFrV56EmptW-3zWWyPq0nv8bloVBZ7cQ'
		);
		this.knjizenejService.getKnjizenja().subscribe((obj) => {
			this.knjizenja = obj;
		});
	}

	odChanged() {
		this.uzetOd = true;
	}

	doChanged() {
		this.uzetDo = true;
	}
}

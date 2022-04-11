import { Component, OnInit } from '@angular/core';
import { MainBook } from '../../shared/bookkeeping-journal.model';
import { GlavnaKnjigaService } from '../../services/glavna-knjiga/glavna-knjiga.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
	selector: 'app-sva-knjizenja',
	templateUrl: './sva-knjizenja.component.html',
	styleUrls: ['./sva-knjizenja.component.css'],
})
export class SvaKnjizenjaComponent implements OnInit {
	knjizenja: MainBook[] = [];

  filterForm : FormGroup;



	constructor(public knjizenejService: GlavnaKnjigaService, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      od: [''],
      doo: [''],
      konto: [''],
      nazivKonta: [''],
      komentar: ['']
    })
  }

	ngOnInit(): void {
		this.knjizenejService.getGlavneKnjige().subscribe((obj: any) => {
			this.knjizenja = obj.content;
		});
	}

	pretrazi() {
		this.knjizenejService
			.pretrazi(
				this.filterForm.get('od')?.value,
				this.filterForm.get('doo')?.value,
				this.filterForm.get('konto')?.value,
				this.filterForm.get('nazivKonta')?.value,
				this.filterForm.get('komentar')?.value,
			)
			.subscribe((data: any) => {
				this.knjizenja = data.content;
			});
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


}

import { Component, OnInit } from '@angular/core';
import { BookkeepingJournal } from 'src/app/shared/bookkeeping-journal.model';
import { BookkeepingJournalService } from '../../services/bookkeeping-journal/bookkeeping-journal.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
	selector: 'app-knjizenja',
	templateUrl: './bookkeeping-journal.component.html',
	styleUrls: ['./bookkeeping-journal.component.css'],
})
export class BookkeepingJournalComponent implements OnInit {
	knjizenja: BookkeepingJournal[] = [];

  filterForm : FormGroup;

	pretrazi() {
		this.knjizenejService
			.pretrazi(
				this.filterForm.get('brojNaloga')?.value,
				this.filterForm.get('od')?.value,
				this.filterForm.get('doo')?.value,
				this.filterForm.get('brojDokFak')?.value,
				this.filterForm.get('komentar')?.value
			)
			.subscribe((data: any) => {
				this.knjizenja = data.content;
			});
	}

	constructor(public knjizenejService: BookkeepingJournalService, private formBuilder : FormBuilder) {
    this.filterForm = this.formBuilder.group({
      brojNaloga: [''],
      od: [''],
      doo: [''],
      brojDokFak: [''],
      komentar: ['']
    })
  }

	ngOnInit(): void {
		// sessionStorage.setItem(
		// 	'jwt',
		// 	'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTY0OTMxNjA4NCwiaWF0IjoxNjQ5MjgwMDg0fQ.LID1a-mPoi62Tfj8SjZYrwUu_TtoazrN2GR3LIlHUFAyXXZDN1wJVQVFrV56EmptW-3zWWyPq0nv8bloVBZ7cQ'
		// );
		this.knjizenejService.getKnjizenja().subscribe((obj) => {
			this.knjizenja = obj;
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

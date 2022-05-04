import { Component, OnInit } from '@angular/core';
import { KontnaGrupa, Konto } from 'src/app/shared/invoice.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

@Component({
	selector: 'app-knjizenje-widget',
	templateUrl: './knjizenje-widget.component.html',
	styleUrls: ['./knjizenje-widget.component.css'],
})
export class KnjizenjeWidgetComponent implements OnInit {
	kontos: Konto[] = [];
	duguje: number | undefined;
	kontoInput: string | undefined;
	potrazuje: any | undefined;
	hiddenAdd: boolean = false;
	brojDokumenta: string = '';
	brojNaloga: string = '';
	datum: string = '';
	dugujeUkupnoNum: number = 0;
	potrazujeUkupnoNum: number = 0;

	editing: boolean = false;
	knjizenjeGroup: FormGroup;

	kontoGroups: FormGroup[] = [];

	ktnGrps: KontnaGrupa[] = [];
	options: string[] = [];
	filteredOptions: Observable<KontnaGrupa[]>[] = [];

	constructor(
		public formBuilder: FormBuilder,
		private service: InvoiceService
	) {
		// let ktnGrp1 = new KontnaGrupa("TEST", "0001");
		// let ktnGrp2 = new KontnaGrupa("TRTS", "0120");
		// let ktnGrp3 = new KontnaGrupa("KTN", "0130");
		// this.ktnGrps.push(ktnGrp1,
		//   ktnGrp2,
		//   ktnGrp3)
		this.knjizenjeGroup = this.formBuilder.group({
			brojDokumenta: ['', Validators.required],
			brojNaloga: ['', Validators.required],
			datum: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		if (!this.editing) {
			let knt4 = new Konto(
				new KontnaGrupa('', ''),
				0,
				0,
				false,
				false,
				false,
				false
			);
			let kontoGroup = this.formBuilder.group({
				konto: [knt4.kontnaGrupa.brojKonta, [Validators.required]],
				duguje: [
					knt4.duguje,
					[Validators.required, Validators.pattern('^[0-9]*$')],
				],
				potrazuje: [
					knt4.potrazuje,
					[Validators.required, Validators.pattern('^[0-9]*$')],
				],
			});
			this.kontos.push(knt4);
			this.kontoGroups.push(kontoGroup);
		}
		this.editing = false;
		for (let i = 0; i < this.kontoGroups.length; i++) {
			this.filteredOptions[i] = this.kontoGroups[i].valueChanges.pipe(
				map((value) => this._filter(value))
			);
		}
		this.service.getKontneGrupe().subscribe((response) => {
			this.ktnGrps = response.content;
		});
	}

	private _filter(value: any): KontnaGrupa[] {
		console.log(value);
		const filterValue = ('' + value.konto).toLowerCase();

		console.log(filterValue);

		return this.ktnGrps.filter(
			(option) =>
				option.nazivKonta.toLowerCase().includes(filterValue) ||
				option.brojKonta.toLowerCase().includes(filterValue)
		);
	}

	delete(index: number) {
		this.kontos.splice(index, 1);
		this.kontoGroups.splice(index, 1);
		this.editing = true;
		this.ngOnInit();
	}
	edit(index: number) {
		let konto = this.kontoGroups[index].get('konto')?.value;
		let duguje = this.kontoGroups[index].get('duguje')?.value;
		let potrazuje = this.kontoGroups[index].get('potrazuje')?.value;

		this.editing = true;

		this.kontos[index].kontnaGrupa = konto;
		this.kontos[index].duguje = duguje;
		this.kontos[index].potrazuje = potrazuje;

		this.ngOnInit();

		alert('Uspesno izmenjen konto');
	}

	add(index: number) {
		let konto = this.kontoGroups[index].get('konto')?.value;
		let duguje = this.kontoGroups[index].get('duguje')?.value;
		let potrazuje = this.kontoGroups[index].get('potrazuje')?.value;

		this.kontos.pop();

		let knt = new Konto(konto, duguje, potrazuje, true, true, true, true);

		this.kontos.push(knt);

		this.ngOnInit();
	}

  knjizenje() {
    if(this.kontos.length < 2){
      alert('Mora postojati minimum 1 konto!')
      return;
    }
    for (let i = 0; i < this.kontos.length - 1; i++) {
      if (
        this.kontos[i].kontnaGrupa !==
        this.kontoGroups[i].get('konto')?.value
      ) {
        alert(
          'Konto broj ' +
          i +
          ' nije sacuvan. Kliknite na dugme Izmeni u tom redu kako biste sacuvali promene'
        );
        return;
      }
      if (
        this.kontos[i].duguje !==
        this.kontoGroups[i].get('duguje')?.value
      ) {
        alert(
          'Konto broj ' +
          i +
          ' nije sacuvan. Kliknite na dugme Izmeni u tom redu kako biste sacuvali promene'
        );
        return;
      }
      if (
        this.kontos[i].potrazuje !==
        this.kontoGroups[i].get('potrazuje')?.value
      ) {
        alert(
          'Konto broj ' +
          i +
          ' nije sacuvan. Kliknite na dugme Izmeni u tom redu kako biste sacuvali promene'
        );
        return;
      }
      let flag = false;
      this.ktnGrps.forEach((value => {
        if(this.kontoGroups[i].get('konto')?.value === value.brojKonta){
          flag = true
        }
      }));
      if(!flag){
        alert(
          'Uneti konto ne postoji. Molimo selektujte konoto iz padajuce liste.'
        );
        return;
      }
    }
    if (this.dugujeUkupnoNum - this.potrazujeUkupnoNum !== 0) {
      // if (confirm('Nalog nije u ravnotezi. Da li zelite da nastavite?')) {
      //   this.uknjizi();
      // } else {
      //   return;
      // }
      alert(
        'Nalog nije u ravnoteži. Knjiženje nije moguće!'
      );
      return;
    }
    this.uknjizi();
  }


  uknjizi() {
		this.kontos.splice(this.kontos.length - 1, 1);
		this.kontos.forEach((value) => {
			this.ktnGrps.forEach((value2) => {
				if (value2.brojKonta == '' + value.kontnaGrupa) {
					value.kontnaGrupa = value2;
				}
			});
		});
		this.service
			.knjizenje(
				this.kontos,
				this.dugujeUkupnoNum,
				this.potrazujeUkupnoNum,
				this.dugujeUkupnoNum - this.potrazujeUkupnoNum,
				this.knjizenjeGroup.get('brojDokumenta')?.value,
				this.knjizenjeGroup.get('brojNaloga')?.value,
				this.knjizenjeGroup.get('datum')?.value
			)
			.subscribe((response) => {
				this.kontos = [];
				this.kontoGroups = [];
				this.ngOnInit();
			});
	}

	dugujeUkupno() {
		this.dugujeUkupnoNum = 0;
		this.kontos.forEach((value) => {
			this.dugujeUkupnoNum += value.duguje;
		});
		return this.dugujeUkupnoNum;
	}

	potrazujeUkupno() {
		this.potrazujeUkupnoNum = 0;
		this.kontos.forEach((value) => {
			this.potrazujeUkupnoNum += value.potrazuje;
		});
		return this.potrazujeUkupnoNum;
	}

	saldo() {
		return this.dugujeUkupnoNum - this.potrazujeUkupnoNum;
	}
}

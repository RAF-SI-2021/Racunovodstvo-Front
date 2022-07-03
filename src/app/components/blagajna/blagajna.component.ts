import {Component, OnInit} from '@angular/core';
import {Transakcija} from "../../shared/transakcija.model";
import {TransakcijaService} from "../../services/transakcija/transakcija.service";

@Component({
  selector: 'app-blagajna',
  templateUrl: './blagajna.component.html',
  styleUrls: ['./blagajna.component.css']
})
export class BlagajnaComponent implements OnInit {

  transakcije: Transakcija[] = [];
  input: string = '';
  vrednost: string = '';
  filterZaTip: boolean = false;

  constructor(private service: TransakcijaService) {
  }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.service.getAllTransactions().subscribe(data => {
      this.transakcije = data.content;
      console.log(this.transakcije)
    })
    this.input = '';
    this.vrednost = '';
    this.filterZaTip = false;
  }

  knjizi(item: Transakcija) {
    this.service.subject.next({brojDokumenta: item.brojTransakcije, datum: item.datumTransakcije});
  }

  filter(filter: string, vrednost: string) {
    this.filterZaTip = false;

    if (filter === 'iznosTransakcije') {
      let proveraVrednosti = parseInt(vrednost);
      if (isNaN(proveraVrednosti)) {
        alert('Morate uneti broj kako bi pretrazili po ovom filteru');
        return;
      }
    } else if (filter === 'datumTransakcije') {
      let proveraVrednosti = new Date(vrednost);
      if (isNaN(proveraVrednosti.getDate())) {
        alert('Morate uneti pravilan datum');
        return;
      }
    } else if (filter === 'tipTransakcije') {
      this.filterZaTip = true;
      if (vrednost != 'UPLATA' && vrednost != 'ISPLATA') {
        alert('Tip moze biti samo UPLATA/ISPLATA');
        return;
      }
    }

    this.service.filterTransactions(filter, vrednost).subscribe(
      response => {
        this.transakcije = response.content;
      },
      (error) => {
        alert('Doslo je do greske pri primenjivanju filtera');
      }
    );
  }

  getAllIznosiZaTip() {
    let suma = 0;
    let tip = this.transakcije && this.transakcije.length > 0 && this.transakcije[0] ?
      this.transakcije[0].tipTransakcije : this.vrednost ? this.vrednost : '?';

    this.transakcije.forEach(item => {
      suma += item.iznos;
    })
    return 'Suma svih iznosa za tip ' + tip + ': ' + suma;
  }

  setInputType() {
    const element = document.getElementById('vrednost');

    if (this.input === 'datumTransakcije') { // @ts-ignore
      element.setAttribute('type', 'date');
    } else if (this.input === 'iznosTransakcije') { // @ts-ignore
      element.setAttribute('type', 'number');
    } else { // @ts-ignore
      element.setAttribute('type', 'text');
    }
  }

  getAsDate(date: string) {
    let newDate = new Date(date);
    return (newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear());
  }

}

import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IzvestajiService} from "../../../services/izvestaji.service";
import {IzvestajOTransakcijamaSifraComponent} from "../izvestaj-o-transakcijama-sifra.component";

@Component({
  selector: 'app-iots',
  templateUrl: './iots.component.html',
  styleUrls: ['./iots.component.css']
})
export class IotsComponent {

  @ViewChild(IzvestajOTransakcijamaSifraComponent, {static: true})
  child: IzvestajOTransakcijamaSifraComponent;
  title: string;
  tipSortiranja: string[] = ['uplata rastuće', 'uplata opadajuće', 'saldo rastuće', 'saldo opadajuće'];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private service: IzvestajiService) {
    this.title = data.title;
  }

  close() {
    if (this.child !== undefined) {
      this.child.closeDialog()
    }
  }

  stampaj(naslov: HTMLInputElement, sortiranje: HTMLSelectElement) {
    if (naslov.value == '') {
      alert('Morate popuniti naslov!');
    } else {
      let sort: string[] = ['uplata', '-uplata', 'saldo', '-saldo'];
      this.service.getIzvestajOTransakcijamaPoSifriTransakcije(naslov.value, sort[sortiranje.selectedIndex]).subscribe(
        res => {
          let file = new Blob([res], {type: 'application/pdf'});
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }, (error) => {
          alert("Doslo je do greške ucitavnja fajla. Pokušajte ponovo.")
          return;
        });
    }
  }

}

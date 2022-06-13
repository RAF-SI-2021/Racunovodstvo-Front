import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {IzvestajOPromenamaNaKapitaluComponent} from "../izvestaj-o-promenama-na-kapitalu.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IzvestajiService} from "../../../services/izvestaji.service";

@Component({
  selector: 'app-iopnk',
  templateUrl: './iopnk.component.html',
  styleUrls: ['./iopnk.component.css']
})
export class IopnkComponent {

  @ViewChild(IzvestajOPromenamaNaKapitaluComponent, {static: true})
  child: IzvestajOPromenamaNaKapitaluComponent;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private service: IzvestajiService) {
    this.title = data.title;
  }

  close() {
    if (this.child !== undefined) {
      this.child.closeDialog()
    }
  }

  stampaj(godina1: HTMLInputElement, godina2: HTMLInputElement, opis: HTMLTextAreaElement) {
    this.service.getIzvestajOPromenamaNaKapitalu(+godina1.value, +godina2.value, opis.value).subscribe( res => {
      let file = new Blob([res], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }, (error) => {
      alert("Doslo je do greške ucitavnja fajla. Pokušajte ponovo.")
      return;
    });
  }

}

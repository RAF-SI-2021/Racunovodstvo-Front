import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IotsComponent} from "./iots-popup/iots.component";

@Component({
  selector: 'app-izvestaj-o-transakcijama-sifra',
  templateUrl: './izvestaj-o-transakcijama-sifra.component.html',
  styleUrls: ['./izvestaj-o-transakcijama-sifra.component.css']
})
export class IzvestajOTransakcijamaSifraComponent {

  constructor(private dialogRef : MatDialog) { }

  openDialog() {
    this.dialogRef.open(IotsComponent, {
      data: {
        title: 'Statistički izveštaj o transakcijama po šifri transakcije'
      },
      height: '533px',
      width: '800px',
    })
  }

  closeDialog(){
    this.dialogRef.closeAll();
  }

}

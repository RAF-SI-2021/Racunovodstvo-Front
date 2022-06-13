import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IotkComponent} from "./iotk-popup/iotk.component";

@Component({
  selector: 'app-izvestaj-o-transakcijama-komitent',
  templateUrl: './izvestaj-o-transakcijama-komitent.component.html',
  styleUrls: ['./izvestaj-o-transakcijama-komitent.component.css']
})
export class IzvestajOTransakcijamaKomitentComponent {

  constructor(private dialogRef : MatDialog) { }

  openDialog() {
    this.dialogRef.open(IotkComponent, {
      data: {
        title: 'Izveštaj o transakcijama vezanim za komitenta'
      },
      height: '533px',
      width: '800px',
    })
  }

  closeDialog(){
    this.dialogRef.closeAll();
  }

}

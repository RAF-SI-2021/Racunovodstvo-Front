import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IopnkComponent} from "./iopnk-popup/iopnk.component";

@Component({
  selector: 'app-izvestaj-o-promenama-na-kapitalu',
  templateUrl: './izvestaj-o-promenama-na-kapitalu.component.html',
  styleUrls: ['./izvestaj-o-promenama-na-kapitalu.component.css']
})
export class IzvestajOPromenamaNaKapitaluComponent {

  constructor(private dialogRef : MatDialog) { }

  openDialog() {
    this.dialogRef.open(IopnkComponent, {
      data: {
        title: 'Izveštaj o promenama na kapitalu'
      },
      height: '533px',
      width: '800px',
    })
  }

  closeDialog(){
    this.dialogRef.closeAll();
  }

}

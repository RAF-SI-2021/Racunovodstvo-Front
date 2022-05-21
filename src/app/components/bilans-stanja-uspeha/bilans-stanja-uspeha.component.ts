import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BsuPopupComponent} from "./bsu-popup/bsu-popup.component";

@Component({
  selector: 'app-bilans-stanja-uspeha',
  templateUrl: './bilans-stanja-uspeha.component.html',
  styleUrls: ['./bilans-stanja-uspeha.component.css']
})
export class BilansStanjaUspehaComponent implements OnInit {

  constructor(private dialogRef : MatDialog) { }

  ngOnInit(): void {
  }

  bilansUspeha() {
    this.dialogRef.open(BsuPopupComponent, {
      data: {
        title: 'Bilans uspeha'
      },
      height: '533px',
      width: '800px',
    });
  }

  bilansStanja() {
    this.dialogRef.open(BsuPopupComponent, {
      data: {
        title: 'Bilans stanja'
      },
      height: '533px',
      width: '800px',
    })
  }

  closeDialog(){
   this.dialogRef.closeAll();
  }
}

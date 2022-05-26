import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BilansStanjaUspehaComponent} from "../bilans-stanja-uspeha.component";
import {DatePipe} from "@angular/common";
import {BilansStanjaUspehaService} from "../../../services/bilans-stanja-uspeha/bilans-stanja-uspeha.service";

@Component({
  selector: 'app-bsu-popup',
  templateUrl: './bsu-popup.component.html',
  styleUrls: ['./bsu-popup.component.css']
})
export class BsuPopupComponent implements OnInit {

  @ViewChild(BilansStanjaUspehaComponent, {static : true}) child : BilansStanjaUspehaComponent | undefined;
  inputForm: FormGroup;
  dateDropdown: boolean = true;
  plusMinus: string = '+';
  symbolArray: string[] = ['+','-'];
  index = 1;

  title;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private formBuilder :FormBuilder,
              private datepipe: DatePipe,
              private service: BilansStanjaUspehaService) {
    this.title = data.title;
    this.inputForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      date1: ['', [Validators.required]],
      date2: ['', [Validators.required]],
      date3: [''],
      date4: [''],
      date5: [''],
      date6: [''],
    });
  }



  ngOnInit(): void {
  }

  toggle() {
    this.dateDropdown = !this.dateDropdown;
    this.plusMinus = this.symbolArray[(this.index++)%this.symbolArray.length];
  }

  close() {
    if(this.child !== undefined){
      this.child.closeDialog()
    }else{
      alert("Greška u zatvaranju.")
    }
  }
  checkDate(date1:Date, date2:Date): boolean{
      if(date1<date2){
        return true;
      }else{
        return false;
      }
  }

  stampaj() {
    let naslov = this.title;
    let naziv = this.inputForm.get('name')?.value;
    let date1 = this.inputForm.get('date1')?.value;
    let date2 = this.inputForm.get('date2')?.value;
    let date3 = this.inputForm.get('date3')?.value;
    let date4 = this.inputForm.get('date4')?.value;
    let date5 = this.inputForm.get('date5')?.value;
    let date6 = this.inputForm.get('date6')?.value;
    let dates = [];
    if(date1 != '' && date2 != '') {
      let d1 = this.datepipe.transform(new Date(date1), 'dd/MM/yyyy');
      let d2 = this.datepipe.transform(new Date(date2), 'dd/MM/yyyy');
      dates.push([d1,d2, "1"]);
    }else if (date1 != '' && date2 == '' || date1 == '' && date2 != ''){
      alert('Unestite oba datuma za jedan period');
      return;
    }
    if(date3 != '' && date4 != '') {
      let d3 = this.datepipe.transform(new Date(date3), 'dd/MM/yyyy');
      let d4 = this.datepipe.transform(new Date(date4), 'dd/MM/yyyy');
      dates.push([d3,d4,"2"])
    }else if (date3 != '' && date4 == '' || date3 == '' && date4 != ''){
      alert('Unestite oba datuma za jedan period');
      return;
    }
    if(date5 != '' && date6 != '') {
      let d5 = this.datepipe.transform(new Date(date5), 'dd/MM/yyyy');
      let d6 = this.datepipe.transform(new Date(date6), 'dd/MM/yyyy');
      dates.push([d5,d6,"3"]);
    }else if (date5 != '' && date6 == '' || date5 == '' && date6 != ''){
      alert('Unestite oba datuma za jedan period');
      return;
    }
    console.log('--------------------------------');
    console.log(dates.toString())
    let date1od = '';
    let date1do = '';
    let date2od = '';
    let date2do = '';
    let date3od = '';
    let date3do = '';
    for (let i = 0; i < dates.length; i++) {
      if(dates[i][0] !== null && dates[i][1] !== null) {
        // @ts-ignore
        if (this.checkDate(dates[i][0], dates[i][1])) {
            if(dates[i][2] == "1"){
              date1od = dates[i][0]!;
              date1do = dates[i][1]!;
            }else if(dates[i][2] == "2"){
              date2od = dates[i][0]!;
              date2do = dates[i][1]!;
            }else if(dates[i][2] == "3"){
              date3od = dates[i][0]!;
              date3do = dates[i][1]!;
            }
        }
         else {
          alert('Datumi nisu validni, pokusajte ponovo');
          return;
        }
      }
    }
    if(naslov == 'Bilans stanja'){
        if(naziv != '' && naziv != undefined){
          this.service.get_stanje(naziv,date1od,date1do,date2od,date2do,date3od,date3do).subscribe( res => {
            let file = new Blob([res], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          }, (error) => {
            alert("Doslo je do greške ucitavnja fajla. Pokušajte ponovo.")
            return;
          });
        }
    }else if(naslov =='Bilans uspeha'){
      if(naziv != '' && naziv != undefined) {
        this.service.get_uspeh(naziv,date1od,date1do,date2od,date2do,date3od,date3do).subscribe(res => {
          let file = new Blob([res], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }, (error => {
          alert("Doslo je do greške ucitavnja fajla. Pokušajte ponovo.")
          return;


        }));
      }
    }
  }
}

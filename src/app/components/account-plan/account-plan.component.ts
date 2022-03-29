import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Konto} from "../../../model";

@Component({
  selector: 'app-account-plan',
  templateUrl: './account-plan.component.html',
  styleUrls: ['./account-plan.component.css']
})
export class AccountPlanComponent implements OnInit {

  kontoForm: FormGroup;
  kontos: Konto[] = []



  constructor(private formBuilder: FormBuilder) {
    this.kontoForm = this.formBuilder.group({
      brojKonta: ['', [Validators.required, Validators.pattern("[0-9]+"), Validators.maxLength(9)]],
      naziv: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    let konto1 = new class implements Konto {
      brojKonta: string = '';
      naziv: string = '';
    }

    let konto2 = new class implements Konto {
      brojKonta: string = '';
      naziv: string = '';
    }
    konto1.brojKonta = '032'
    konto1.naziv = 'blabla'
    this.kontos.push(konto1)
    console.log(this.kontos)

    konto2.brojKonta = '01222'
    konto2.naziv = 'blablablablablabla'
    this.kontos.push(konto2)
    console.log(this.kontos)

    this.readKontos()
    this.sortKontos()
  }

  toggleShow() {

  }

  updateKonto(konto: Konto) {
    //TODO wait for backend UPDATE API route
  }

  deleteKonto(konto: Konto) {
    //TODO wait for backend DELETE API route
  }

  createKonto() {
    //TODO wait for backend CREATE API route
  }

  readKontos() {
    //TODO wait for backend READ API route
  }

  sortKontos() {
    let knts = this.kontos
    console.log(knts)
    knts.sort((a, b) =>{

      let kontoNum1 = Number.parseFloat("0.".concat(a.brojKonta))
      let kontoNum2 = Number.parseFloat("0.".concat(b.brojKonta))
      if (kontoNum1 > kontoNum2)
        return 1
      if (kontoNum1 < kontoNum2)
        return -1

      return 0
    })
    console.log(knts)

    this.kontos = knts
  }
}

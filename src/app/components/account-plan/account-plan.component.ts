import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KontnaGrupa} from "../../../model";
import {KontnaGrupaService} from "../../services/kontna-grupa.service";

@Component({
  selector: 'app-account-plan',
  templateUrl: './account-plan.component.html',
  styleUrls: ['./account-plan.component.css']
})
export class AccountPlanComponent implements OnInit {

  kontoCreateForm: FormGroup;
  kontoUpdateForm: FormGroup;
  kontos: KontnaGrupa[] = []
  enableEditIndex = -1;



  constructor(private formBuilder: FormBuilder, private kontnaGrupaService: KontnaGrupaService) {
    this.kontoCreateForm = this.formBuilder.group({
      brojKonta: ['', [Validators.required, Validators.pattern("[0-9]+"), Validators.maxLength(3)]],
      naziv: ['', Validators.required],
    })
    this.kontoUpdateForm = this.formBuilder.group({
      brojKonta: ['', [Validators.required, Validators.pattern("[0-9]+"), Validators.maxLength(3)]],
      naziv: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.readKontos()
  }

  updateKonto(konto: KontnaGrupa) {
    //FIXME wait for backend to fix UPDATE API route

  }

  deleteKonto(konto: KontnaGrupa) {
    this.kontnaGrupaService.delete(konto).subscribe(resp => {

      let newKontos = []

      for (let i = 0; i < this.kontos.length; i++) {
        if (this.kontos[i] != konto) {
          newKontos.push(this.kontos[i])
        }
      }
      this.kontos = newKontos
    })
  }

  createKonto() {
    this.kontnaGrupaService.create(
      this.kontoCreateForm.get('brojKonta')?.value,
      this.kontoCreateForm.get('naziv')?.value
    ).subscribe(konto => {
      this.kontos.push(konto)
      this.sortKontos()
      this.kontoCreateForm.reset()
    })
  }

  readKontos() {
    this.kontnaGrupaService.readAll().subscribe(readKontoResp => {
      this.kontos = readKontoResp.content
      this.sortKontos()
    })
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

  toggleEditable(i: number) {
    if (i == this.enableEditIndex)
      this.enableEditIndex = -1
    else
      this.enableEditIndex = i

  }
}
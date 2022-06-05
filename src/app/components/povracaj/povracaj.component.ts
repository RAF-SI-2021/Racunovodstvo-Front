import { Component, OnInit } from '@angular/core';
import {PovracajModel} from "../../shared/povracaj.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PovracajService} from "../../services/povracaj/povracaj.service";

@Component({
  selector: 'app-povracaj',
  templateUrl: './povracaj.component.html',
  styleUrls: ['./povracaj.component.css']
})
export class PovracajComponent implements OnInit {

  povracaji: PovracajModel[] = [];
  povracajForm: FormGroup;
  editPovracajForm: FormGroup[] = [];

  constructor(private formBuilder: FormBuilder, private service: PovracajService) {
    // let povracaj1 = {brojPovracaja: "123", datum: new Date().toISOString().substring(0, 10), prodajnaVrednost: 1000}
    // let povracaj2 = {brojPovracaja: "123", datum: new Date().toISOString().substring(0, 10), prodajnaVrednost: 1000}
    // let povracaj3 = {brojPovracaja: "123", datum: new Date().toISOString().substring(0, 10), prodajnaVrednost: 1000}
    // this.povracaji.push(povracaj1, povracaj2, povracaj3);
    this.povracajForm = formBuilder.group({
      brojPovracaja: ['', Validators.required],
      datum: ['', Validators.required],
      prodajnaVrednost: [0, Validators.required]
    })
    // this.povracaji.forEach(value => {
    //   this.editPovracajForm.push(formBuilder.group({
    //     brojPovracaja: [value.brojPovracaja, Validators.required],
    //     datum: [value.datum, Validators.required],
    //     prodajnaVrednost: [value.prodajnaVrednost, Validators.required]
    //   }))
    // })
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(response =>{
      this.povracaji = response;

      this.editPovracajForm = [];

      this.povracaji.forEach(value => {
        this.editPovracajForm.push(this.formBuilder.group({
          brojPovracaja: [value.brojPovracaja, Validators.required],
          datum: [new Date(value.datumPovracaja.substring(0, 10)).toISOString().substring(0, 10), Validators.required],
          prodajnaVrednost: [value.prodajnaVrednost, Validators.required]
        }))
      })
    })

    this.povracajForm = this.formBuilder.group({
      brojPovracaja: ['', Validators.required],
      datum: ['', Validators.required],
      prodajnaVrednost: [0, Validators.required]
    })
  }

  sacuvaj() {
    let brojPovracaja = this.povracajForm.get('brojPovracaja')?.value;
    let datum = this.povracajForm.get('datum')?.value;
    let prodajnaVrednost = this.povracajForm.get('prodajnaVrednost')?.value;
    this.service.createPovracaj(brojPovracaja, datum, prodajnaVrednost).subscribe((response) => {
      this.ngOnInit();
    })
  }


  izmeni(i: number) {
    let brojPovracaja = this.editPovracajForm[i].get('brojPovracaja')?.value;
    let datum = this.editPovracajForm[i].get('datum')?.value;
    let prodajnaVrednost = this.editPovracajForm[i].get('prodajnaVrednost')?.value;
    this.service.editPovracaj(this.povracaji[i].povracajId, brojPovracaja, datum, prodajnaVrednost).subscribe((response) => {
      this.ngOnInit();
    })
  }

  delete(i: number) {
    this.service.deletePovracaj(i).subscribe(response =>{
      this.ngOnInit();
    })
  }
}

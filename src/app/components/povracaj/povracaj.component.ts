import { Component, OnInit } from '@angular/core';
import {PovracajModel} from "../../shared/povracaj.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-povracaj',
  templateUrl: './povracaj.component.html',
  styleUrls: ['./povracaj.component.css']
})
export class PovracajComponent implements OnInit {

  povracaji: PovracajModel[] = [];
  povracajForm: FormGroup;
  editPovracajForm: FormGroup[] = [];

  constructor(private formBuilder: FormBuilder) {
    let povracaj1 = {brojPovracaja: "123", datum: new Date().toISOString().substring(0, 10), prodajnaVrednost: 1000}
    let povracaj2 = {brojPovracaja: "123", datum: new Date().toISOString().substring(0, 10), prodajnaVrednost: 1000}
    let povracaj3 = {brojPovracaja: "123", datum: new Date().toISOString().substring(0, 10), prodajnaVrednost: 1000}
    this.povracaji.push(povracaj1, povracaj2, povracaj3);
    this.povracajForm = formBuilder.group({
      brojPovracaja: ['', Validators.required],
      datum: ['', Validators.required],
      prodajnaVrednost: [0, Validators.required]
    })
    this.povracaji.forEach(value => {
      this.editPovracajForm.push(formBuilder.group({
        brojPovracaja: [value.brojPovracaja, Validators.required],
        datum: [value.datum, Validators.required],
        prodajnaVrednost: [value.prodajnaVrednost, Validators.required]
      }))
    })
  }

  ngOnInit(): void {
  }

  sacuvaj() {

  }
}

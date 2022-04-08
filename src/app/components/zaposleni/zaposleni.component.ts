import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ZaposleniService} from "../../services/zaposleni/zaposleni.service";
import {Zaposleni} from "../../shared/profile.model";

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit {

  filterGroup: FormGroup;
  addZaposleniGroup: FormGroup;
  zaposleni: Zaposleni[] = [];

  constructor(private formBuilder : FormBuilder, private service : ZaposleniService) {
    this.filterGroup = formBuilder.group({
      ime: [''],
      prezime: [''],
      radnaPozicija: [''],
      statusZaposlenog:[''],
    });

    this.addZaposleniGroup = formBuilder.group({

    });

  }

  ngOnInit(): void {
  }

}

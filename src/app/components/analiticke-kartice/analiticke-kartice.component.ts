import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-analiticke-kartice',
  templateUrl: './analiticke-kartice.component.html',
  styleUrls: ['./analiticke-kartice.component.css']
})
export class AnalitickeKarticeComponent implements OnInit {

  analitickaKarticaForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.analitickaKarticaForm = this.formBuilder.group({
      konto: ['', [Validators.required]],
      datumOd: [''],
      datumDo: [''],
      komitent: [''],
    });
  }



  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {Plata} from "../../shared/plata.model";
import {PlateZaposlenihService} from "../../services/plate_zaposlenih/plate-zaposlenih.service";
import {Zaposleni} from "../../shared/profile.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-obracun',
  templateUrl: './obracun.component.html',
  styleUrls: ['./obracun.component.css']
})
export class ObracunComponent implements OnInit {

  obracuni: Date[] = [new Date(2022, 3), new Date(2022, 4), new Date(2022, 5)];
  public gfg = true;
  flagovi: boolean[] = []
  ucinak: number = 100;
  plate: Plata[] | null = [];
  obracun: FormGroup;
  datum: Date = new Date();
  constructor(private formBuilder : FormBuilder, private service : PlateZaposlenihService) {
    for (let i =0; i<this.obracuni.length; i++){
      this.flagovi[i] = true;
    }

    this.obracun = formBuilder.group({
      ime: [''],
      prezime: [''],
      netoPlata: [''],
    });
  }

  ngOnInit(): void {
    this.service.getAllPlate().subscribe((response) =>{
      this.plate = response;
      this.plate = this.plate.sort((n1,n2) => {
        if (n1.zaposleni.statusZaposlenog < n2.zaposleni.statusZaposlenog) {
          return 1;
        }

        if (n1.zaposleni.statusZaposlenog > n2.zaposleni.statusZaposlenog) {
          return -1;
        }

        return 0;
      });
      for(let i =0; i<this.plate.length; i++){
        this.plate[i].ucinak = 100;
      }
    })


  }

}

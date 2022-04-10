import { Component, OnInit } from '@angular/core';
import {DnevnikKnjizenja, GlavnaKnjiga} from "../../shared/knjizenje.model";
import {GlavnaKnjigaService} from "../../services/glavna-knjiga.service";

@Component({
  selector: 'app-sva-knjizenja',
  templateUrl: './sva-knjizenja.component.html',
  styleUrls: ['./sva-knjizenja.component.css']
})
export class SvaKnjizenjaComponent implements OnInit {

  knjizenja: GlavnaKnjiga[] = [];

  od: Date = new Date();
  doo: Date = new Date();
  konto: string = '';
  nazivKonta: string = '';
  komentar: string = '';
  uzetOd: boolean = false;
  uzetDo: boolean = false;



  constructor(public knjizenejService: GlavnaKnjigaService) {
  }

  ngOnInit(): void {
    this.knjizenejService.getGlavneKnjige().subscribe( (obj:any) =>{
      this.knjizenja = obj.content;
    })
  }

  pretrazi() {
    this.knjizenejService.pretrazi( this.od, this.doo, this.konto, this.nazivKonta, this.komentar, this.uzetOd, this.uzetDo).subscribe((data:any)=>{
      this.knjizenja = data.content;
    })
    this.uzetOd = false;
    this.uzetDo = false;
  }

  odChanged() {
    this.uzetOd = true;
  }

  doChanged() {
    this.uzetDo = true;
  }
}

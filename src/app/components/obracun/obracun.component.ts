import { Component, OnInit } from '@angular/core';
import {Plata} from "../../shared/plata.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ObracunService} from "../../services/obracun/obracun.service";
import {Obracun, ObracunZaposleni, ObracunZaradeConfig, SifraTransakcije} from "../../shared/obracun.model";
import {Router} from "@angular/router";
import {PlateZaposlenihService} from "../../services/plate-zaposlenih/plate-zaposlenih.service";

@Component({
  selector: 'app-obracun',
  templateUrl: './obracun.component.html',
  styleUrls: ['./obracun.component.css']
})
export class ObracunComponent implements OnInit {

  // obracuni: Date[] = [new Date(2022, 3), new Date(2022, 4), new Date(2022, 5)];
  public gfg = true;
  flagovi: boolean[] = []
  ucinak: number = 100;
  plate: Plata[] | null = [];
  obracun: FormGroup;
  datum: Date = new Date();
  obracuni: Obracun[] = [];
  obracuniZaposleni: ObracunZaposleni[] = [];
  sifreTransakcija: SifraTransakcije[] = [];
  zakazanaSifra: string = '';
  zakazanDan: number = 0;
  selectovanaSifra: number = 0;
  dayExist: boolean = false;

  constructor(private formBuilder : FormBuilder, private service : PlateZaposlenihService, private obracunService: ObracunService, private router: Router) {
    this.obracun = formBuilder.group({
      dan: [''],
      datum: [''],
      vreme: [''],
    });
  }

  ngOnInit(): void {

    this.obracunService.getObracuni().subscribe(obracuni =>{
      this.obracuni = obracuni;
      console.log(obracuni)

      for (let i =0; i<this.obracuni.length; i++){
        this.flagovi[i] = true;
      }
    });

    this.obracunService.getDanSifraTransakcijeId().subscribe( ozc =>{

      this.zakazanDan = ozc.dayOfMonth;
      if(this.zakazanDan !== 0)
        this.dayExist = true;
      this.zakazanaSifra = ozc.sifraTransakcije.sifra + ": " + ozc.sifraTransakcije.nazivTransakcije;
    })



    this.obracunService.getTransakcije().subscribe( sifre =>{
      this.sifreTransakcija = sifre.content;
    })

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


  zbirNetoPlata(obracuniZaposleni: ObracunZaposleni[]) {

  }

  zbirPorez(obracuniZaposleni: ObracunZaposleni[]) {

  }

  zbirDoprinos11(obracuniZaposleni: ObracunZaposleni[]) {

  }

  zbirBrutoPlata(obracuniZaposleni: ObracunZaposleni[]) {

  }

  zbirDoprinosi2(obracuniZaposleni: ObracunZaposleni[]) {

  }

  zbirUkupanTrosakZarade(obracuniZaposleni: ObracunZaposleni[]) {

  }

  zakazi() {
    this.obracunService.update(this.obracun.get('dan')?.value, this.selectovanaSifra).subscribe(e=>{
      this.obracun.get('dan')?.setValue('');
      this.selectovanaSifra = 0;
    })
  }

  updateZaposleni(obracunZaposleniId: number, netoPlata: number, ucinak: number, index: number, index2: number) {
    this.obracunService.updateZaposleni(obracunZaposleniId, netoPlata, ucinak).subscribe(obracunZaposleni=>{
      this.obracuni[index].obracunZaposleniList[index2] = obracunZaposleni;
    })
  }

  deleteZaposleni(obracunZaposleniId: number, index: number, index2: number) {
    this.obracunService.deleteZaposleni(obracunZaposleniId).subscribe( e=>{
      this.obracuni[index].obracunZaposleniList.splice(index2, 1);
    })
  }

  izvrsiTransakciju(id: number){
    this.obracunService.izvrsiTransakciju(id).subscribe(e=>{
      location.reload()
    })
  }

  napravi() {
    // this.selectovanaSifra
    this.obracunService.napraviObracun(this.selectovanaSifra).subscribe(e=>{
      this.obracuni.push(e);
    })
  }
}

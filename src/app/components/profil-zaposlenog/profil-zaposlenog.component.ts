import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ZaposleniProfilService} from "../../services/zaposleni-profil/zaposleni-profil.service";
import {Zaposleni} from "../../shared/profile.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-profil-zaposlenog',
  templateUrl: './profil-zaposlenog.component.html',
  styleUrls: ['./profil-zaposlenog.component.css']
})
export class ProfilZaposlenogComponent implements OnInit {

  zaposleniData = null;

  public addingForm : FormGroup;

  // sifraZaposlenog:number =0;
  // ime: string = '';
  // prezime:string = '';
  // imeRoditelja:string = '';
  // datumPocetkaRadnogOdnosa: string = '';
  // netoPlata: number = 0;
  // JMBG:string = '';
  // pol:string = '';
  // datumRodjenja: string = '';
  // adresa:string = '';
  // grad:string = '';
  // radnoMesto:string = '';
  // brojRacuna:string = '';
  // stepenObrazovanja:string = '';
  // brojRadneKnjizice:number = 0;
  // status:string = '';
  // komentar:string = '';

  constructor(private profilService: ZaposleniProfilService, private formBuilder: FormBuilder, router: Router, private route: ActivatedRoute, public datepipe: DatePipe) {
    this.addingForm = this.formBuilder.group({
      sifraZaposlenog: ['', Validators.required],
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      imeRoditelja:[''],
      datumPocetka: ['', Validators.required],
      JMBG: ['', Validators.required],
      pol: ['', Validators.required],
      datumRodjenja: ['', Validators.required],
      adresa:[''],
      grad:[''],
      radnoMesto: ['', Validators.required],
      brojRacuna:[''],
      stepenObrazovanja:[''],
      brojRadneKnjizice:[''],
      status: ['', Validators.required],
      komentar:['']
    });
  }

  ngOnInit(): void {



    // localStorage.setItem("jwt", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImV4cCI6MTY0OTUyOTA1MiwiaWF0IjoxNjQ5NDkzMDUyfQ.bQ_Gl1rr4REMN28jYMAbeO_VuRJ7H2wbxfteXTEUk9HVZbpxTsHzqmPKXnJK8UV1aFTavi03gpUKTB3aVRVfOg")
    this.profilService.getZaposleni(this.route.snapshot.paramMap.get('id')).subscribe((zaposleni) =>{
      this.addingForm.patchValue({
        sifraZaposlenog: zaposleni.zaposleniId,
        ime: zaposleni.ime,
        prezime: zaposleni.prezime,
        imeRoditelja:zaposleni.imeRoditelja,
        datumPocetka: zaposleni.datumRodjenja,
        JMBG: zaposleni.jmbg,
        pol: zaposleni.pol,
        datumRodjenja: zaposleni.datumRodjenja,
        adresa:zaposleni.adresa,
        grad:zaposleni.grad,
        radnoMesto: zaposleni.radnaPozicija,
        brojRacuna:zaposleni.brojRacuna,
        stepenObrazovanja:zaposleni.stepenObrazovanja,
        brojRadneKnjizice:zaposleni.brojRadneKnjizice,
        status:zaposleni.statusZaposlenog,
        komentar:zaposleni.komentar
      });

      console.log(zaposleni)
      // let pocetak = new Date(zaposleni.pocetakRadnogOdnosa).getTime();
      // let danas = new Date().getTime();
      // // @ts-ignore
      // console.log(this.datepipe.transform(new Date(danas-pocetak), 'dd/MM/yy'))
      // this.sifraZaposlenog = zaposleni.zaposleniId;
      // this.ime = zaposleni.ime;
      // this.prezime = zaposleni.prezime;
      // this.imeRoditelja = zaposleni.imeRoditelja;
      // this.datumPocetkaRadnogOdnosa = zaposleni.pocetakRadnogOdnosa;
      // this.JMBG = zaposleni.jmbg;
      // this.pol = zaposleni.pol;
      // this.datumRodjenja = zaposleni.datumRodjenja;
      // this.adresa = zaposleni.adresa;
      // this.grad = zaposleni.grad;
      // this.radnoMesto = zaposleni.radnaPozicija;
      // this.brojRacuna = zaposleni.brojRacuna;
      // this.stepenObrazovanja = zaposleni.stepenObrazovanja;
      // this.brojRadneKnjizice = zaposleni.brojRadneKnjizice;
      // this.status = zaposleni.statusZaposlenog;
      // this.komentar = zaposleni.komentar;
    })
  }
  edit(){
  //   this.profilService.updateZaposleni(this.sifraZaposlenog, this.ime, this.prezime, this.imeRoditelja, this.datumPocetkaRadnogOdnosa, this.JMBG, this.pol,
  //     this.datumRodjenja, this.adresa, this.grad, this.brojRacuna, this.stepenObrazovanja, this.brojRadneKnjizice, this.status, this.komentar, this.radnoMesto).subscribe( zaposleni =>{
  //     console.log("uspesno cuvanje" + " " + zaposleni);
  //   })
  //
  }


}

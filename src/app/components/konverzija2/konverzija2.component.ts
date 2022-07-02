import { Component, OnInit } from '@angular/core';
import {KalkulacijaArtikal, KalkulacijeModel, Lokacija, TrosakNabavke} from "../../shared/kalkulacije.model";
import {Company} from "../../shared/invoice.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KalkulacijeService} from "../../services/kalkulacije/kalkulacije.service";
import {InvoiceService} from "../../services/invoice/invoice.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {KonverzijaService} from "../../services/konverzija/konverzija.service";
import {Artikal, Konverzija, Preduzece} from "../../shared/konverzija.model";
import {switchMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-konverzija2',
  templateUrl: './konverzija2.component.html',
  styleUrls: ['./konverzija2.component.css']
})
export class Konverzija2Component implements OnInit {

  addingForm: FormGroup;
  kalkulacije: KalkulacijeModel[] = [];
  konverzije: Konverzija[] = [];
  lokacije: Lokacija[] = [];

  artikli: Artikal[] = [];

  troskoviNabavke: TrosakNabavke[] = [];

  companies: Company[] = [];
  dobavljaci: Preduzece[] = [];

  konverzija: Konverzija;
  // kalkulacija: KalkulacijeModel;
  artikal: KalkulacijaArtikal;

  ind = 0;


  kalkForm: FormGroup;
  artForm: FormGroup;
  trosakForm: FormGroup[] = [];
  filterForm: FormGroup;
  currencies: string[];


  selected: boolean = false;
  selectedArt: boolean = false;
  isNewKalk: boolean = false;
  isNewArt: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private service: KalkulacijeService,
              private serviceComp: InvoiceService,
              private modalService: NgbModal,
              private konverzijaService: KonverzijaService,
              private route:Router,
              config: NgbModalConfig) {
    config.backdrop = 'static';
    config.centered = true;

    this.currencies = ["RSD", "EUR", "USD", "CHF", "GBP", "AUD", "CAD", "SEK", "DKK", "NOK",
      "JPY", "RUB", "CNY", "HRK", "KWD", "PLN", "CZK", "HUF", "BAM"];

    this.kalkForm = formBuilder.group({
      brojKalkulacije: ['', Validators.required],
      tipKalkulacije: ['', Validators.required],
      datum: ['', Validators.required],
      dobavljac: ['', Validators.required],
      lokacija: ['', Validators.required],
      troskoviNabavke: [[], Validators.required],
      valuta: ['', Validators.required],
      komentar: ['']
    })

    this.addingForm = this.formBuilder.group({
      brojKonverzije: ['', Validators.required, Validators.minLength(1)],
      datum: [new Date(), Validators.required],
      dobavljac: ['', Validators.required, Validators.minLength(1)],
      adresaLokacije: ['', Validators.required],
      nazivLokacije: ['', Validators.required],
      lokacija: [''],
      troskoviNabavke: this.formBuilder.array([]),
      fakturnaCena: [0, Validators.required],
      nabavnaVrednost: ['', [Validators.required, Validators.minLength(1)]],
      valuta: ['', [Validators.minLength(3), Validators.maxLength(3)]],
      komentar: ['']
    });
    this.addingForm.controls['fakturnaCena'].disable();
    this.addingForm.controls['nabavnaVrednost'].disable();

    this.artForm = formBuilder.group({
      sifraArtikla: ['', Validators.required],
      nazivArtikla: ['', Validators.required],
      jedinicaMere: ['', Validators.required],
      kolicina: [0, Validators.required],
      nabavnaCena: [0, Validators.required],
      rabatProcenat: [0, Validators.required],
      marzaProcenat: [0, Validators.required],
      porezProcenat: [0, Validators.required],
      prodajnaCena: [0, Validators.required],
      kalkulacijaKonverzijaId: [''],
      rabat: [0],
      marza: [0],
      porez: [0],
      osnZaProd: [0],
      unv: [0],
      ncpr: [0],
      osnovica: [0],
      upv: [0]
    })

    this.artForm.get('nabavnaCena')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('kolicina')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('rabatProcenat')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('marzaProcenat')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('porezProcenat')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.filterForm = formBuilder.group({
      brojKalkulacije: '',
      datumOd: '',
      datumDo: '',
      dobavljac: '',
      lokacija: '',
      nVrednost1: '',
      nVrednost2: '',
      pVrednost1: '',
      pVrednost2: '',
      komentar: '',
    })

    // this.lokacije.push({
    //   lokacijaId: 1,
    //   naziv: 'Magacin1',
    //   adresa: 'Beogradska 16'
    // },{
    //   lokacijaId: 2,
    //   naziv: 'Magacin2',
    //   adresa: 'Beogradska 22'
    // })

    // this.kalkulacije.push({
    //     id: 1,
    //     brojKalkulacije: '1235',
    //     tipKalkulacije: 'VP',
    //     datum: new Date().toLocaleDateString('it-IT'),
    //     dobavljacId: 1,
    //     fakturnaCena: 50,
    //     komentar: 'test',
    //     lokacija: this.lokacije[0],
    //     nabavnaVrednost: 1000,
    //     prodajnaVrednost: 2000,
    //     troskoviNabavke: [{ cena: 100, naziv: 'test'}, { cena: 200, naziv: 'test'}],
    //     valuta: 'RSD'
    //   },
    //
    //   {
    //     id: 2,
    //     brojKalkulacije: '123115',
    //     tipKalkulacije: 'MP',
    //     datum: new Date().toLocaleDateString('it-IT'),
    //     dobavljacId: 2,
    //     fakturnaCena: 55,
    //     komentar: 'test1',
    //     lokacija: this.lokacije[1],
    //     nabavnaVrednost: 1111,
    //     prodajnaVrednost: 2222,
    //     troskoviNabavke: [{ cena: 157, naziv: 'test'}, { cena: 111, naziv: 'test'}],
    //     valuta: 'RSD'
    //   })

    // this.artikli.push({
    //     artikalId: 1,
    //     jedinicaMere: 'kg',
    //     kolicina: 100,
    //     // marza: 10,
    //     marzaProcenat: 5,
    //     nabavnaCena: 1000,
    //     nabavnaCenaPosleRabata: 1100,
    //     nazivArtikla: 'Test',
    //     osnovica: 1000,
    //     porez: 100,
    //     porezProcenat: 1,
    //     prodajnaOsnovica: 880,
    //     prodajnaCena: 1111,
    //     rabatProcenat: 2,
    //     rabat: 100,
    //     sifraArtikla: '1256',
    //     ukupnaNabavnaVrednost: 1000,
    //     ukupnaProdajnaVrednost: 1200
    //   },

      // ,{
      //   artikalId: 2,
      //   jedinicaMere: 'kg',
      //   kolicina: 100,
      //   marza: 10,
      //   marzaProcenat: 5,
      //   nabavnaCena: 1000,
      //   nabavnaCenaPosleRabata: 1100,
      //   nazivArtikla: 'Test1',
      //   osnovica: 1000,
      //   porez: 100,
      //   porezProcenat: 1,
      //   prodajnaOsnovica: 880,
      //   prodajnaCena: 1111,
      //   rabatProcenat: 3,
      //   rabat: 100,
      //   sifraArtikla: '12a56',
      //   ukupnaNabavnaVrednost: 1000,
      //   ukupnaProdajnaVrednost: 1300
      // })

    this.companies.push({
      naziv: 'Kompanija1', preduzeceId: 1
    },{
      naziv: 'Kompanija2', preduzeceId: 2
    })

    this.lokacije.push({
      lokacijaId: 1,
      naziv: 'Magacin1',
      adresa: 'Beogradska 16'
    },{
      lokacijaId: 2,
      naziv: 'Magacin2',
      adresa: 'Beogradska 22'
    })

    // this.kalkulacija = {
    //   id: -1,
    //   brojKalkulacije: '1235',
    //   tipKalkulacije: 'test',
    //   datum: new Date().toLocaleDateString('it-IT'),
    //   dobavljacId: 1,
    //   fakturnaCena: 50,
    //   komentar: 'test',
    //   lokacija: this.lokacije[0],
    //   nabavnaVrednost: 1000,
    //   prodajnaVrednost: 2000,
    //   troskoviNabavke: [{ cena: 100, naziv: 'test'}, { cena: 200, naziv: 'test'}],
    //   valuta: 'RSD'
    // };

    this.artikal = {
      artikalId: -1,
      jedinicaMere: 'kg',
      kolicina: 100,
      marza: 10,
      marzaProcenat: 5,
      nabavnaCena: 1000,
      nabavnaCenaPosleRabata: 1100,
      nazivArtikla: 'Test',
      osnovica: 1000,
      porez: 100,
      porezProcenat: 1,
      prodajnaOsnovica: 880,
      prodajnaCena: 1111,
      rabatProcenat: 2,
      rabat: 100,
      sifraArtikla: '1256',
      ukupnaNabavnaVrednost: 1000,
      ukupnaProdajnaVrednost: 1200
    }

    // this.troskoviNabavke.push({naziv: '', cena: 0, troskoviNabavkeId: this.ind++})
    // this.trosakForm.push(this.formBuilder.group({
    //   naziv: ['', Validators.required],
    //   trosak: ['', Validators.required]
    // }))
  }

  ngOnInit(): void {
    this.konverzijaService.getKonverzije().pipe(switchMap(konverzije => {
      this.konverzije = konverzije.content;
      return this.konverzijaService.getKomitenti()
    }), switchMap((komitenti) => {
      this.dobavljaci = komitenti;

      /// za svaku konverziju setujem dobavljaca (naziv)

      for (let j = 0; j < this.konverzije.length; j++) {
        this.konverzije[j].hidden = true;
        for (let i = 0; i < komitenti.length; i++) {
          if (komitenti[i].preduzeceId == this.konverzije[j].dobavljacId) {
            this.konverzije[j].nazivDobavljaca = komitenti[i].naziv;
          }
        }
      }
      return this.service.getAllLokacije()
    })).subscribe(lokacije => {


      /// za svaku konverziju setujem lokaciju (naziv i adresu)
      this.lokacije = lokacije;

      for (let j = 0; j < this.konverzije.length; j++) {

        for (let i = 0; i < lokacije.length; i++) {
          if (lokacije[i].lokacijaId == this.konverzije[j].lokacija.lokacijaId) {
            this.konverzije[j].lokacija.naziv = lokacije[i].naziv;
            this.konverzije[j].lokacija.adresa = lokacije[i].adresa;
          }
        }
      }


    });
    // this.getAllKalkulacije();
    this.serviceComp.svaPreduzeca().subscribe(response => {
      this.companies = response;
    })
    // this.service.getAllLokacije().subscribe(response => {
    //   this.lokacije = response;
    // })
  }


  sumTroskoviNabavke(kalkulacija: Konverzija) {
    let sum = 0;
    for (let i = 0; i < kalkulacija.troskoviNabavke.length; i++) {
      sum += kalkulacija.troskoviNabavke[i].cena;
    }
    return sum;
  }

  open(content: any) {
    this.modalService.open(content, {size: "xl"});
  }

  getAsDate(datum: string) {
    return new Date(datum).toLocaleDateString('en-US');
  }

  cancelNewKalk(){
    this.isNewKalk = false;
  }



  noviTrosak(){
    this.troskoviNabavke.push({naziv: '', cena: 0})
    this.trosakForm.push(this.formBuilder.group({
      naziv: ['', Validators.required],
      trosak: [0, Validators.required]
    }))

    let zbir = 0;
    for (let i = 0; i < this.trosakForm.length; i++) {
      zbir += this.trosakForm[i].controls['trosak'].value
    }

    this.addingForm.get('nabavnaVrednost').setValue(zbir);

  }

  select(konverzija: Konverzija){
    if(this.selected == true){
      this.selected = false;
      return;
    }
    // if(this.kalkulacija != null && this.kalkulacija.id === kalkulacija.id){
    //   this.selected = false;
    //   this.kalkulacija = {
    //     id: -1,
    //     brojKalkulacije: '1235',
    //     tipKalkulacije: 'VP',
    //     datum: new Date().toLocaleDateString('it-IT'),
    //     dobavljacId: 1,
    //     fakturnaCena: 50,
    //     komentar: 'test',
    //     lokacija: this.lokacije[0],
    //     nabavnaVrednost: 1000,
    //     prodajnaVrednost: 2000,
    //     troskoviNabavke: [{ cena: 100, naziv: 'test'}, { cena: 200, naziv: 'test'}],
    //     valuta: 'RSD'
    //   };
    //   return;
    // }
    this.getAllArtikli(konverzija.konverzijaId)
    this.troskoviNabavke = konverzija.troskoviNabavke.slice();
    this.trosakForm = [];
    this.troskoviNabavke.forEach(value => {
      this.trosakForm.push(this.formBuilder.group({
        naziv: [value.naziv, Validators.required],
        trosak: [value.cena, Validators.required]
      }))
    })
    //
    // this.isNewKalk = false;
    // this.troskoviNabavke.push({naziv: '', cena: 0})
    // this.trosakForm.push(this.formBuilder.group({
    //   naziv: ['', Validators.required],
    //   trosak: [0, Validators.required]
    // }))
    // console.log(this.trosakForm)
    // console.log(this.troskoviNabavke)
    // this.kalkForm = this.formBuilder.group({
    //   brojKalkulacije: [kalkulacija.brojKalkulacije, Validators.required],
    //   tipKalkulacije: [kalkulacija.tipKalkulacije, Validators.required],
    //   datum: [kalkulacija.datum, Validators.required],
    //   dobavljac: [kalkulacija.dobavljacId, Validators.required],
    //   lokacija: [kalkulacija.lokacija, Validators.required],
    //   troskoviNabavke: [this.trosakForm, Validators.required],
    //   valuta: [kalkulacija.valuta, Validators.required],
    //   komentar: [kalkulacija.komentar]
    // })
    this.selected = true;
    this.konverzija = konverzija;
  }


  selectArt(artikal: Artikal){
    // if(this.artikal != null && this.artikal.artikalId === artikal.artikalId){
    //   this.selectedArt = false;
    //   this.artikal = {
    //     artikalId: -1,
    //     jedinicaMere: 'kg',
    //     kolicina: 100,
    //     marza: 10,
    //     marzaProcenat: 5,
    //     nabavnaCena: 1000,
    //     nabavnaCenaPosleRabata: 1100,
    //     nazivArtikla: 'Test',
    //     osnovica: 1000,
    //     porez: 100,
    //     porezProcenat: 1,
    //     prodajnaOsnovica: 880,
    //     prodajnaCena: 1111,
    //     rabatProcenat: 2,
    //     rabat: 100,
    //     sifraArtikla: '1256',
    //     ukupnaNabavnaVrednost: 1000,
    //     ukupnaProdajnaVrednost: 1200
    //   };
    //   return;
    // }
    // this.artikal = artikal;
    this.artForm = this.formBuilder.group({
      sifraArtikla: [artikal.sifraArtikla, Validators.required],
      nazivArtikla: [artikal.nazivArtikla, Validators.required],
      jedinicaMere: [artikal.jedinicaMere, Validators.required],
      kolicina: [artikal.kolicina, Validators.required],
      nabavnaCena: [artikal.nabavnaCena, Validators.required],
      rabatProcenat: [artikal.rabatProcenat, Validators.required],
      prodajnaCena: [artikal.prodajnaCena, Validators.required],
      kalkulacijaKonverzijaId: [''],
      rabat: [artikal.rabat],
      unv: [artikal.ukupnaNabavnaVrednost],
      ncpr: [artikal.nabavnaCenaPosleRabata],
    })

    this.artForm.get('nabavnaCena')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('kolicina')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('rabatProcenat')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('marzaProcenat')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('porezProcenat')?.valueChanges.subscribe(value => {
      this.calculate();
    })
    this.isNewArt = false;
    this.selectedArt = true;
  }

  deleteKalkulacija(id: number){
    this.service.deleteKalkulacija(id).subscribe( value => {
      let index = -1;
      for(let i = 0; i < this.kalkulacije.length; i++){
        if(this.kalkulacije[i].id === id){
          index = i;
          break;
        }
        if(index !== -1){
          this.kalkulacije.slice(index, 1);
        }
        window.location.reload();
      }
    })
  }

  filter(){
    let filter = "?search=";
    let brojKalkulacije = this.filterForm.get('brojKalkulacije')?.value;
    let dobavljac = this.filterForm.get('dobavljac')?.value;
    let lokacija = this.filterForm.get('lokacija')?.value;
    let datumOd = this.filterForm.get('datumOd')?.value;
    let datumDo = this.filterForm.get('datumDo')?.value;
    let nVrednost1 = this.filterForm.get('nVrednost1')?.value;
    let nVrednost2 = this.filterForm.get('nVrednost2')?.value;
    let pVrednost1 = this.filterForm.get('pVrednost1')?.value;
    let pVrednost2 = this.filterForm.get('pVrednost2')?.value;
    let komentar = this.filterForm.get('komentar')?.value;

    if(brojKalkulacije !== ""){
      filter += 'brojKalkulacije:' + brojKalkulacije + ',';
    }

    if(dobavljac !== ""){
      filter += 'dobavljacId:' + dobavljac + ',';
    }

    if(lokacija !== ""){
      filter += 'lokacijaId:' + lokacija + ',';
    }

    if(datumOd !== ""){
      let date = new Date(datumOd).getTime()/1000;
      filter += 'datum>' + date + ',';
      if(datumDo === ""){
        let date = new Date();
        let year = date.getFullYear();
        let day = '';
        let month = '';

        if(date.getDate() + 1 < 10)
          day = '0' + (date.getDate() + 1);
        else
          day = (date.getDate() + 1) + '';

        if(date.getMonth() + 1 < 10)
          month = '0' + (date.getMonth() + 1);
        else
          month = (date.getMonth() + 1) + '';

        let formattedDate =  year + '-' + month + '-' + day;
        let dat2 = new Date(formattedDate).getTime()/1000;
        filter += 'datum<' + dat2 + ',';
      }
    }

    if(datumDo !== ""){
      let date = new Date(datumDo).getTime()/1000 + 86400;
      filter += 'datum<' + date + ',';
      if(datumOd === ""){
        filter += 'datum>' + 3600 + ',';
      }
    }

    if(nVrednost1 !== ""){
      filter += 'nabavnaVrednost>' + nVrednost1 + ',';
      if(nVrednost2 === ""){
        filter += 'nabavnaVrednost<' + Number.MAX_SAFE_INTEGER + ',';
      }
    }

    if(nVrednost2 !== ""){
      filter += 'nabavnaVrednost<' + nVrednost2 + ',';
      if(nVrednost1 === ""){
        filter += 'nabavnaVrednost>' + 0 + ',';
      }
    }

    if(pVrednost1 !== ""){
      filter += 'prodajnaVrednost>' + pVrednost1 + ',';
      if(pVrednost2 === ""){
        filter += 'prodajnaVrednost<' + Number.MAX_SAFE_INTEGER + ',';
      }
    }

    if(pVrednost2 !== ""){
      filter += 'nabavnaVrednost<' + pVrednost2 + ',';
      if(pVrednost1 === ""){
        filter += 'nabavnaVrednost>' + 0 + ',';
      }
    }

    if(komentar !== ""){
      filter+= 'komentar:' + komentar;
    }

    this.service.filterKalkulacije(filter.substring(0, filter.length-1)).subscribe(response => {
      this.kalkulacije = response.content;
    })

  }


  deleteArtikal(id: number){
    this.service.deleteArtikal(id).subscribe( value => {
      let index = -1;
      for(let i = 0; i < this.artikli.length; i++){
        if(this.artikli[i].artikalId === id){
          index = i;
          break;
        }
        if(index !== -1){
          this.artikli.slice(index, 1);
        }
      }
      window.location.reload();
    })

  }

  getAllKalkulacije(){
    this.service.getAllKalkulacije().subscribe( response => {
      this.kalkulacije = response.content;
    })
  }

  getAllArtikli(kalkulacijaId: number){
    this.konverzijaService.getArtikli(kalkulacijaId).subscribe( response => {
      this.artikli = response.content;
    })
  }


  sumKolicina() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.kolicina
    })
    return Math.round(sum * 100) / 100
  }

  sumNabavnaCena() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.nabavnaCena
    })
    return Math.round(sum * 100) / 100
  }

  sumRabat() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.rabat
    })
    return Math.round(sum * 100) / 100
  }

  sumNabavnaCenaPosleRabata() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.nabavnaCenaPosleRabata
    })
    return Math.round(sum * 100) / 100
  }

  sumUkupnaNabavnaVrednost() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.ukupnaNabavnaVrednost
    })
    return Math.round(sum * 100) / 100
  }

  sumMarza() {
    // let sum = 0;
    // this.artikli.forEach( value => {
    //   sum+= value.marza
    // })
    // return Math.round(sum * 100) / 100
  }

  sumProdajnaOsnovica() {
    // let sum = 0;
    // this.artikli.forEach( value => {
    //   sum+= value.prodajnaOsnovica
    // })
    // return Math.round(sum * 100) / 100
  }

  sumPorez() {
    // let sum = 0;
    // this.artikli.forEach( value => {
    //   sum+= value.porez
    // })
    // return Math.round(sum * 100) / 100
  }

  sumProdajnaCena() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.prodajnaCena
    })
    return Math.round(sum * 100) / 100
  }

  sumOsnovica() {
    // let sum = 0;
    // this.artikli.forEach( value => {
    //   sum+= value.osnovica
    // })
    // return Math.round(sum * 100) / 100
  }

  sumUkupnaProdajnaVrednost() {
    // let sum = 0;
    // this.artikli.forEach( value => {
    //   sum+= value.ukupnaProdajnaVrednost
    // })
    // return Math.round(sum * 100) / 100
  }

  createNewKalk(){
    if(!this.isNewKalk){
      this.selected = false;
      // this.kalkulacija = {
      //   id: -1,
      //   brojKalkulacije: '1235',
      //   tipKalkulacije: 'test',
      //   datum: new Date().toLocaleDateString('it-IT'),
      //   dobavljacId: 1,
      //   fakturnaCena: 50,
      //   komentar: 'test',
      //   lokacija: this.lokacije[0],
      //   nabavnaVrednost: 1000,
      //   prodajnaVrednost: 2000,
      //   troskoviNabavke: [{ cena: 100, naziv: 'test'}, { cena: 200, naziv: 'test'}],
      //   valuta: 'RSD'
      // };
    }
    this.addingForm = this.formBuilder.group({
      brojKonverzije: ['', Validators.required, Validators.minLength(1)],
      datum: [new Date(), Validators.required],
      dobavljac: ['', Validators.required, Validators.minLength(1)],
      adresaLokacije: ['', Validators.required],
      nazivLokacije: ['', Validators.required],
      lokacija: [''],
      troskoviNabavke: this.formBuilder.array([]),
      fakturnaCena: [0, Validators.required],
      nabavnaVrednost: ['', [Validators.required, Validators.minLength(1)]],
      valuta: ['', [Validators.minLength(3), Validators.maxLength(3)]],
      komentar: ['']
    });
    this.addingForm.controls['fakturnaCena'].disable();
    this.addingForm.controls['nabavnaVrednost'].disable();
    this.trosakForm = [];
    this.troskoviNabavke = [];
    this.troskoviNabavke.push({naziv: '', cena: 0})
    this.trosakForm.push(this.formBuilder.group({
      naziv: ['', Validators.required],
      trosak: [0, Validators.required]
    }))
    this.isNewArt = false;
    this.selectedArt = false;
    this.isNewKalk = true;
  }

  createNewArt(){
    if(!this.isNewArt){
      this.selectedArt = false;
      this.artikal = {
        artikalId: -1,
        jedinicaMere: 'kg',
        kolicina: 100,
        marza: 10,
        marzaProcenat: 5,
        nabavnaCena: 1000,
        nabavnaCenaPosleRabata: 1100,
        nazivArtikla: 'Test',
        osnovica: 1000,
        porez: 100,
        porezProcenat: 1,
        prodajnaOsnovica: 880,
        prodajnaCena: 1111,
        rabatProcenat: 2,
        rabat: 100,
        sifraArtikla: '1256',
        ukupnaNabavnaVrednost: 1000,
        ukupnaProdajnaVrednost: 1200
      };
    }
    this.artForm = this.formBuilder.group({
      sifraArtikla: ['', Validators.required],
      nazivArtikla: ['', Validators.required],
      jedinicaMere: ['', Validators.required],
      kolicina: [0, Validators.required],
      nabavnaCena: [0, Validators.required],
      rabatProcenat: [0, Validators.required],
      marzaProcenat: [0, Validators.required],
      porezProcenat: [0, Validators.required],
      prodajnaCena: [0, Validators.required],
      kalkulacijaKonverzijaId: [''],
      rabat: [0],
      marza: [0],
      porez: [0],
      osnZaProd: [0],
      unv: [0],
      ncpr: [0],
      osnovica: [0],
      upv: [0]
    })
    this.artForm.get('nabavnaCena')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('kolicina')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('rabatProcenat')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('marzaProcenat')?.valueChanges.subscribe(value => {
      this.calculate();
    })

    this.artForm.get('porezProcenat')?.valueChanges.subscribe(value => {
      this.calculate();
    })
    // this.artForm.get('nabavnaCena')?.valueChanges.subscribe(value => {
    //   this.artForm.patchValue()
    // })
    this.isNewArt = true;
  }

  createNewKalkApi(){
    let brojKalkulacije = this.kalkForm.get('brojKalkulacije')?.value
    let tipKalkulacije = this.kalkForm.get('tipKalkulacije')?.value
    let datum = this.kalkForm.get('datum')?.value
    let dobavljacId = this.kalkForm.get('dobavljac')?.value
    let lokacijaId = this.kalkForm.get('lokacija')?.value
    let i = 0;
    console.log(this.trosakForm)
    this.trosakForm.forEach((value )=> {
      this.troskoviNabavke[i].cena = value.get('trosak')?.value;
      this.troskoviNabavke[i++].naziv = value.get('naziv')?.value;
    })
    let troskoviNabavke = this.troskoviNabavke.filter(value => value.cena !== 0 && value.naziv.trim() !== "");
    let valuta = this.kalkForm.get('valuta')?.value
    let komentar = this.kalkForm.get('komentar')?.value
    this.service.createKalkulacija(brojKalkulacije, tipKalkulacije, datum, dobavljacId, lokacijaId, troskoviNabavke, valuta, komentar).subscribe(response => {
      this.kalkulacije.push(response)
      this.isNewKalk = false;
    })
  }

  calculate(){
    let nCena = this.artForm.get('nabavnaCena')?.value;
    let rabatProcenat = this.artForm.get('rabatProcenat')?.value;
    let kolicina = this.artForm.get('kolicina')?.value;
    if(rabatProcenat > 100){
      rabatProcenat = 100;
    }

    let rabat = nCena * (rabatProcenat / 100);
    let ncpr = nCena - rabat;
    let unv = ncpr * kolicina;
    this.artForm.get('rabat')?.patchValue(rabat);
    this.artForm.get('ncpr')?.patchValue(ncpr);
    this.artForm.get('unv')?.patchValue(unv);
  }

  updateKalk(id: number){
    let brojKalkulacije = this.kalkForm.get('brojKalkulacije')?.value
    let tipKalkulacije = this.kalkForm.get('tipKalkulacije')?.value
    let datum = this.kalkForm.get('datum')?.value
    let dobavljacId = this.kalkForm.get('dobavljac')?.value
    let lokacijaId = JSON.parse(JSON.stringify(this.kalkForm.get('lokacija')?.value));
    console.log(lokacijaId);
    console.log(this.kalkForm.get('lokacija'))
    let i = 0;
    this.trosakForm.forEach((value )=> {
      this.troskoviNabavke[i].cena = value.get('trosak')?.value;
      this.troskoviNabavke[i++].naziv = value.get('naziv')?.value;
    })
    let troskoviNabavke = this.troskoviNabavke.filter(value => value.cena !== 0 && value.naziv.trim() !== "");
    let valuta = this.kalkForm.get('valuta')?.value
    let komentar = this.kalkForm.get('komentar')?.value
    this.service.updateKalkulacija(id, brojKalkulacije, tipKalkulacije, datum, dobavljacId, lokacijaId, troskoviNabavke, valuta, komentar).subscribe(response => {
      for(let i = 0; i < this.kalkulacije.length; i++){
        if(this.kalkulacije[i].id === id){
          this.kalkulacije[i] = response;
        }
      }
      this.selected = false;
    })
  }

  createNewArtApi(){

    // @ts-ignore
    this.konverzijaService.postArtikal( {
      sifraArtikla: this.artForm.get('sifraArtikla')?.value,
      nazivArtikla: this.artForm.get('nazivArtikla')?.value,
      jedinicaMere: this.artForm.get('jedinicaMere')?.value,
      kolicina: this.artForm.get('kolicina')?.value,
      nabavnaCena: this.artForm.get('nabavnaCena')?.value,
      rabatProcenat: this.artForm.get('rabatProcenat')?.value,
      rabat: this.artForm.get('rabat')?.value,
      nabavnaCenaPosleRabata: this.artForm.get('ncpr')?.value,
      ukupnaNabavnaVrednost: this.artForm.get('unv')?.value,
      konverzijaKalkulacijaId:  this.konverzija.konverzijaId,
    }).subscribe(artikal => {
      this.artikli.push(artikal);
    })

  }


  cancelNewArt(){
    this.isNewArt = false;
  }

  format(nabavnaVrednost: number) {
    return Math.round(nabavnaVrednost * 100) / 100
  }

  dodajKonverziju() {

    let lokacija : Lokacija = {adresa: "", naziv: ""}
    lokacija.naziv = this.addingForm.get('nazivLokacije')?.value
    lokacija.adresa = this.addingForm.get('adresaLokacije')?.value
    lokacija.lokacijaId = this.addingForm.get('lokacija')?.value
    let i = 0;
    this.trosakForm.forEach((value )=> {
      this.troskoviNabavke[i].cena = value.get('trosak')?.value;
      this.troskoviNabavke[i++].naziv = value.get('naziv')?.value;
    })
    let troskoviNabavke = this.troskoviNabavke.filter(value => value.cena !== 0 && value.naziv.trim() !== "");
    // @ts-ignore
    this.konverzijaService.postKonverzija({
      brojKonverzije: this.addingForm.get('brojKonverzije')?.value,
      datum: this.addingForm.get('datum')?.value,
      dobavljacId: this.addingForm.get('dobavljac')?.value,
      lokacija: lokacija,
      troskoviNabavke:troskoviNabavke,
      fakturnaCena: this.addingForm.get('fakturnaCena')?.value,
      nabavnaVrednost: this.addingForm.get('nabavnaVrednost')?.value,
      valuta: this.addingForm.get('valuta')?.value,
      komentar: this.addingForm.get('komentar')?.value
    }).subscribe(konverzija => {
      for (let dobavljac of this.companies) {
        if (dobavljac.preduzeceId === konverzija.dobavljacId) {
          konverzija.nazivDobavljaca = dobavljac.naziv;
          break;
        }
      }
      this.konverzije.push(konverzija)
    })
  }

  changedArtikal(konverzijaId: number) {
    // @ts-ignore
    this.addingFormArtikal.setValue({rabat: this.addingFormArtikal.get('nabavnaCena') * (this.addingFormArtikal.get('rabatProcenat') / 100)})
    // @ts-ignore
    this.addingFormArtikal.setValue({nabavnaCenaPosleRabata: this.addingFormArtikal.get('nabavnaCena') - this.addingFormArtikal.get('rabat')})
    // @ts-ignore
    this.addingFormArtikal.setValue({ukupnaNabavnaVrednost: this.addingFormArtikal.get('nabavnaCenaPosleRabata') * this.addingFormArtikal.get('kolicina')})


    let zbir = 0;
    for (let i = 0; i < this.artikli.length; i++) {
      zbir += this.artikli[i].ukupnaNabavnaVrednost;
    }
    // @ts-ignore
    zbir += this.addingFormArtikal.get('ukupnaNabavnaVrednost');

    this.addingForm.setValue({fakturnaCena: zbir});
  }

  delete(idKonverzije: number) {
    this.konverzijaService.deleteKonverzija(idKonverzije).subscribe(any => {
      for (let i = 0; i < this.konverzije.length; i++) {
        if (this.konverzije[i].konverzijaId == idKonverzije) {
          this.konverzije.splice(i, 1);
          this.artikli = []
        }
      }
    });
  }

  prikaziArtikal(id: number) {
    this.route.navigate(['/artikal/'+id]);
  }
}

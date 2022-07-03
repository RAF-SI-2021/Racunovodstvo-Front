import {Component, OnInit} from '@angular/core';
import {KalkulacijaArtikal, KalkulacijeModel, Lokacija, TrosakNabavke} from "../../shared/kalkulacije.model";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Company} from "../../shared/invoice.model";
import {KalkulacijeService} from "../../services/kalkulacije/kalkulacije.service";
import {InvoiceService} from "../../services/invoice/invoice.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {CurrencyService} from "../../services/currency/currency.service";
import {CurrencyResponse, CurrencyResult} from "../../shared/currency.model";

@Component({
  selector: 'app-kalkulacije',
  templateUrl: './kalkulacije.component.html',
  styleUrls: ['./kalkulacije.component.css']
})
export class KalkulacijeComponent implements OnInit {

  kalkulacije: KalkulacijeModel[] = [];

  artikli: KalkulacijaArtikal[] = [];

  troskoviNabavke: TrosakNabavke[] = [];

  currencies: string[];
  currencyResponse: CurrencyResponse;

  companies: Company[] = [];
  lokacije: Lokacija[] = [];

  kalkulacija: KalkulacijeModel;
  artikal: KalkulacijaArtikal;

  ind = 0;



  kalkForm: FormGroup;
  artForm: FormGroup;
  trosakForm: FormGroup[] = [];
  filterForm: FormGroup;


  selected: boolean = false;
  selectedArt: boolean = false;
  isNewKalk: boolean = false;
  isNewArt: boolean = false;

  constructor(private formBuilder: FormBuilder, private service: KalkulacijeService, private serviceComp: InvoiceService, private modalService: NgbModal,
              config: NgbModalConfig, private currency: CurrencyService) {
    config.backdrop = 'static';
    config.centered = true;
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

    this.currencies = ["RSD", "EUR", "USD", "CHF", "GBP", "AUD", "CAD", "SEK", "DKK", "NOK",
              "JPY", "RUB", "CNY", "HRK", "KWD", "PLN", "CZK", "HUF", "BAM"];

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

    this.lokacije.push({
      lokacijaId: 1,
      naziv: 'Magacin1',
      adresa: 'Beogradska 16'
    },{
      lokacijaId: 2,
      naziv: 'Magacin2',
      adresa: 'Beogradska 22'
    })

    this.kalkulacije.push({
        id: 1,
        brojKalkulacije: '1235',
        tipKalkulacije: 'VP',
        datum: new Date().toLocaleDateString('it-IT'),
        dobavljacId: 1,
        fakturnaCena: 50,
        komentar: 'test',
        lokacija: this.lokacije[0],
        nabavnaVrednost: 1000,
        prodajnaVrednost: 2000,
        troskoviNabavke: [{ cena: 100, naziv: 'test'}, { cena: 200, naziv: 'test'}],
        valuta: 'RSD'
      },

      {
        id: 2,
        brojKalkulacije: '123115',
        tipKalkulacije: 'MP',
        datum: new Date().toLocaleDateString('it-IT'),
        dobavljacId: 2,
        fakturnaCena: 55,
        komentar: 'test1',
        lokacija: this.lokacije[1],
        nabavnaVrednost: 1111,
        prodajnaVrednost: 2222,
        troskoviNabavke: [{ cena: 157, naziv: 'test'}, { cena: 111, naziv: 'test'}],
        valuta: 'RSD'
      })

    this.artikli.push({
        artikalId: 1,
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
      },

      {
        artikalId: 2,
        jedinicaMere: 'kg',
        kolicina: 100,
        marza: 10,
        marzaProcenat: 5,
        nabavnaCena: 1000,
        nabavnaCenaPosleRabata: 1100,
        nazivArtikla: 'Test1',
        osnovica: 1000,
        porez: 100,
        porezProcenat: 1,
        prodajnaOsnovica: 880,
        prodajnaCena: 1111,
        rabatProcenat: 3,
        rabat: 100,
        sifraArtikla: '12a56',
        ukupnaNabavnaVrednost: 1000,
        ukupnaProdajnaVrednost: 1300
      })

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

    this.kalkulacija = {
      id: -1,
      brojKalkulacije: '1235',
      tipKalkulacije: 'test',
      datum: new Date().toLocaleDateString('it-IT'),
      dobavljacId: 1,
      fakturnaCena: 50,
      komentar: 'test',
      lokacija: this.lokacije[0],
      nabavnaVrednost: 1000,
      prodajnaVrednost: 2000,
      troskoviNabavke: [{ cena: 100, naziv: 'test'}, { cena: 200, naziv: 'test'}],
      valuta: 'RSD'
    };

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
    this.getAllKalkulacije();
    this.serviceComp.svaPreduzeca().subscribe(response => {
      this.companies = response;
    })
    this.service.getAllLokacije().subscribe(response => {
      this.lokacije = response;
    })
    this.currency.getCurencies().subscribe((response) => {
              this.currencyResponse = response;
    });
  }


  sumTroskoviNabavke(kalkulacija: KalkulacijeModel) {
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
    console.log(this.trosakForm);
    console.log(this.troskoviNabavke);
  }

  select(kalkulacija: KalkulacijeModel){
    if(this.kalkulacija != null && this.kalkulacija.id === kalkulacija.id){
      this.selected = false;
      this.kalkulacija = {
        id: -1,
        brojKalkulacije: '1235',
        tipKalkulacije: 'VP',
        datum: new Date().toLocaleDateString('it-IT'),
        dobavljacId: 1,
        fakturnaCena: 50,
        komentar: 'test',
        lokacija: this.lokacije[0],
        nabavnaVrednost: 1000,
        prodajnaVrednost: 2000,
        troskoviNabavke: [{ cena: 100, naziv: 'test'}, { cena: 200, naziv: 'test'}],
        valuta: 'RSD'
      };
      return;
    }
    this.getAllArtikli(kalkulacija.id)
    this.kalkulacija = kalkulacija;
    this.troskoviNabavke = kalkulacija.troskoviNabavke.slice();
    this.trosakForm = [];
    this.troskoviNabavke.forEach(value => {
      this.trosakForm.push(this.formBuilder.group({
        naziv: [value.naziv, Validators.required],
        trosak: [value.cena, Validators.required]
      }))
    })

    this.isNewKalk = false;
    this.troskoviNabavke.push({naziv: '', cena: 0})
    this.trosakForm.push(this.formBuilder.group({
      naziv: ['', Validators.required],
      trosak: [0, Validators.required]
    }))
    console.log(this.trosakForm)
    console.log(this.troskoviNabavke)
    this.kalkForm = this.formBuilder.group({
      brojKalkulacije: [kalkulacija.brojKalkulacije, Validators.required],
      tipKalkulacije: [kalkulacija.tipKalkulacije, Validators.required],
      datum: [kalkulacija.datum, Validators.required],
      dobavljac: [kalkulacija.dobavljacId, Validators.required],
      lokacija: [kalkulacija.lokacija, Validators.required],
      troskoviNabavke: [this.trosakForm, Validators.required],
      valuta: [kalkulacija.valuta, Validators.required],
      komentar: [kalkulacija.komentar]
    })
    this.selected = true;
  }


  selectArt(artikal: KalkulacijaArtikal){
    if(this.artikal != null && this.artikal.artikalId === artikal.artikalId){
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
      return;
    }
    this.artikal = artikal;
    this.artForm = this.formBuilder.group({
      sifraArtikla: [artikal.sifraArtikla, Validators.required],
      nazivArtikla: [artikal.nazivArtikla, Validators.required],
      jedinicaMere: [artikal.jedinicaMere, Validators.required],
      kolicina: [artikal.kolicina, Validators.required],
      nabavnaCena: [artikal.nabavnaCena, Validators.required],
      rabatProcenat: [artikal.rabatProcenat, Validators.required],
      marzaProcenat: [artikal.marzaProcenat, Validators.required],
      porezProcenat: [artikal.porezProcenat],
      prodajnaCena: [artikal.prodajnaCena, Validators.required],
      kalkulacijaKonverzijaId: [''],
      rabat: [artikal.rabat],
      marza: [artikal.marza],
      porez: [artikal.porez],
      osnZaProd: [artikal.prodajnaOsnovica],
      unv: [artikal.ukupnaNabavnaVrednost],
      ncpr: [artikal.nabavnaCenaPosleRabata],
      osnovica: [artikal.osnovica],
      upv: [artikal.ukupnaProdajnaVrednost]
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
//       let index = -1;
//       for(let i = 0; i < this.kalkulacije.length; i++){
//         if(this.kalkulacije[i].id === id){
//           index = i;
//           break;
//         }
//         if(index !== -1){
//           this.kalkulacije.slice(index, 1);
//         }
//         window.location.reload();
//       }
        this.ngOnInit();
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

    if(brojKalkulacije !== "" && brojKalkulacije){
      filter += 'brojKalkulacije:' + brojKalkulacije + ',';
    }

    if(dobavljac !== "" && dobavljac){
      filter += 'dobavljacId:' + dobavljac + ',';
    }

    if(lokacija !== "" && lokacija){
      filter += 'lokacija_lokacijaId:' + lokacija.lokacijaId + ',';
    }

    if(datumOd !== "" && datumOd){
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

    if(datumDo !== "" && datumDo){
      let date = new Date(datumDo).getTime()/1000 + 86400;
      filter += 'datum<' + date + ',';
      if(datumOd === ""){
        filter += 'datum>' + 3600 + ',';
      }
    }

    if(nVrednost1 !== "" && nVrednost1){
      filter += 'nabavnaVrednost>' + nVrednost1 + ',';
      if(nVrednost2 === ""){
        filter += 'nabavnaVrednost<' + 9007199254740991 + ',';
      }
    }

    if(nVrednost2 !== "" && nVrednost2){
      filter += 'nabavnaVrednost<' + nVrednost2 + ',';
      if(nVrednost1 === ""){
        filter += 'nabavnaVrednost>' + 0 + ',';
      }
    }

    if(pVrednost1 !== "" && pVrednost1){
      filter += 'prodajnaCena>' + pVrednost1 + ',';
      if(pVrednost2 === ""){
        filter += 'prodajnaCena<' + 9007199254740991 + ',';
      }
    }

    if(pVrednost2 !== "" && pVrednost2){
      filter += 'prodajnaCena<' + pVrednost2 + ',';
      if(pVrednost1 === ""){
        filter += 'prodajnaCena>' + 0 + ',';
      }
    }

    if(komentar !== "" && komentar){
      filter+= 'komentar:' + komentar;
    }

    this.service.filterKalkulacije(filter.substring(0, filter.length-1)).subscribe(response => {
      this.kalkulacije = response.content;
    })

  }

  getCompanyName(id: number) {
    let comp;
    console.log(id)
    this.companies.forEach(value => {
        console.log(value)
        if(value.preduzeceId == id) {
          console.log("nasao " + value)
          comp = value;
        }

    })
    return comp;
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
    this.service.getAllArtikli(kalkulacijaId).subscribe( response => {
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
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.marza
    })
    return Math.round(sum * 100) / 100
  }

  sumProdajnaOsnovica() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.prodajnaOsnovica
    })
    return Math.round(sum * 100) / 100
  }

  sumPorez() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.porez
    })
    return Math.round(sum * 100) / 100
  }

  sumProdajnaCena() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.prodajnaCena
    })
    return Math.round(sum * 100) / 100
  }

  sumOsnovica() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.osnovica
    })
    return Math.round(sum * 100) / 100
  }

  sumUkupnaProdajnaVrednost() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.ukupnaProdajnaVrednost
    })
    return Math.round(sum * 100) / 100
  }

  createNewKalk(){
    if(!this.isNewKalk){
      this.selected = false;
      this.kalkulacija = {
        id: -1,
        brojKalkulacije: '1235',
        tipKalkulacije: 'test',
        datum: new Date().toLocaleDateString('it-IT'),
        dobavljacId: 1,
        fakturnaCena: 50,
        komentar: 'test',
        lokacija: this.lokacije[0],
        nabavnaVrednost: 1000,
        prodajnaVrednost: 2000,
        troskoviNabavke: [{ cena: 100, naziv: 'test'}, { cena: 200, naziv: 'test'}],
        valuta: 'RSD'
      };
    }
    this.kalkForm = this.formBuilder.group({
      brojKalkulacije: ['', Validators.required],
      tipKalkulacije: ['', Validators.required],
      datum: ['', Validators.required],
      dobavljac: ['', Validators.required],
      lokacija: ['', Validators.required],
      troskoviNabavke: [[], Validators.required],
      valuta: ['', Validators.required],
      komentar: ['']
    })
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
    let porezProcenat = this.artForm.get('porezProcenat')?.value;
    let rabatProcenat = this.artForm.get('rabatProcenat')?.value;
    let marzaProcenat = this.artForm.get('marzaProcenat')?.value;
    let kolicina = this.artForm.get('kolicina')?.value;
    if(rabatProcenat > 100){
      rabatProcenat = 100;
    }
    if(porezProcenat > 100){
      porezProcenat = 100;
    }
    if(marzaProcenat > 100){
      marzaProcenat = 100;
    }
    let rabat = nCena * (rabatProcenat / 100);
    let ncpr = nCena - rabat;
    let marza = ncpr * (marzaProcenat / 100);
    let unv = ncpr * kolicina;
    let osnZaProd = ncpr + marza;
    let porez = osnZaProd * (porezProcenat / 100);
    let osnovica = osnZaProd * kolicina;
    let prodajnaCena = osnZaProd + porez;
    let upv = prodajnaCena * kolicina;
    this.artForm.get('rabat')?.patchValue(rabat);
    this.artForm.get('ncpr')?.patchValue(ncpr);
    this.artForm.get('marza')?.patchValue(marza);
    this.artForm.get('unv')?.patchValue(unv);
    this.artForm.get('osnZaProd')?.patchValue(osnZaProd);
    this.artForm.get('porez')?.patchValue(porez);
    this.artForm.get('osnovica')?.patchValue(osnovica);
    this.artForm.get('prodajnaCena')?.patchValue(prodajnaCena);
    this.artForm.get('upv')?.patchValue(upv);
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
    let aktivanZaProdaju = this.artForm.get('zaProdaju')?.value
    let sifraArtikla = this.artForm.get('sifraArtikla')?.value
    let nazivArtikla = this.artForm.get('nazivArtikla')?.value
    let jedinicaMere = this.artForm.get('jedinicaMere')?.value
    let kolicina = this.artForm.get('kolicina')?.value
    let nabavnaCena = this.artForm.get('nabavnaCena')?.value
    let rabatProcenat = this.artForm.get('rabatProcenat')?.value
    let marzaProcenat = this.artForm.get('marzaProcenat')?.value
    let porezProcenat = this.artForm.get('porezProcenat')?.value
    let prodajnaCena = this.artForm.get('prodajnaCena')?.value
    let kalkulacijaKonverzijaId = this.kalkulacija.id
    this.service.createArtikal(aktivanZaProdaju, sifraArtikla, nazivArtikla, jedinicaMere, kolicina, nabavnaCena, rabatProcenat, marzaProcenat, porezProcenat, prodajnaCena, kalkulacijaKonverzijaId).subscribe(response => {
      this.artikli.push(response)
      this.isNewArt = false;
      this.ngOnInit()
    })
  }

  updateArt(id: number){
    let aktivanZaProdaju = this.artForm.get('zaProdaju')?.value
    let sifraArtikla = this.artForm.get('sifraArtikla')?.value
    let nazivArtikla = this.artForm.get('nazivArtikla')?.value
    let jedinicaMere = this.artForm.get('jedinicaMere')?.value
    let kolicina = this.artForm.get('kolicina')?.value
    let nabavnaCena = this.artForm.get('nabavnaCena')?.value
    let rabatProcenat = this.artForm.get('rabatProcenat')?.value
    let marzaProcenat = this.artForm.get('marzaProcenat')?.value
    let porezProcenat = this.artForm.get('porezProcenat')?.value
    let prodajnaCena = this.artForm.get('prodajnaCena')?.value
    let kalkulacijaKonverzijaId = this.kalkulacija.id
    this.service.updateArtikal(id, aktivanZaProdaju, sifraArtikla, nazivArtikla, jedinicaMere, kolicina, nabavnaCena, rabatProcenat, marzaProcenat, porezProcenat, prodajnaCena, kalkulacijaKonverzijaId).subscribe(response => {
      for(let i = 0; i < this.artikli.length; i++){
        if(this.artikli[i].artikalId === id){
          this.artikli[i] = response;
        }
      }
      this.selectedArt = false;
      this.ngOnInit()
    })
  }

  cancelNewArt(){
    this.isNewArt = false;
  }

  format(nabavnaVrednost: number) {
    return Math.round(nabavnaVrednost * 100) / 100
  }
}

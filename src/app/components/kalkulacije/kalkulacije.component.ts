import {Component, OnInit} from '@angular/core';
import {KalkulacijaArtikal, KalkulacijeModel, Lokacija, TrosakNabavke} from "../../shared/kalkulacije.model";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Company} from "../../shared/invoice.model";
import {KalkulacijeService} from "../../services/kalkulacije/kalkulacije.service";
import {InvoiceService} from "../../services/invoice/invoice.service";

@Component({
  selector: 'app-kalkulacije',
  templateUrl: './kalkulacije.component.html',
  styleUrls: ['./kalkulacije.component.css']
})
export class KalkulacijeComponent implements OnInit {

  kalkulacije: KalkulacijeModel[] = [];

  artikli: KalkulacijaArtikal[] = [];

  troskoviNabavke: TrosakNabavke[] = [];

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

  constructor(private formBuilder: FormBuilder, private service: KalkulacijeService, private serviceComp: InvoiceService) {
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
      zaProdaju: ['', Validators.required],
      sifraArtikla: ['', Validators.required],
      nazivArtikla: ['', Validators.required],
      jedinicaMere: ['', Validators.required],
      kolicina: ['', Validators.required],
      nabavnaCena: ['', Validators.required],
      rabatProcenat: ['', Validators.required],
      marzaProcenat: ['', Validators.required],
      porezProcenat: ['', Validators.required],
      prodajnaCena: ['', Validators.required],
      kalkulacijaKonverzijaId: [''],
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

    this.kalkulacije.push({
        kalkulacijaId: 1,
        brojKalkulacije: '1235',
        tipKalkulacije: 'VP',
        datum: new Date().toLocaleDateString('it-IT'),
        dobavljacId: 1,
        fakturnaCena: 50,
        komentar: 'test',
        lokacijaId: 1,
        nabavnaVrednost: 1000,
        prodajnaVrednost: 2000,
        troskoviNabavke: [{trosakId: 1, trosak: 100, naziv: 'test'}, {trosakId: 2, trosak: 200, naziv: 'test'}],
        valuta: 'RSD'
      },

      {
        kalkulacijaId: 2,
        brojKalkulacije: '123115',
        tipKalkulacije: 'MP',
        datum: new Date().toLocaleDateString('it-IT'),
        dobavljacId: 2,
        fakturnaCena: 55,
        komentar: 'test1',
        lokacijaId: 2,
        nabavnaVrednost: 1111,
        prodajnaVrednost: 2222,
        troskoviNabavke: [{trosakId: 2, trosak: 157, naziv: 'test'}, {trosakId: 3, trosak: 111, naziv: 'test'}],
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
        kalkulacijaId: -1,
        brojKalkulacije: '1235',
        tipKalkulacije: 'test',
        datum: new Date().toLocaleDateString('it-IT'),
        dobavljacId: 1,
        fakturnaCena: 50,
        komentar: 'test',
        lokacijaId: 1,
        nabavnaVrednost: 1000,
        prodajnaVrednost: 2000,
        troskoviNabavke: [{trosakId: 1, trosak: 100, naziv: 'test'}, {trosakId: 2, trosak: 200, naziv: 'test'}],
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

    this.troskoviNabavke.push({naziv: '', trosak: 0, trosakId: this.ind++})
    this.trosakForm.push(this.formBuilder.group({
      naziv: ['', Validators.required],
      trosak: ['', Validators.required]
    }))
  }

  ngOnInit(): void {
    this.getAllKalkulacije();
    this.serviceComp.svaPreduzeca().subscribe(response => {
      this.companies = response;
    })
    this.service.getAllLokacije().subscribe(response => {
      this.lokacije = response;
    })
  }


  sumTroskoviNabavke(kalkulacija: KalkulacijeModel) {
    let sum = 0;
    for (let i = 0; i < kalkulacija.troskoviNabavke.length; i++) {
      sum += kalkulacija.troskoviNabavke[i].trosak;
    }
    return sum;
  }

  getAsDate(datum: string) {
    return new Date(datum).toLocaleDateString('it-IT');
  }

  cancelNewKalk(){
    this.isNewKalk = false;
  }



  noviTrosak(){
    this.troskoviNabavke.push({naziv: '', trosak: 0, trosakId: this.ind++})
    this.trosakForm.push(this.formBuilder.group({
      naziv: ['', Validators.required],
      trosak: ['', Validators.required]
    }))
  }

  select(kalkulacija: KalkulacijeModel){
    if(this.kalkulacija != null && this.kalkulacija.kalkulacijaId === kalkulacija.kalkulacijaId){
      this.selected = false;
      this.kalkulacija = {
        kalkulacijaId: -1,
        brojKalkulacije: '1235',
        tipKalkulacije: 'VP',
        datum: new Date().toLocaleDateString('it-IT'),
        dobavljacId: 1,
        fakturnaCena: 50,
        komentar: 'test',
        lokacijaId: 1,
        nabavnaVrednost: 1000,
        prodajnaVrednost: 2000,
        troskoviNabavke: [{trosakId: 1, trosak: 100, naziv: 'test'}, {trosakId: 2, trosak: 200, naziv: 'test'}],
        valuta: 'RSD'
      };
      return;
    }
    this.getAllArtikli(kalkulacija.kalkulacijaId)
    this.kalkulacija = kalkulacija;
    this.kalkForm = this.formBuilder.group({
      brojKalkulacije: [kalkulacija.brojKalkulacije, Validators.required],
      tipKalkulacije: [kalkulacija.tipKalkulacije, Validators.required],
      datum: [kalkulacija.datum, Validators.required],
      dobavljac: [kalkulacija.dobavljacId, Validators.required],
      lokacija: [kalkulacija.lokacijaId, Validators.required],
      troskoviNabavke: [[], Validators.required],
      valuta: [kalkulacija.valuta, Validators.required],
      komentar: [kalkulacija.komentar]
    })
    this.isNewKalk = false;
    this.trosakForm = [];
    this.troskoviNabavke = [];
    this.troskoviNabavke.push({naziv: '', trosak: 0, trosakId: this.ind++})
    this.trosakForm.push(this.formBuilder.group({
      naziv: ['', Validators.required],
      trosak: ['', Validators.required]
    }))
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
      zaProdaju: ['true', Validators.required],
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
    })
    this.isNewArt = false;
    this.selectedArt = true;
  }

  deleteKalkulacija(id: number){
    this.service.deleteKalkulacija(id).subscribe( value => {
      let index = -1;
      for(let i = 0; i < this.kalkulacije.length; i++){
        if(this.kalkulacije[i].kalkulacijaId === id){
          index = i;
          break;
        }
        if(index !== -1){
          this.kalkulacije.slice(index, 1);
        }
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

    if(brojKalkulacije !== null){
      filter += 'brojKalkulacije:' + brojKalkulacije + ',';
    }

    if(dobavljac !== null){
      filter += 'dobavljacId:' + dobavljac + ',';
    }

    if(lokacija !== null){
      filter += 'lokacijaId:' + lokacija + ',';
    }

    if(datumOd !== null){
      filter += 'datum>' + datumOd + ',';
      if(datumDo === null){
        filter += 'datum<' + new Date().getMilliseconds()/1000 + ',';
      }
    }

    if(datumDo !== null){
      filter += 'datum<' + datumOd + ',';
      if(datumOd === null){
        filter += 'datum>' + 3600 + ',';
      }
    }

    if(nVrednost1 !== null){
      filter += 'nabavnaVrednost>' + nVrednost1 + ',';
      if(nVrednost2 === null){
        filter += 'nabavnaVrednost<' + Number.MAX_SAFE_INTEGER + ',';
      }
    }

    if(nVrednost2 !== null){
      filter += 'nabavnaVrednost<' + nVrednost2 + ',';
      if(nVrednost1 === null){
        filter += 'nabavnaVrednost>' + 0 + ',';
      }
    }

    if(pVrednost1 !== null){
      filter += 'prodajnaVrednost>' + pVrednost1 + ',';
      if(pVrednost2 === null){
        filter += 'prodajnaVrednost<' + Number.MAX_SAFE_INTEGER + ',';
      }
    }

    if(pVrednost2 !== null){
      filter += 'nabavnaVrednost<' + pVrednost2 + ',';
      if(pVrednost1 === null){
        filter += 'nabavnaVrednost>' + 0 + ',';
      }
    }

    if(komentar !== null){
      filter+= 'komentar:' + komentar;
    }

    this.service.filterKalkulacije(filter).subscribe(response => {
      this.kalkulacije = response;
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
    })
  }

  getAllKalkulacije(){
    this.service.getAllKalkulacije().subscribe( response => {
      this.kalkulacije = response;
    })
  }

  getAllArtikli(kalkulacijaId: number){
    this.service.getAllArtikli(kalkulacijaId).subscribe( response => {
      this.artikli = response;
    })
  }


  sumKolicina() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.kolicina
    })
    return sum;
  }

  sumNabavnaCena() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.nabavnaCena
    })
    return sum;
  }

  sumRabat() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.rabat
    })
    return sum;
  }

  sumNabavnaCenaPosleRabata() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.nabavnaCenaPosleRabata
    })
    return sum;
  }

  sumUkupnaNabavnaVrednost() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.ukupnaNabavnaVrednost
    })
    return sum;
  }

  sumMarza() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.marza
    })
    return sum;
  }

  sumProdajnaOsnovica() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.prodajnaOsnovica
    })
    return sum;
  }

  sumPorez() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.porez
    })
    return sum;
  }

  sumProdajnaCena() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.prodajnaCena
    })
    return sum;
  }

  sumOsnovica() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.osnovica
    })
    return sum;
  }

  sumUkupnaProdajnaVrednost() {
    let sum = 0;
    this.artikli.forEach( value => {
      sum+= value.ukupnaProdajnaVrednost
    })
    return sum;
  }

  createNewKalk(){
    if(!this.isNewKalk){
      this.selected = false;
      this.kalkulacija = {
        kalkulacijaId: -1,
        brojKalkulacije: '1235',
        tipKalkulacije: 'test',
        datum: new Date().toLocaleDateString('it-IT'),
        dobavljacId: 1,
        fakturnaCena: 50,
        komentar: 'test',
        lokacijaId: 1,
        nabavnaVrednost: 1000,
        prodajnaVrednost: 2000,
        troskoviNabavke: [{trosakId: 1, trosak: 100, naziv: 'test'}, {trosakId: 2, trosak: 200, naziv: 'test'}],
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
    this.troskoviNabavke.push({naziv: '', trosak: 0, trosakId: this.ind++})
    this.trosakForm.push(this.formBuilder.group({
      naziv: ['', Validators.required],
      trosak: ['', Validators.required]
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
      zaProdaju: ['', Validators.required],
      sifraArtikla: ['', Validators.required],
      nazivArtikla: ['', Validators.required],
      jedinicaMere: ['', Validators.required],
      kolicina: ['', Validators.required],
      nabavnaCena: ['', Validators.required],
      rabatProcenat: ['', Validators.required],
      marzaProcenat: ['', Validators.required],
      porezProcenat: ['', Validators.required],
      prodajnaCena: ['', Validators.required],
      kalkulacijaKonverzijaId: [''],
    })
    this.isNewArt = true;
  }

  createNewKalkApi(){
    let brojKalkulacije = this.kalkForm.get('brojKalkulacije')?.value
    let tipKalkulacije = this.kalkForm.get('tipKalkulacije')?.value
    let datum = this.kalkForm.get('datum')?.value
    let dobavljacId = this.kalkForm.get('dobavljacId')?.value
    let lokacijaId = this.kalkForm.get('lokacijaId')?.value
    let troskoviNabavke = this.troskoviNabavke;
    let valuta = this.kalkForm.get('valuta')?.value
    let komentar = this.kalkForm.get('komentar')?.value
    this.service.createKalkulacija(brojKalkulacije, tipKalkulacije, datum, dobavljacId, lokacijaId, troskoviNabavke, valuta, komentar).subscribe(response => {
      this.kalkulacije.push(response)
      this.isNewKalk = false;
    })
  }

  updateKalk(id: number){
    let brojKalkulacije = this.kalkForm.get('brojKalkulacije')?.value
    let tipKalkulacije = this.kalkForm.get('tipKalkulacije')?.value
    let datum = this.kalkForm.get('datum')?.value
    let dobavljacId = this.kalkForm.get('dobavljacId')?.value
    let lokacijaId = this.kalkForm.get('lokacijaId')?.value
    let troskoviNabavke = this.troskoviNabavke;
    let valuta = this.kalkForm.get('valuta')?.value
    let komentar = this.kalkForm.get('komentar')?.value
    this.service.updateKalkulacija(id, brojKalkulacije, tipKalkulacije, datum, dobavljacId, lokacijaId, troskoviNabavke, valuta, komentar).subscribe(response => {
      for(let i = 0; i < this.kalkulacije.length; i++){
        if(this.kalkulacije[i].kalkulacijaId === id){
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
    let kalkulacijaKonverzijaId = this.kalkulacija.kalkulacijaId
    this.service.createArtikal(aktivanZaProdaju, sifraArtikla, nazivArtikla, jedinicaMere, kolicina, nabavnaCena, rabatProcenat, marzaProcenat, porezProcenat, prodajnaCena, kalkulacijaKonverzijaId).subscribe(response => {
      this.artikli.push(response)
      this.isNewArt = false;
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
    let kalkulacijaKonverzijaId = this.kalkulacija.kalkulacijaId
    this.service.updateArtikal(id, aktivanZaProdaju, sifraArtikla, nazivArtikla, jedinicaMere, kolicina, nabavnaCena, rabatProcenat, marzaProcenat, porezProcenat, prodajnaCena, kalkulacijaKonverzijaId).subscribe(response => {
      for(let i = 0; i < this.artikli.length; i++){
        if(this.artikli[i].artikalId === id){
          this.artikli[i] = response;
        }
      }
      this.selectedArt = false;
    })
  }

  cancelNewArt(){
    this.isNewArt = false;
  }

}

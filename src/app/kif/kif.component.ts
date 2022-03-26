import { Component, OnInit } from '@angular/core';
import {Faktura, Preduzece} from "../../model/model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FakturaService} from "../faktura.service";

@Component({
  selector: 'app-kif',
  templateUrl: './kif.component.html',
  styleUrls: ['./kif.component.css']
})
export class KifComponent implements OnInit {

  filterGroup: FormGroup;
  updateGroup: FormGroup;
  vrednost: string = '';

  constructor(private formBuilder: FormBuilder, private service: FakturaService) {
    this.filterGroup = this.formBuilder.group({
      pretraga: ['', [Validators.required]],
      vrednost: ['', [Validators.required]]
    });
    this.updateGroup = this.formBuilder.group({
      brojFakture: [this.selektovanaFaktura.brojFakture],
      datumIzdavanja: [this.selektovanaFaktura.datumIzdavanja],
      komitent: [this.selektovanaFaktura.preduzece.naziv, [Validators.required]],
      datumPlacanja: [this.selektovanaFaktura.datumPlacanja],
      prodajnaVrednost: [this.selektovanaFaktura.prodajnaVrednost,],
      rabatProcenat: [this.selektovanaFaktura.rabatProcenat,],
      porezProcenat: [this.selektovanaFaktura.porezProcenat,],
      valuta: [this.selektovanaFaktura.valuta, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      kurs: [this.selektovanaFaktura.kurs],
      naplata: [this.selektovanaFaktura.naplata, [Validators.required]],
      komentar: [this.selektovanaFaktura.komentar],
    });
  }

  inputAsDate: string = 'text';
  input: string = '';


  preduzece1: Preduzece = new Preduzece("test1");
  preduzece2: Preduzece = new Preduzece("test2");

  preduzeca: Preduzece[] = [this.preduzece1, this.preduzece2];


  faktura1: Faktura = new Faktura(1,"3", new Date(), new Preduzece("NEBITNO"), new Date(), 10000, 0,
    5, 500, 10500, 10500, "DIN", 1, 10500, "Komentar", "IZLAZNA_FAKTURA");

  faktura2: Faktura = new Faktura(2,"4", new Date(), new Preduzece("NEBITNO"), new Date(), 10000, 0,
    5, 500, 10500, 10500, "DIN", 1, 10500, "Komentar", "IZLAZNA_FAKTURA");

  kif : Faktura[] = [this.faktura1, this.faktura2];

  selektovanaFaktura: Faktura = this.kif[0];


  edit: boolean = false;


  ngOnInit(): void {
    this.service.svaPreduzeca().subscribe((preduzeca) =>{
      this.preduzeca = preduzeca;
    });

    this.service.sveFakture().subscribe((fakture) =>{
      this.kif = fakture.filter((element) => { element.tipFakture === 'IZLAZNA_FAKTURA'});
    });
  }

  setInputAsDate() {
    if (this.input.startsWith('datum')) {
      this.inputAsDate = 'date';
    } else {
      this.inputAsDate = 'text';
      this.vrednost = '';
    }
  }

  ukupnaProdajnaVrednost() {
    let totalSum = 0;
    this.kif.forEach(function (value) {
      totalSum += value.prodajnaVrednost;
    });
    return totalSum;
  }

  ukupanRabat() {
    let totalSum = 0;
    this.kif.forEach(function (value) {
      let rabatAct = value.rabat * value.kurs;
      totalSum += rabatAct;
    });
    return totalSum;
  }

  ukupanPorez() {
    let totalSum = 0;
    this.kif.forEach(function (value) {
      totalSum += value.porez;
    });
    return totalSum;
  }

  ukupnoNaplata() {
    let totalSum = 0;
    this.kif.forEach(function (value) {
      totalSum += value.naplata;
    });
    return totalSum;
  }

  datumPlacanja(faktura: Faktura) {
    let day = faktura.datumPlacanja.getDate();
    let month = faktura.datumIzdavanja.getMonth() + 1;
    let year = faktura.datumPlacanja.getFullYear();
    return day + "/" + month + "/" + year;
  }

  datumIzdavanja(faktura: Faktura) {
    let day = faktura.datumIzdavanja.getDate();
    let month = faktura.datumIzdavanja.getMonth() + 1;
    let year = faktura.datumIzdavanja.getFullYear();
    return day + "/" + month + "/" + year;
  }

  setEditable(faktura: Faktura) {
    this.selektovanaFaktura = faktura;
    if (faktura.editable) {
      faktura.editable = false;
      this.edit = false;
    } else {
      faktura.editable = true;
      this.edit = true;
      this.kif.forEach(function (value) {
        if (value !== faktura)
          value.editable = false;
      });
    }
  }

  filterKIF() {
    let filter = this.filterGroup.get('pretraga')?.value;
    let vrednost = this.filterGroup.get('vrednost')?.value;
    console.log(filter)
    console.log(vrednost)
    //provera unosa
    if (filter === 'komitent') {
      let proveraVrednosti = parseInt(vrednost);
      if (isNaN(proveraVrednosti)) {
        alert("Morate uneti broj kako bi pretrazili po komitentu")
        return;
      }
    } else if (filter.startsWith('datum')) {
      let proveraVrednosti = new Date(vrednost);
      if (isNaN(proveraVrednosti.getDate())) {
        alert("Morate uneti pravilan datum");
        return;
      }
    } else if (filter === 'valuta') {
      if (vrednost.length != 3) {
        alert("Valuta mora sadrzati tacno 3 karaktera");
        return;
      }
    }
    this.service.filterKIF(filter, vrednost).subscribe((fakture) =>{
      this.kif = fakture;
    });
  }

  alphaOnly(e : any) {
    var regex = new RegExp("^[A-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  }

  sacuvaj(){
    let brojFakture = this.updateGroup.get('brFakture')?.value;
    let datumIzdavanja = this.updateGroup.get('datumIzdavanja')?.value;
    let komitent = this.updateGroup.get('komitent')?.value;
    let datumPlacanja = this.updateGroup.get('datumPlacanja')?.value;
    let prodajnaVrednost = this.updateGroup.get('brFakture')?.value;
    let rabatProcenat = this.updateGroup.get('brFakture')?.value;
    let porezProcenat = this.updateGroup.get('brFakture')?.value;
    let valuta = this.updateGroup.get('brFakture')?.value;
    let kurs = this.updateGroup.get('brFakture')?.value;
    let naplata = this.updateGroup.get('brFakture')?.value;
    let komentar = this.updateGroup.get('brFakture')?.value;
    //provera
    if(brojFakture.length != 0){
      this.selektovanaFaktura.brojFakture = brojFakture;
    }
    this.selektovanaFaktura.datumIzdavanja = datumIzdavanja;
    this.selektovanaFaktura.preduzece = komitent;
    this.selektovanaFaktura.datumPlacanja = datumPlacanja;
    this.selektovanaFaktura.prodajnaVrednost = prodajnaVrednost;

    if(rabatProcenat != 0){
      this.selektovanaFaktura.rabatProcenat = rabatProcenat;
    }else{
      this.selektovanaFaktura.rabatProcenat = 0;
    }

    if(porezProcenat != 0){
      this.selektovanaFaktura.porezProcenat = porezProcenat;
    }else{
      this.selektovanaFaktura.porezProcenat = 0;
    }

    if(!this.alphaOnly(valuta)){
      alert('Valuta ne moze sadrzti brojeve!');
    }
    this.selektovanaFaktura.valuta = valuta;
    this.selektovanaFaktura.kurs = parseFloat(kurs.toFixed(2));
    this.selektovanaFaktura.naplata = naplata;
    this.selektovanaFaktura.komentar = komentar;

    this.service.izmeniFakturu(this.selektovanaFaktura).subscribe( (response) => {
      if(response.ok){
        this.ngOnInit();
      }else{
        alert('Nemate potrebnu autorizaciju');
      }
    })
  }

  delete(faktura : Faktura){
    this.service.obrisiFakturu(faktura.fakturaId).subscribe( (response) => {
      if(response.ok){
        this.ngOnInit();
      }else{
        alert('Nemate potrebnu autorizaciju');
      }
    })
  }

}

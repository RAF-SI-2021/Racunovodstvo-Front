import { Component, OnInit } from '@angular/core';
import {Artikal, Konverzija, Lokacija, Preduzece} from "../../shared/konverzija.model";
import {KonverzijaService} from "../../services/konverzija/konverzija.service";
import {Form, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-konverzija',
  templateUrl: './konverzija.component.html',
  styleUrls: ['./konverzija.component.css']
})
export class KonverzijaComponent implements OnInit {
  addingForm: FormGroup;
  konverzije: Konverzija[] = [];
  lokacije: Lokacija[] = [];
  dobavljaci: Preduzece[] = [];
  artikli: Artikal[] = [];
  lokacijaNaziv: string = '';
  lokacijaAdresa: string = '';
  hiddenArtikli: boolean = true;
  addingFormArtikal: FormGroup;

  constructor(
    private konverzijaService: KonverzijaService,
    private formBuilder: FormBuilder,

  ) {
    this.addingForm = this.formBuilder.group({
      brojKonverzije: ['', Validators.required],
      datum: [new Date(), Validators.required],
      dobavljac: ['', Validators.required],
      lokacija: ['', Validators.required],
      konverzije: ['', Validators.required],
      troskoviNabavke: [this.formBuilder.array([]), Validators.required],
      fakturnaCena: [0, Validators.required],
      nabavnaVrednost: ['', Validators.required],
      valuta: ['', Validators.minLength(3), Validators.maxLength(3)],
      komentar: ['']
    });

    this.addingFormArtikal = this.formBuilder.group({
      sifraArtikla: ['', Validators.required],
      nazivArtikla: ['', Validators.required],
      jedinicaMere: ['', Validators.required],
      kolicina: [0, Validators.required],
      nabavnaCena: [0, Validators.required],
      rabatProcenat: [0, Validators.min(0), Validators.max(100)],
      rabat: [0, Validators.required], // live
      nabavnaCenaPosleRabata: [0, Validators.required], // live
      ukupnaNabavnaVrednost: [0, Validators.required], // live
    })
  }

  troskoviNabavke(): FormArray{
    return this.addingForm.get('troskoviNabavke') as FormArray;
  }

  newTrosakNabavke(): FormGroup{
    return this.formBuilder.group({
      opis:'',
      cena:0
    })
  }

  addTrosakNabavke(){
    this.troskoviNabavke().push(this.newTrosakNabavke());
  }

  removeTrosak(i:number){
    this.troskoviNabavke().removeAt(i);
  }

  ngOnInit(): void {
    this.restartParameters();
    this.konverzijaService.getKonverzije().subscribe(konverzije =>{
      this.konverzije = konverzije;

      /// za svaku konverziju setujem dobavljaca (naziv)
      this.konverzijaService.getKomitenti().subscribe(komitenti=>{
        this.dobavljaci = komitenti;

        for(let j =0; j<konverzije.length; j++){

          for(let i =0; i< komitenti.length; i++){
            if(komitenti[i].preduzeceId == konverzije[j].dobavljacId){
              konverzije[j].nazivDobavljaca = komitenti[i].naziv;
            }
          }
        }
      })


      /// za svaku konverziju setujem lokaciju (naziv i adresu)
      this.konverzijaService.getLokacije().subscribe(lokacije=>{
        this.lokacije = lokacije;

        // ToDo mislim da ne treba jer vec dobijam lokaciju u get pozivu?
        for(let j = 0; j<konverzije.length; j++) {

          for (let i = 0; i < lokacije.length; i++) {
            if (lokacije[i].lokacijaId == konverzije[j].lokacjaId) {
              konverzije[j].nazivLokacija = lokacije[i].naziv;
              konverzije[j].adresaLokacije = lokacije[i].adresa;
            }
          }
        }
      })




    });

  }

  delete(idKonverzije: number) {
    this.konverzijaService.deleteKonverzija(idKonverzije).subscribe(any=>{
      for(let i =0; i<this.konverzije.length; i++){
        if(this.konverzije[i].konverzijaId == idKonverzije){
          this.konverzije.splice(i, 1);
        }
      }
    });
  }

  prikaziArtikle(konverzijaId: number) {
    if(this.hiddenArtikli == true){
      this.hiddenArtikli = false;
      this.konverzijaService.getArtikli(konverzijaId).subscribe(artikli =>{
        this.artikli = artikli;
      })
    }else{
      this.artikli = [];
      this.hiddenArtikli = true;
    }
  }

  restartParameters(){
    this.hiddenArtikli = true;
    this.artikli = [];
    this.konverzije = [];
    this.lokacije = [];
    this.dobavljaci = [];
  }

  dodajKonverziju() {
    if(this.lokacijaNaziv != '' && this.lokacijaAdresa != ''){
      this.addingForm.setValue({lokacija: this.lokacijaAdresa + ' ' + this.lokacijaNaziv});
    }

    console.log(this.addingForm.value);

    this.konverzijaService.postKonverzija({
      // @ts-ignore
      brojKonverzije: this.addingForm.get('brojKonverzije'),
      // @ts-ignore
      datum: this.addingForm.get('datum'),
      // @ts-ignore
      dobavljacId: this.addingForm.get('dobavljacId'),
      // @ts-ignore
      lokacjaId: this.addingForm.get('lokacjaId'),
      // @ts-ignore
      troskoviNabavke: this.addingForm.get('troskoviNabavke'),
      // @ts-ignore
      fakturnaCena: this.addingForm.get('fakturnaCena'),
      // @ts-ignore
      nabavnaVrednost: this.addingForm.get('nabavnaVrednost'),
      // @ts-ignore
      valuta: this.addingForm.get('valuta'),
      // @ts-ignore
      komentar: this.addingForm.get('komentar'),

    }).subscribe(konverzija=>{
      this.konverzije.push(konverzija)
    })
  }

  dodajArtikal(idKonverzije: number){
    this.konverzijaService.postArtikal(idKonverzije, {
      // @ts-ignore
      sifraArtikla:this.addingFormArtikal.get('sifraArtikla'),
      // @ts-ignore
      nazivArtikla:this.addingFormArtikal.get('nazivArtikla'),
      // @ts-ignore
      jedinicaMere:this.addingFormArtikal.get('jedinicaMere'),
      // @ts-ignore
      kolicina:this.addingFormArtikal.get('kolicina'),
      // @ts-ignore
      nabavnaCena:this.addingFormArtikal.get('nabavnaCena'),
      // @ts-ignore
      rabatProcenat:this.addingFormArtikal.get('rabatProcenat'),
      // @ts-ignore
      rabat:this.addingFormArtikal.get('rabat'),
      // @ts-ignore
      nabavnaCenaPosleRabata:this.addingFormArtikal.get('nabavnaCenaPosleRabata'),
      // @ts-ignore
      ukupnaNabavnaVrednost:this.addingFormArtikal.get('ukupnaNabavnaVrednost'),
      // @ts-ignore
      konverzijaId:this.addingFormArtikal.get('konverzijaId'),
    }).subscribe(artikal =>{
      this.artikli.push(artikal);
    })
  }

  changed() {
    let troskoviNabavke = 0;
    for(let i =0; i < this.troskoviNabavke().length; i++){
      // @ts-ignore
      troskoviNabavke += this.troskoviNabavke().get(i).get('cena');
    }
    // @ts-ignore
    this.addingForm.setValue({nabavnaVrednost: troskoviNabavke + this.addingForm.get('fakturnaCena')})

  }

  changedArtikal(konverzijaId: number) {
    // @ts-ignore
    this.addingFormArtikal.setValue({rabat: this.addingFormArtikal.get('nabavnaCena') * (this.addingFormArtikal.get('rabatProcenat')/100)})
    // @ts-ignore
    this.addingFormArtikal.setValue({nabavnaCenaPosleRabata: this.addingFormArtikal.get('nabavnaCena') - this.addingFormArtikal.get('rabat')})
    // @ts-ignore
    this.addingFormArtikal.setValue({ukupnaNabavnaVrednost: this.addingFormArtikal.get('nabavnaCenaPosleRabata') * this.addingFormArtikal.get('kolicina')})


    let zbir = 0;
    for(let i = 0; i<this.artikli.length; i++){
      zbir += this.artikli[i].ukupnaNabavnaVrednost;
    }
    // @ts-ignore
    zbir += this.addingFormArtikal.get('ukupnaNabavnaVrednost');

    this.addingForm.setValue({fakturnaCena:zbir});
  }
}

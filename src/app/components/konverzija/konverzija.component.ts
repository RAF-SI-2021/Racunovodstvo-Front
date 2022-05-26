import {Component, OnInit} from '@angular/core';
import {Artikal, Konverzija, Lokacija, Preduzece} from "../../shared/konverzija.model";
import {KonverzijaService} from "../../services/konverzija/konverzija.service";
import {Form, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs";

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
  shownIndex: number = -1;
  errorMessage: string = '';

  constructor(
    private konverzijaService: KonverzijaService,
    private formBuilder: FormBuilder,
  ) {
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

    this.addingFormArtikal = this.formBuilder.group({
      sifraArtikla: ['', Validators.required],
      nazivArtikla: ['', Validators.required],
      jedinicaMere: ['', Validators.required],
      kolicina: [0, Validators.required],
      nabavnaCena: [0, Validators.required],
      rabatProcenat: [0, [Validators.min(0), Validators.max(100)]],
      rabat: [0, Validators.required], // live
      nabavnaCenaPosleRabata: [0, Validators.required], // live
      ukupnaNabavnaVrednost: [0, Validators.required], // live
    })

    this.addingFormArtikal.controls['rabat'].disable();
    this.addingFormArtikal.controls['nabavnaCenaPosleRabata'].disable();
    this.addingFormArtikal.controls['ukupnaNabavnaVrednost'].disable();

  }

  get troskoviNabavke(): FormArray {
    return this.addingForm.controls['troskoviNabavke'] as FormArray;
  }

  newTrosakNabavke(): FormGroup {
    return this.formBuilder.group({
      naziv: ['', Validators.required],
      cena: [0, Validators.required]
    })
  }

  addTrosakNabavke() {
    this.troskoviNabavke.push(this.newTrosakNabavke());
  }

  removeTrosak(i: number) {
    this.troskoviNabavke.removeAt(i);
  }

  ngOnInit(): void {

    this.restartParameters();
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
      return this.konverzijaService.getLokacije()
    })).subscribe(lokacije => {


      /// za svaku konverziju setujem lokaciju (naziv i adresu)
      this.lokacije = lokacije;

      // ToDo mislim da ne treba jer vec dobijam lokaciju u get pozivu?
      for (let j = 0; j < this.konverzije.length; j++) {

        for (let i = 0; i < lokacije.length; i++) {
          if (lokacije[i].lokacijaId == this.konverzije[j].lokacija.lokacijaId) {
            this.konverzije[j].lokacija.naziv = lokacije[i].naziv;
            this.konverzije[j].lokacija.adresa = lokacije[i].adresa;
          }
        }
      }


    });

  }

  delete(idKonverzije: number) {
    this.konverzijaService.deleteKonverzija(idKonverzije).subscribe(any => {
      alert("OBRISAO")
      for (let i = 0; i < this.konverzije.length; i++) {
        if (this.konverzije[i].konverzijaId == idKonverzije) {
          this.konverzije.splice(i, 1);
          this.artikli = []
        }
      }
    });
  }

  prikaziArtikle(index: number) {
    let konverzija = this.konverzije[index];
    if (index == this.shownIndex) {
      this.shownIndex = -1;
      this.artikli = [];
    } else {
      this.shownIndex = index;
      this.konverzijaService.getArtikli(konverzija.konverzijaId).subscribe(artikli => {
        this.artikli = artikli.content;
      })
    }

    // if (konverzija.hidden) {
    //   konverzija.hidden = false;

    // } else {
    //   this.artikli = [];
    //   konverzija.hidden = true;
    // }
  }

  restartParameters() {
    this.hiddenArtikli = true;
    this.artikli = [];
    this.konverzije = [];
    this.lokacije = [];
    this.dobavljaci = [];
  }

  dodajKonverziju() {
    if (this.addingForm.invalid){
        this.errorMessage = 'Forma nije popunjena'
        return;
    }
    this.errorMessage = ''

    let lokacija : Lokacija = {}
    lokacija.naziv = this.addingForm.get('nazivLokacije')?.value
    lokacija.adresa = this.addingForm.get('adresaLokacije')?.value
    lokacija.lokacijaId = this.addingForm.get('lokacija')?.value

    // @ts-ignore
    this.konverzijaService.postKonverzija({
      brojKonverzije: this.addingForm.get('brojKonverzije')?.value,
      datum: this.addingForm.get('datum')?.value,
      dobavljacId: this.addingForm.get('dobavljac')?.value,
      lokacija,
      troskoviNabavke: this.addingForm.get('troskoviNabavke')?.value,
      fakturnaCena: this.addingForm.get('fakturnaCena')?.value,
      nabavnaVrednost: this.addingForm.get('nabavnaVrednost')?.value,
      valuta: this.addingForm.get('valuta')?.value,
      komentar: this.addingForm.get('komentar')?.value
    }).subscribe(konverzija => {
      this.konverzije.push(konverzija)
    })
  }

  dodajArtikal(idKonverzije: number) {
    // @ts-ignore
    this.konverzijaService.postArtikal( {
      sifraArtikla: this.addingFormArtikal.get('sifraArtikla')?.value,
      nazivArtikla: this.addingFormArtikal.get('nazivArtikla')?.value,
      jedinicaMere: this.addingFormArtikal.get('jedinicaMere')?.value,
      kolicina: this.addingFormArtikal.get('kolicina')?.value,
      nabavnaCena: this.addingFormArtikal.get('nabavnaCena')?.value,
      rabatProcenat: this.addingFormArtikal.get('rabatProcenat')?.value,
      rabat: this.addingFormArtikal.get('rabat')?.value,
      nabavnaCenaPosleRabata: this.addingFormArtikal.get('nabavnaCenaPosleRabata')?.value,
      ukupnaNabavnaVrednost: this.addingFormArtikal.get('ukupnaNabavnaVrednost')?.value,
      konverzijaKalkulacijaId: idKonverzije,
    }).subscribe(artikal => {
      this.artikli.push(artikal);
    })
  }

  // changed() {
  //   let troskoviNabavke = 0;
  //   for (let i = 0; i < this.troskoviNabavke.length; i++) {
  //     troskoviNabavke += this.troskoviNabavke.get(i).get('cena').value;
  //   }
  //   // @ts-ignore
  //   this.addingForm.setValue({nabavnaVrednost: troskoviNabavke + this.addingForm.get('fakturnaCena')})
  //
  // }

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

  sacuvajTrosak(i: number) {
    let sum = 0;
    for(let i = 0; i<this.troskoviNabavke.controls.length; i++){
      sum += parseInt(this.troskoviNabavke.controls[i].get('cena')?.value);
    }
    console.log(sum)
    // console.log(this.troskoviNabavke.controls[i].get('cena')?.value)
    // console.log(this.troskoviNabavke.controls[i].get('naziv')?.value)

  }

  saberi() {
    let sum = 0;
    for(let i = 0; i<this.troskoviNabavke.controls.length; i++){
      sum += parseInt(this.troskoviNabavke.controls[i].get('cena')?.value);
    }
    this.addingForm.get('nabavnaVrednost')?.setValue(sum);
  }

  liveRefresh() {

    this.addingFormArtikal.get('rabat')?.setValue(this.addingFormArtikal.get('nabavnaCena')?.value * (this.addingFormArtikal.get('rabatProcenat')?.value/100))
    this.addingFormArtikal.get('nabavnaCenaPosleRabata')?.setValue(this.addingFormArtikal.get('nabavnaCena')?.value - this.addingFormArtikal.get('rabat')?.value)
    this.addingFormArtikal.get('ukupnaNabavnaVrednost')?.setValue(this.addingFormArtikal.get('nabavnaCenaPosleRabata')?.value * this.addingFormArtikal.get('kolicina')?.value)
  }
}

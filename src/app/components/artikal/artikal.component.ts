import { Component, OnInit } from '@angular/core';
import {Router, UrlTree} from "@angular/router";
import {Artikal, Istorija} from "../../shared/konverzija.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KonverzijaService} from "../../services/konverzija/konverzija.service";

@Component({
  selector: 'app-artikal',
  templateUrl: './artikal.component.html',
  styleUrls: ['./artikal.component.css']
})
export class ArtikalComponent implements OnInit {

  artikal: FormGroup;
  artikal2 = {} as Artikal;
  istorija: Istorija[] = [];

  constructor(private route:Router, private formBuilder: FormBuilder, private artikalService: KonverzijaService) {
    this.artikal = this.formBuilder.group({
      sifraArtikla: ['A'],
      nazivArtikla: ['B'],
      jedinicaMere: ['C'],
      kolicina: ['D'],
      nabavnaCena: ['E'],
      prodajnaCena:[''],
      rabatProcenat: ['F'],
      rabat: ['G'],
      nabavnaCenaPosleRabata: ['H'],
      ukupnaNabavnaVrednost: ['I'],
      istorijaProdajneCene: [[]],
      konverzijaKalkulacijaId: ['']
    });
  }

  ngOnInit(): void {

    let artikalID = this.route.url.substring(this.route.url.lastIndexOf('/') + 1)

    this.artikalService.getSviArtikli().subscribe(artikli=>{
      let niz = artikli.content
      for(let i =0; i< niz.length; i++){
        if(niz[i].artikalId == Number(artikalID)){
          let izNiza = niz[i];
          this.artikal2 = niz[i]
          this.artikal.get('sifraArtikla')?.setValue(izNiza.sifraArtikla);
          this.artikal.get('nazivArtikla')?.setValue(izNiza.nazivArtikla);
          this.artikal.get('jedinicaMere')?.setValue(izNiza.jedinicaMere);
          this.artikal.get('sifraArtikla')?.setValue(izNiza.sifraArtikla);
          this.artikal.get('kolicina')?.setValue(izNiza.kolicina);
          this.artikal.get('nabavnaCena')?.setValue(izNiza.nabavnaCena);
          this.artikal.get('rabatProcenat')?.setValue(izNiza.rabatProcenat);
          this.artikal.get('rabat')?.setValue(izNiza.rabat);
          this.artikal.get('nabavnaCenaPosleRabata')?.setValue(izNiza.nabavnaCenaPosleRabata);
          this.artikal.get('ukupnaNabavnaVrednost')?.setValue(izNiza.ukupnaNabavnaVrednost);
          this.artikal.get('istorijaProdajneCene')?.setValue(izNiza.istorijaProdajneCene);
          this.artikal.get('prodajnaCena')?.setValue(izNiza.prodajnaCena);
          this.artikal.get('konverzijaKalkulacijaId')?.setValue(izNiza.konverzijaKalkulacijaId)
          this.istorija = this.artikal.get('istorijaProdajneCene')?.value
          console.log(this.istorija)
        }
      }

    })
  }

  updateCena() {
    this.artikal2.prodajnaCena = this.artikal.get('prodajnaCena')?.value
    this.artikalService.updateProdajnaCena(this.artikal2).subscribe(artikal =>{
      let izNiza = artikal;
      this.artikal.get('sifraArtikla')?.setValue(izNiza.sifraArtikla);
      this.artikal.get('nazivArtikla')?.setValue(izNiza.nazivArtikla);
      this.artikal.get('jedinicaMere')?.setValue(izNiza.jedinicaMere);
      this.artikal.get('sifraArtikla')?.setValue(izNiza.sifraArtikla);
      this.artikal.get('kolicina')?.setValue(izNiza.kolicina);
      this.artikal.get('nabavnaCena')?.setValue(izNiza.nabavnaCena);
      this.artikal.get('rabatProcenat')?.setValue(izNiza.rabatProcenat);
      this.artikal.get('rabat')?.setValue(izNiza.rabat);
      this.artikal.get('nabavnaCenaPosleRabata')?.setValue(izNiza.nabavnaCenaPosleRabata);
      this.artikal.get('ukupnaNabavnaVrednost')?.setValue(izNiza.ukupnaNabavnaVrednost);
      this.artikal.get('istorijaProdajneCene')?.setValue(izNiza.istorijaProdajneCene);
      this.artikal.get('prodajnaCena')?.setValue(izNiza.prodajnaCena);
      this.istorija = this.artikal.get('istorijaProdajneCene')?.value
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {Router, UrlTree} from "@angular/router";
import {Artikal} from "../../shared/konverzija.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KonverzijaService} from "../../services/konverzija/konverzija.service";

@Component({
  selector: 'app-artikal',
  templateUrl: './artikal.component.html',
  styleUrls: ['./artikal.component.css']
})
export class ArtikalComponent implements OnInit {

  artikal: FormGroup;

  constructor(private route:Router, private formBuilder: FormBuilder, private artikalService: KonverzijaService) {
    this.artikal = this.formBuilder.group({
      sifraArtikla: ['A'],
      nazivArtikla: ['B'],
      jedinicaMere: ['C'],
      kolicina: ['D'],
      nabavnaCena: ['E'],
      rabatProcenat: ['F'],
      rabat: ['G'],
      nabavnaCenaPosleRabata: ['H'],
      ukupnaNabavnaVrednost: ['I']
    });

  }

  ngOnInit(): void {

    // TODO uradi getArtikal sa tim idem da se prikaze sve za njega
    // alert(this.route.url.substring(this.route.url.lastIndexOf('/') + 1))
    // this.artikalService.getArtikli(parseInt(this.route.url.substring(this.route.url.lastIndexOf('/') + 1))).subscribe(artikal=>{
    //   this.artikal = artikal.content
    //   // this.addingFormArtikal.setValue({rabat: this.addingFormArtikal.get('nabavnaCena') * (this.addingFormArtikal.get('rabatProcenat') / 100)})
    //
    // })
  }

  updateCena() {

  }
}

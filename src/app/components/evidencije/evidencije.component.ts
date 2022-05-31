import { Component, OnInit } from '@angular/core';
import {Artikal} from "../../shared/konverzija.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {KonverzijaService} from "../../services/konverzija/konverzija.service";

@Component({
  selector: 'app-evidencije',
  templateUrl: './evidencije.component.html',
  styleUrls: ['./evidencije.component.css']
})
export class EvidencijeComponent implements OnInit {
  artikli: Artikal[] = [];
  filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route:Router, private konverzijaService: KonverzijaService) {
    this.filterForm = this.formBuilder.group({
      sifraArtikla: [''],
      nazivArtikla: [''],
      jedinicaMere: [''],
      kolicina: [''],
    })
  }

  ngOnInit(): void {
    this.konverzijaService.getArtikli(1).subscribe(artikli =>{
      this.artikli = artikli.content;
    });
  }

  prikaziArtikal(id: number) {
    this.route.navigate(['/artikal/'+id]);
  }

  pretrazi() {

  }
}

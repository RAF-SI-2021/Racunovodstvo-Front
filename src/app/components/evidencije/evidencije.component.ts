import {Component, OnInit} from '@angular/core';
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

  constructor(private formBuilder: FormBuilder, private route: Router, private konverzijaService: KonverzijaService) {
    this.filterForm = this.formBuilder.group({
      sifraArtikla: [''],
      nazivArtikla: [''],
      jedinicaMere: [''],
      kolicina: [''],
    })
  }

  ngOnInit(): void {
    this.konverzijaService.getSviArtikli().subscribe(artikli => {
      this.artikli = artikli.content;
    });
  }

  prikaziArtikal(id: number) {
    this.route.navigate(['/artikal/' + id]);
  }

  // sifraArtikla: string,     nazivArtikla: string,     jedinicaMere: string,     kolicina
  pretrazi() {
    this.konverzijaService.pretrazi(this.filterForm.get('sifraArtikla')?.value, this.filterForm.get('nazivArtikla')?.value,
      this.filterForm.get('jedinicaMere')?.value, this.filterForm.get('kolicina')?.value).subscribe(pageable => {
      this.artikli = pageable.content;
      // this.filterForm.get('jedinicaMere')?.setValue('');
      // this.filterForm.get('sifraArtikla')?.setValue('');
      // this.filterForm.get('nazivArtikla')?.setValue('');
      // this.filterForm.get('kolicina')?.setValue('');
    })
  }
}

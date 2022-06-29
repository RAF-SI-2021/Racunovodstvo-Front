import { NestedTreeControl } from '@angular/cdk/tree';
import {Component, Inject, OnInit, TemplateRef} from '@angular/core';
import {TroskovniCentarService} from "../../services/troskovni-centar/troskovni-centar.service";
import {TroskovniCentar} from "../../shared/troskovni-centar";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {BookkeepingJournal} from "../../shared/bookkeeping-journal.model";
import {BookkeepingJournalService} from "../../services/bookkeeping-journal/bookkeeping-journal.service";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookkeepingJournalComponent} from "../bookkeeping-journal/bookkeeping-journal.component";
import {KontnaGrupa, Konto} from "../../shared/invoice.model";
import {Zaposleni} from "../../shared/profile.model";
import {Lokacija} from "../../shared/konverzija.model";



@Component({
  selector: 'app-troskovni-centar',
  templateUrl: './troskovni-centar.component.html',
  styleUrls: ['./troskovni-centar.component.css']
})
export class TroskovniCentarComponent implements OnInit {

  troskovniCentri: TroskovniCentar[];
  treeControl = new NestedTreeControl<TroskovniCentar>(node => node.troskovniCentarList);
  dataSource = new MatTreeNestedDataSource<TroskovniCentar>();
  knjizenja: BookkeepingJournal[];
  selectedTroskovniCentar: TroskovniCentar;
  odgovornaLica: Zaposleni[] = [];
  lokacije: Lokacija[] = [];

  constructor(private knjizenjeService: BookkeepingJournalService, private troskovniCentarService: TroskovniCentarService) {
  }

  ngOnInit(): void {
    this.fetchAllTroskovniCentri();
    this.knjizenjeService.getKnjizenja().subscribe((data) => {
      this.knjizenja = data;
    });
  }

  fetchAllTroskovniCentri(): void {
    this.troskovniCentarService.getCentri().subscribe(data => {
      this.troskovniCentri = data;
      this.formatData();
      this.dataSource.data = this.troskovniCentri;
    })

    this.troskovniCentarService.getAllLokacije().subscribe(data => {
      this.lokacije = data;
    })

    this.troskovniCentarService.getAllOdgovornaLica().subscribe(data => {
      this.odgovornaLica = data;
    })
  }

  formatData(): void {
    this.troskovniCentri.forEach(item => {
      item.troskovniCentarList = this.troskovniCentri.filter(function (element) {
          return element.parentTroskovniCentar && element.parentTroskovniCentar.id == item.id;
        }
      );
      item.showDetails = false;
    })

    for (let i = 0; i < this.troskovniCentri.length; i++) {
      this.troskovniCentri[i] = this.dfsReassignment(this.troskovniCentri[i]);
    }
  }

  reassignObject(source: TroskovniCentar): TroskovniCentar {
    return Object.assign({}, source);
  }

  dfsCalculation(curr: TroskovniCentar, sum: number): number {
    sum += curr.ukupniTrosak;
    if (curr.troskovniCentarList) {
      for (let i = 0; i < curr.troskovniCentarList.length; i++) {
        sum = this.dfsCalculation(curr.troskovniCentarList[i], sum);
      }
    }
    return sum;
  }

  dfsReassignment(curr: TroskovniCentar): TroskovniCentar {
    curr = this.reassignObject(curr);
    if (curr.troskovniCentarList) {
      for (let i = 0; i < curr.troskovniCentarList.length; i++) {
        curr.troskovniCentarList[i] = this.dfsReassignment(curr.troskovniCentarList[i]);
      }
    }
    return curr;
  }

  popup(knjizenjeIndex: number, troskovniCentarIndex: number): void {
    let text = 'Da li zelite da iz knjiženja(' +
      this.knjizenja[knjizenjeIndex].brojNaloga +
      ') dodelite listu konta troskovnom centru(' +
      this.troskovniCentri[troskovniCentarIndex].naziv + ')?';
    if (confirm(text) == true) {
      this.troskovniCentarService.assignKnizenje(this.knjizenja[knjizenjeIndex], this.troskovniCentri[troskovniCentarIndex]).subscribe(
        data => {

          // const dummyKontoList = [
          //   new Konto(new KontnaGrupa('konto-1', '1231'), 100, 50, true, false, false, false),
          //   new Konto(new KontnaGrupa('konto-2', '1232'), 200, 60, true, false, false, false),
          //   new Konto(new KontnaGrupa('konto-3', '1233'), 300, 70, true, false, false, false),
          //   new Konto(new KontnaGrupa('konto-4', '1234'), 400, 80, true, false, false, false),
          //   new Konto(new KontnaGrupa('konto-5', '1235'), 500, 90, true, false, false, false),
          //   new Konto(new KontnaGrupa('konto-6', '1236'), 600, 100, true, false, false, false),
          // ]
          // data.kontoList = dummyKontoList;
          //
          // data.kontoList.forEach(item => {
          //   item.knjizenje = this.knjizenja[knjizenjeIndex];
          // });
          this.fetchAllTroskovniCentri();
        });
    }
  }

  izmeniKonto(konto: Konto, editableKomentar: HTMLTextAreaElement): void {
    let index: number = this.selectedTroskovniCentar.kontoList.findIndex(item => item.bazniKontoId === konto.bazniKontoId);
    let newKonto: Konto = this.selectedTroskovniCentar.kontoList[index];
    newKonto.komentarKnjizenja = editableKomentar.value;
    this.selectedTroskovniCentar.kontoList[index] = newKonto;
    this.izmeniTroskovniCentarKontos(this.selectedTroskovniCentar);
  }

  obrisiKonto(konto: Konto): void {
    this.selectedTroskovniCentar.kontoList = this.selectedTroskovniCentar.kontoList.filter(data => data != konto);
    this.izmeniTroskovniCentarKontos(this.selectedTroskovniCentar);
  }

  sacuvajTroskovniCentar(newTrosCentarNaziv: HTMLInputElement, newTrosCentarSifra: HTMLInputElement,
                        newTrosCentarLokacijaId: HTMLSelectElement, newTrosCentarOdgLiceId: HTMLSelectElement, newTrosCentarRoditelj: HTMLSelectElement): void {
    let newTroskovniCentar: TroskovniCentar = {
      sifra: newTrosCentarSifra.value,
      naziv: newTrosCentarNaziv.value,
      ukupniTrosak: 0,
      lokacijaId: this.lokacije[newTrosCentarLokacijaId.selectedIndex].lokacijaId,
      odgovornoLiceId: this.odgovornaLica[newTrosCentarOdgLiceId.selectedIndex].zaposleniId,
      parentTroskovniCentar: this.troskovniCentri[newTrosCentarRoditelj.selectedIndex],
      kontoList: []
    }
    this.troskovniCentarService.save(newTroskovniCentar).subscribe(() => {
      this.fetchAllTroskovniCentri();
    });
  }

  izmeniTroskovniCentar(troskovniCentar: TroskovniCentar, editableNazivCentra: HTMLInputElement, editableOdgLice: HTMLSelectElement,
                       editablelokacijaId: HTMLSelectElement): void {
    troskovniCentar.naziv = editableNazivCentra.value;
    troskovniCentar.odgovornoLiceId = this.odgovornaLica[editableOdgLice.selectedIndex].zaposleniId;
    troskovniCentar.lokacijaId = this.lokacije[editablelokacijaId.selectedIndex].lokacijaId;
    this.troskovniCentarService.update(troskovniCentar).subscribe(data => {
      this.fetchAllTroskovniCentri()
    });
  }

  izmeniTroskovniCentarKontos(troskCentar: TroskovniCentar): void {
    this.troskovniCentarService.update(troskCentar).subscribe(data => {
      this.fetchAllTroskovniCentri()
    });
  }

  obrisiTroskovniCentar(troskCentar: TroskovniCentar): void {
    this.troskovniCentarService.delete(troskCentar.id).subscribe(() => {
        this.troskovniCentri = [];
        this.fetchAllTroskovniCentri();
      }
    );
  }

  calculateUkupniTrosak(node: TroskovniCentar): number {
    let sum: number = node.ukupniTrosak;
    if (node.troskovniCentarList) {
      for (let i = 0; i < node.troskovniCentarList.length; i++) {
        sum = this.dfsCalculation(node.troskovniCentarList[i], sum);
      }
    }

    if (node.kontoList) {
      node.kontoList.forEach(konto => {
        sum += (konto.duguje + konto.potrazuje);
      })
    }
    return sum;
  }

  getIcon(node: TroskovniCentar): string {
    return this.treeControl.isExpanded(node) ? '-' : '+';
  }

  getAsDate(date: string): string {
    let newDate = new Date(date);
    return (
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  }

  getSaldo(duguje: number, potrazuje: number): number {
    return duguje - potrazuje;
  }

  setSelected(selected: TroskovniCentar): void {
    this.selectedTroskovniCentar = selected;
    window.scrollTo(0, document.body.scrollHeight);
  }

}

